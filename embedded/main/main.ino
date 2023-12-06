#include "Setup.hpp"
#include "Button.hpp"
#include "Order.hpp"

#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>

using namespace Cartly;

#define SERIAL_BOUD_RATE 9600

#define WIFI_SSID "Visitante"
#define WIFI_PASS ""

#define DISPLAY_WIDTH 128
#define DISPLAY_HEIGHT 64

#define BUTTON_PIN 2

#define TASK_STACK_SIZE 8192

Adafruit_SSD1306 *display;

Button button(BUTTON_PIN);

// Fila contendo os pedidos pendentes
std::queue<Order> pendingOrders;

// Semáforos para a sincronização entre threads
SemaphoreHandle_t fetchSemaphore;
SemaphoreHandle_t patchSemaphore;

// Task para o HTTP GET
void fetchTask(void *arg) {
  pendingOrders = fetchAllPendingOrders();

  xSemaphoreGive(fetchSemaphore);
  vTaskDelete(NULL);
}

// Task para o HTTP PATCH
void patchTask(void *arg) {
  Order *order = (Order *)arg;
  patchOrderStatus(order->id.c_str(), CARTLY_ORDER_STATUS_PROCESSED);

  // A remoção do pedido deve ser feita dentro da task para não correr o risco
  // de ele ser removido antes que função patchOrderStatus seja chamada, já que
  // ele não estaria mais disponível
  pendingOrders.pop();

  xSemaphoreGive(patchSemaphore);
  vTaskDelete(NULL);
}

void displayAwait() {
  for (int i = 0; i < 3; i++) {
    delay(250);
    display->print('.');
    display->display();
  }
}

void displayOrder(Order& order) {
  // Exemplo de um resultado do display:
  //
  // AOASdiq8wdiUASaASk
  // -------------------
  // 2X - Café Torrado e 
  // Moído 250g (Melitta)
  //

  display->println(order.id);
  display->println("-------------------");

  Product& product = order.products.front();
  
  char buffer[256];
  std::snprintf(buffer, sizeof(buffer), "%dX - %s (%s)", 
    product.amount, product.name.c_str(), product.brand.c_str());

  display->println(buffer);
}

void onButtonClick() {
  Order& order = pendingOrders.front();
  Product& product = order.products.front();
  
  // Ao clicar no botão, será reduzido 1 unidade do produto atual no pedido,
  // para representar a conclusão da sua "separação"
  product.amount--;

  // Caso o pedido atual não tenha mais unidades restantes para serem separadas,
  // ele será descartado da lista de produtos restantes, consequentemente mudando
  // o produto atual da próxima iteração para o produto seguinte na lista
  if (product.amount == 0) {
    // order.products.pop_back();
    order.products.erase(order.products.begin());
  }

  // Caso a lista de produtos do pedido seja esvaziada, o pedido será considerado
  // como totalmente processado e poderá ser descartado, tendo o seu status
  // atualizado no firestore
  if (order.products.empty()) {
    // Fazer o HTTP PATCH em outro thread para não bloquear o thread principal
    xSemaphoreTake(patchSemaphore, 0);
    xTaskCreate(patchTask, "patchTask", TASK_STACK_SIZE, &order, 1, NULL);
  }
}

void setup() {
  setupSerial(SERIAL_BOUD_RATE);
  setupWiFi(WIFI_SSID, WIFI_PASS);
  display = setupDisplay(DISPLAY_WIDTH, DISPLAY_HEIGHT);

  button.begin();

  fetchSemaphore = xSemaphoreCreateBinary();
  xSemaphoreGive(fetchSemaphore);

  patchSemaphore = xSemaphoreCreateBinary();
  xSemaphoreGive(patchSemaphore);
}

void loop() {
  delay(5);

  display->clearDisplay();
  display->setCursor(0, 0);

  // Checa se o semáforo da task fazendo HTTP GET está livre. Caso ele esteja ocupado, 
  // deverá ser aguardada a finalização da requisição para que os dados estejam sincronizados
  if (xSemaphoreTake(fetchSemaphore, 0)) {
    xSemaphoreGive(fetchSemaphore);
  } else {
    display->print("Aguardando pedidos");
    display->display();
    displayAwait();

    return;
  }

  // Faz a mesma checagem, porém no semáforo da task fazendo HTTP PATCH
  if (xSemaphoreTake(patchSemaphore, 0)) {
    xSemaphoreGive(patchSemaphore);
  } else {
    display->print("Finalizando pedido");
    display->display();
    displayAwait();

    return;
  }

  // Quando os dois semáforos estiverem livres, a fila de ordens pendentes poderá ser
  // acessada pelo thread principal com segurança

  // Enquanto a lista de pedidos pendentes estiver vazia, serão feitas requisições
  // para o firebase constantemente, aguardando até que novos pedidos sejam efetuados.
  if (pendingOrders.empty()) {
    // Fazer o HTTP GET em outro thread para não bloquear o thread principal
    xSemaphoreTake(fetchSemaphore, 0);
    xTaskCreate(fetchTask, "fetchTask", TASK_STACK_SIZE, NULL, 1, NULL);
  } else {
    displayOrder(pendingOrders.front());
    display->display();

    if (button.clicked()) {
      onButtonClick();
    }
  }
}