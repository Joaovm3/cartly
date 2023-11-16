#include "Utility.hpp"
#include "Order.hpp"

void setup() {
  Serial.begin(9600);

  // Await for serial connection
  while (!Serial) {
    delay(100);
  }

  Cartly::connectToNetwork("Visitante", "");
}

void loop() {
  std::queue<Cartly::Order> orders = Cartly::fetchAllPendingOrders();
  while (!orders.empty()) {
    Cartly::Order order = orders.front();
    Cartly::updateOrderStatus(order.id.c_str(), CARTLY_ORDER_STATUS_PROCESSED);

    // TODO: Show order on screen bla bla bla

    Cartly::updateOrderStatus(order.id.c_str(), CARTLY_ORDER_STATUS_COMPLETED);
    orders.pop();
  }

  delay(3000);
}