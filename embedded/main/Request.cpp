#include "Request.hpp"

// #include <cstring>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

namespace Cartly {
  WiFiClientSecure beginInsecureConnection(const char *host) {    
    WiFiClientSecure client;
    client.setInsecure(); // Ignorar a verificação SSL

    // Serial.println("Converting " + String(host) + " to an IP address...");

    // Converter o host em um endereço IP usando um DNS
    IPAddress hostAddress;
    WiFi.hostByName(host, hostAddress);
    
    // Serial.println("Starting connection to " + String(host) + "...");

    // Estabelecer a conexão na porta HTTPS 433
    while (!client.connect(hostAddress, 443)) {
      Serial.println("Host connection failed! Trying again...");
      // for (;;);
    }

    // Serial.println("Successfully connected!");

    return client;
  }

  String fetchPayload(const char *host, const char *url) {
    WiFiClientSecure client = beginInsecureConnection(host);

    // Serial.println("Starting HTTP GET request...");

    // Configurar os headers para o HTTP GET
    client.println("GET " + String(url) + " HTTP/1.0");
    client.println("Host: " + String(host));
    client.println("Connection: close");
    client.println();

    // Serial.println("Request sent!");

    // Consumir os headers que retornam junto com a resposta
    while (client.connected()) {
      String line = client.readStringUntil('\n');
      if (line == "\r") {
        break;
      }
    }
    
    // Serial.println("Headers received!");
    
    // Extrair o payload restante contendo os dados da resposta
    String payload;
    while (client.available()) {
      payload += client.readStringUntil('\n');
    }

    // Serial.println("Payload received!");

    client.stop();

    return payload;
  }

  void patchPayload(const char *host, const char *url, const char *payload) {
    WiFiClientSecure client = beginInsecureConnection(host);

    // Serial.println("Starting HTTP PATCH request...");

    // Configurar os headers para o HTTP PATCH
    client.println("PATCH " + String(url) + " HTTP/1.1");
    client.println("Host: " + String(host));
    client.println("Content-Type: application/json");
    client.println("Content-Length: " + String(strlen(payload)));
    client.println("Connection: close");
    client.println();

    client.print(payload);

    // Serial.println("Request sent!");

    // Esperar pela resposta do servidor
    while (client.connected() && !client.available()) {
      delay(100);
    }

    // Serial.println("Response received!");

    client.stop();
  }
}