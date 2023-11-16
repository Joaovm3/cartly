#include <format>
#include <WiFi.h>

void Cartly::connectToNetwork(const char *ssid, const char *pass) {
  Serial.println(std::format("Attempting to connect to {}...", ssid));

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println(std::format("Successfully connected to {}!", ssid));
  Serial.println(std::format("IP address: {}", WiFi.localIP()))
}