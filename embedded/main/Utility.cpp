#include "Utility.hpp"

// #include <cstring>
#include <WiFi.h>

namespace Cartly {
  void connectToNetwork(const char *ssid, const char *pass) {
    /*
    char buffer[512];
    snprintf(buffer, sizeof(buffer), "Attempting to connect to %s", ssid);
    Serial.print(buffer);
    */

    // Serial.print("Attempting to connect to ");
    // Serial.print(ssid);

    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      // Serial.print(".");
    }

    // Serial.println("\nSuccessfully connected!");

    // Serial.print("IP address: ");
    // Serial.println(WiFi.localIP());
  }
}