#include "Utility.h"
#include "Firestore.h"

#define WIFI_SSID "Visitante"
#define WIFI_PASS ""

#define API_KEY "AlzaSyClyJtwp9t-AIN07BiSWsgkopJjqruLM98"
#define PROJECT_ID "cartly-app"

// TODO: Create this user using the firebase web interface
#define USER_EMAIL "admin@cartly.com"
#define USER_PASSWORD "admin"

Cartly::Firestore firestore;

void setup() {
  Serial.begin(9600);

  // Aguarde a conexão do Serial para iniciar o programa
  while (!Serial) {
    delay(100);
  }

  Cartly::connectToNetwork("Visitante", "");
  // Firebase.reconnectNetwork(true);

  firestore.setProject(PROJECT_ID);
  firestore.setUser(USER_EMAIL, USER_PASSWORD);
  firestore.setApiKey(API_KEY);

  firestore.begin();
}

void loop() {
  if (Firebase.ready()) {
    // TODO: Add the path to the firestore document
    const char *documentPath = "TODO";

    Firebase.Firestore.listDocuments(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, 3, "", "", "count", false);
  }
}