#ifndef CARTLY_ORDER_H
#define CARTLY_ORDER_H

#include "Timestamp.hpp"
#include "BlueJSON.h"

#include <string>
#include <vector>
#include <queue>

#define CARTLY_ORDER_STATUS_PENDING "PENDING"
#define CARTLY_ORDER_STATUS_PROCESSED "PROCESSED"
#define CARTLY_ORDER_STATUS_COMPLETED "COMPLETED"
#define CARTLY_ORDER_STATUS_FAILED "FAILED"

namespace Cartly {
  struct Product {
    std::string name, brand, category, previewUrl;
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
    std::string id, status;
    std::vector<Product> products;
    Timestamp createTime;

    static Order fromJson(bj_object *object);
  };

  // Perform a HTTP GET to fetch all orders, and filter only those which have
  // the status as "PENDING". The orders are enqueued in crescent order based
  // on the order creation time
  std::queue<Order> fetchAllPendingOrders();

  // Perform a HTTP PATCH to change the order status, automatically changing
  // the updatedAt timestamp
  void updateOrderStatus(const char *id, const char *status);
}

#endif