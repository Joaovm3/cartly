#ifndef CARTLY_ORDER_H
#define CARTLY_ORDER_H

#include "Timestamp.hpp"
#include "BlueJSON.h"

#include <vector>
#include <queue>
#include <Arduino.h>

#define CARTLY_ORDER_STATUS_PENDING "PENDING"
#define CARTLY_ORDER_STATUS_PROCESSED "PROCESSED"
#define CARTLY_ORDER_STATUS_COMPLETED "COMPLETED"
#define CARTLY_ORDER_STATUS_FAILED "FAILED"

namespace Cartly {
  struct Product {
    String name, brand, category, previewUrl;
    int amount;
    float price;

    static Product fromJson(bj_object *object);
  };

  /*
  enum class OrderStatus {
    PENDING = "PENDING",
    PROCESSED = "PROCESSED",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
  };
  */

  struct Order {
    String id, status;
    std::vector<Product> products;
    Timestamp createTime;

    static Order fromJson(bj_object *object);
  };

  // Faz um HTTP GET pra dar fetch em todos os pedidos, e filtra apenas os que
  // tiverem o status como "PENDING". Os pedidos são enfileirados em ordem
  // crescente baseado no tempo de criação
  // TODO: Talvez seja possivel filtrar direto na requisição para o firebase
  //       retornar só os pedidos pendentes
  std::queue<Order> fetchAllPendingOrders();

  // Faz um HTTP PATCH para mudar o status do pedido. Também altera a timestamp
  // updatedAt para uma timestamp do momento em que a função foi chamada, e muda 
  // o valor do campo read para false para fins de notificação
  void updateOrderStatus(const char *id, const char *status);
}

#endif