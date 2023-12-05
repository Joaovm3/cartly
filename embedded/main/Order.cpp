#include "Order.hpp"

#include "Request.hpp"

#define BJ_IMPLEMENTATION
#include "BlueJSON.h"

#include <algorithm>
#include <cstring>

#define CARTLY_FIRESTORE_HOST "firestore.googleapis.com"
#define CARTLY_ORDERS_URL "https://firestore.googleapis.com/v1/projects/cartly-app/databases/(default)/documents/orders"

namespace Cartly {
  String parseOrderId(const char *name) {
    return String(std::strrchr(name, '/') + 1);
  }

  Product Product::fromJson(bj_object *object) {
    Product product;

    bj_object *outerMapValue = bj_object_find(object, "mapValue")->object;
    bj_object *outerFields = bj_object_find(outerMapValue, "fields")->object;

    // > Quantidade
    // Por algum motivo o Firebase guarda inteiros como strings no JSON...
    bj_object *amount = bj_object_find(outerFields, "amount")->object;
    bj_string *amountValue = bj_object_find(amount, "integerValue")->string;
    std::sscanf(amountValue->text, "%d", &product.amount);

    bj_object *productMap = bj_object_find(outerFields, "product")->object;
    bj_object *mapValue = bj_object_find(productMap, "mapValue")->object;
    bj_object *fields = bj_object_find(mapValue, "fields")->object;

    // > Nome
    bj_object *name = bj_object_find(fields, "name")->object;
    product.name = bj_object_find(name, "stringValue")->string->text;

    // > Marca
    bj_object *brand = bj_object_find(fields, "brand")->object;
    product.brand = bj_object_find(brand, "stringValue")->string->text;

    // > Categoria
    bj_object *category = bj_object_find(fields, "category")->object;
    product.category = bj_object_find(category, "stringValue")->string->text;

    // > Url da iamgem de preview
    bj_object *previewUrl = bj_object_find(fields, "previewURL")->object;
    product.previewUrl = bj_object_find(previewUrl, "stringValue")->string->text;

    // > Preço
    bj_object *price = bj_object_find(fields, "price")->object;
    product.price = bj_object_find(price, "doubleValue")->number->rational;

    return product;
  }

  void productsIteratorCallback(bj_value *value, void *arg) {
    std::vector<Product> *products = (std::vector<Product> *)arg;
    products->push_back(Product::fromJson(value->object));
  }

  Order Order::fromJson(bj_object *object) {
    Order order;

    // > ID
    bj_string *name = bj_object_find(object, "name")->string;
    order.id = parseOrderId(name->text);

    // > Timestamp de criação
    bj_string *createTime = bj_object_find(object, "createTime")->string;
    order.createTime = Timestamp::fromString(createTime->text);

    bj_object *fields = bj_object_find(object, "fields")->object;

    // > Código de status
    bj_object *status = bj_object_find(fields, "status")->object;
    order.status = bj_object_find(status, "stringValue")->string->text;

    // > Lista de produtos
    bj_object *products = bj_object_find(fields, "products")->object;
    bj_object *arrayValue = bj_object_find(products, "arrayValue")->object;
    bj_array *values = bj_object_find(arrayValue, "values")->array;
    bj_array_for_each(values, productsIteratorCallback, &order.products);

    return order;
  }

  void ordersIteratorCallback(bj_value *value, void *arg) {
    std::vector<Order> *pendingOrders = (std::vector<Order> *)arg;

    // Considera apenas os pedidos que estão pendentes
    Order order = Order::fromJson(value->object);
    if (order.status == CARTLY_ORDER_STATUS_PENDING) {
      pendingOrders->push_back(order);
    }
  }

  bool compareOrdersCallback(const Order &firstOrder, const Order &secondOrder) {
    return firstOrder.createTime < secondOrder.createTime;
  }

  std::queue<Order> fetchAllPendingOrders() {
    // Serial.println("Fetching all orders...");

    String payload = fetchPayload(CARTLY_FIRESTORE_HOST, CARTLY_ORDERS_URL);

    // Serial.println("Parsing pending orders...");

    bj_value *root = bj_read_text(payload.c_str());
    bj_array *documents = bj_object_find(root->object, "documents")->array;

    std::vector<Order> pendingOrders;
    bj_array_for_each(documents, ordersIteratorCallback, &pendingOrders);

    // Serial.println("Sorting orders by creation time...");

    // Organiza os pedidos em ordem crescente considerando o tempo de criação
    std::sort(pendingOrders.begin(), pendingOrders.end(), compareOrdersCallback);

    // Enfilera os pedidos organizados de modo que o primeiro da fila seja o pedido
    // mais antigo e o último seja o mais recente
    std::queue<Order> sortedOrders;
    for (const Order order : pendingOrders) {
      sortedOrders.push(order);
    }

    bj_value_destroy(root);

    // Serial.println("Organized all pending orders!");

    return sortedOrders;
  }

  void patchOrderStatus(const char *id, const char *status) {
    // Serial.println("Updating order status...");

    char payload[256];
    const char *format = 
      "{"
        "\"fields\":{"
          "\"status\":{\"stringValue\":\"%s\"},"
          "\"updatedAt\":{\"timestampValue\":\"%s\"},"
          "\"read\":{\"booleanValue\":false}"
        "}"
      "}";
    std::snprintf(payload, sizeof(payload), format, 
      status, Timestamp::now().toString().c_str());

    // Se não usar uma update mask o FETCH vai sobrescrever todo o JSON
    const char *updateMask = 
      "updateMask.fieldPaths=status&"
      "updateMask.fieldPaths=updatedAt&"
      "updateMask.fieldPaths=read";
    String orderUrl = String(CARTLY_ORDERS_URL) + '/' + id + '?' + updateMask;
    
    patchPayload(CARTLY_FIRESTORE_HOST, orderUrl.c_str(), payload);

    // Serial.println("Updated order status!");
  }
}