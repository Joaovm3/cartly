#include "Setup.hpp"

#include <Arduino.h>
#include <WiFi.h>

namespace Cartly {
  void setupSerial(int baudRate) {
    Serial.begin(baudRate);

    // Aguardar a inicialização da conexão serial
    while (!Serial) {
      delay(100);
    }

    // Serial.println("Serial started!");
  }

  void setupWiFi(const char *ssid, const char *pass) {
    // Serial.println("Attempting to connect to " + String(ssid) + "...");

    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED) {
      delay(100);
    }

    // Serial.println("Successfully connected!");

    // Serial.println("Getting date and time...");

    const char* ntpServer = "pool.ntp.org";

    // Horário de Brasília é UTC-3, portanto -3 horas. Na verdade o firebase
    // espera que as timestamps estejam em UTC+0 já que ele mesmo adiciona
    // o offset de fuso horário automaticamente
    const long gmtOffset = 0; // -3 * 3600;
    
    // Offset de horário de verão, que o Brasil não usa mais :)
    const int daylightOffset = 0;

    configTime(gmtOffset, daylightOffset, ntpServer);

    // Serial.println("Successfully got date and time!");
  }

  Adafruit_SSD1306 *setupDisplay(int width, int height) {
    // Serial.println("Starting display...");
    
    // Alocar o display no heap porque o ESP só tem 4~8KB de stack por padrão (por 
    // task), e isso tava estourando o stack... Acho que isso aconteceu porque o 
    // display estava sendo inicializado na função setup, que tem um stack limitado 
    // em 4~8KB por ser uma task, assim como a loop. Por isso o display é normalmente 
    // inicializado em um contexto global: para ter acesso a maior parte do stack.
    // https://docs.espressif.com/projects/esp-idf/en/v4.4/esp32s2/api-guides/performance/ram-usage.html#internal-stack-sizes
    Adafruit_SSD1306 *display = new Adafruit_SSD1306(width, height, &Wire, -1);

    if(!display->begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
      // Serial.println("Display setup failed!");
      for (;;);
    }

    display->setTextSize(1);
    display->setTextColor(SSD1306_WHITE);
    display->setCursor(0, 0);

    // Limpar o buffer inicial do display que vem com a logo da Adafruit
    display->clearDisplay();
    display->display();

    // Serial.println("Successfully started!");

    return display;
  }
}