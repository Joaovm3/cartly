#include "Order.hpp"

#define BJ_IMPLEMENTATION
#include "BlueJSON.h"

#include <algorithm>
#include <cstring>
#include <HTTPClient.h>

#define CARTLY_ORDERS_URL "https://firestore.googleapis.com/v1/projects/cartly-app/databases/(default)/documents/orders/"

namespace Cartly {
  std::string fetchPayload(const char *url) {
    std::string payload;
    HTTPClient http;

    http.begin(url);
    
    int response = http.GET();
    if (response > 0) {
      payload = http.getString();
    } else {
      Serial.println("Error on HTTP request!");
    }

    http.end();

    return payload;
  }

  // TODO: Maybe store the full name of the order, and then add a .id() 
  //       method to extract just the id from the name
  std::string parseOrderId(const char *name) {
    return std::string(std::strrchr(name, '/') + 1);
  }

  Product Product::fromJson(bj_object *object) {
    Product product;

    bj_object *mapValue = bj_object_find(object, "mapValue")->object;
    bj_object *fields = bj_object_find(mapValue, "fields")->object;

    bj_object *name = bj_object_find(fields, "name")->object;
    product.name = bj_object_find(name, "stringValue")->string->text;

    bj_object *brand = bj_object_find(fields, "brand")->object;
    product.brand = bj_object_find(brand, "stringValue")->string->text;

    bj_object *category = bj_object_find(fields, "category")->object;
    product.category = bj_object_find(category, "stringValue")->string->text;

    bj_object *previewUrl = bj_object_find(fields, "previewURL")->object;
    product.previewUrl = bj_object_find(previewUrl, "stringValue")->string->text;

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

    bj_string *name = bj_object_find(object, "name")->string;
    order.id = parseOrderId(name->text);

    bj_string *createTime = bj_object_find(object, "createTime")->string;
    order.createTime = Timestamp::fromString(createTime->text);

    bj_object *fields = bj_object_find(object, "fields")->object;

    bj_object *status = bj_object_find(fields, "status")->object;
    order.status = bj_object_find(status, "stringValue")->string->text;

    bj_object *products = bj_object_find(fields, "products")->object;
    bj_object *arrayValue = bj_object_find(products, "arrayValue")->object;
    bj_array *values = bj_object_find(arrayValue, "values")->array;
    bj_array_for_each(values, productsIteratorCallback, &order.products);

    return order;
  }

  // TODO: If the ESP32 processor can't handle all this JSON parsing we could
  //       split the orders into two or more threads...
  void ordersIteratorCallback(bj_value *value, void *arg) {
    std::vector<Order> *pendingOrders = (std::vector<Order> *)arg;

    Order order = Order::fromJson(value->object);
    if (order.status == CARTLY_ORDER_STATUS_PENDING) {
      pendingOrders->push_back(order);
    }
  }

  bool compareOrdersCallback(const Order &firstOrder, const Order &secondOrder) {
    return firstOrder.createTime < secondOrder.createTime;
  }

  // TODO: Add a log to benchmark how much time it took to run this function
  std::queue<Order> fetchAllPendingOrders() {
    std::string payload = fetchPayload(CARTLY_ORDERS_URL);

    bj_value *root = bj_read_text(payload.c_str());
    bj_array *documents = bj_object_find(root->object, "documents")->array;

    // Filter pending orders
    std::vector<Order> pendingOrders;
    bj_array_for_each(documents, ordersIteratorCallback, &pendingOrders);

    // Sort orders by creation time
    std::sort(pendingOrders.begin(), pendingOrders.end(), compareOrdersCallback);

    // TODO: For now it will just be copied all over the place for simplicity. Maybe
    //       it would be better to use some refs or pointers...
    std::queue<Order> sortedOrders;
    for (const Order order : pendingOrders) {
      sortedOrders.push(order);
    }

    bj_value_destroy(root);

    return sortedOrders;
  }

  void updateOrderStatus(const char *id, const char *status) {
    HTTPClient http;
    http.begin(std::string(CARTLY_ORDERS_URL) + id);
    http.addHeader("Content-Type", "application/json");

    char payload[512];
    const char *format = 
    "{"
      "\"fields\":{"
        "\"status\":{\"stringValue\":\"%s\"},"
        "\"updatedAt\":{\"timestampValue\":\"%s\"}"
      "}"
    "}";
    Timsetamp now = Timestamp::now();
    std::snprintf(payload, sizeof(payload), format, status, now.toString().c_str());

    int httpCode = http.sendRequest("PATCH", payload);

    /*
    if (httpCode > 0) {
      Serial.println("Successfully updated order status!");
    } else {
      Serial.println("Error on HTTP request!");
    }
    */

    http.end();
  }
}