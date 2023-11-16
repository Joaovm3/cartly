#include <format>

#include <WiFi.h>
#include <FirebaseESP32.h>

void connectToNetwork(const char *ssid, const char *pass) {
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

// Firebase project credentials - Esta deve ser a chave privada do arquivo JSON de serviço que você possui.
// Este é apenas um exemplo. Você precisa passar o JSON como uma string aqui.

#define FIREBASE_AUTH "kjhgfdsdfghjk"

// Firestore document path
#define FIRESTORE_PATH "projects/cartly-app/databases/(default)/documents/orders"

FirebaseData firebaseData;

void setup() {
  Serial.begin(9600);

  // Aguarde a conexão do Serial para iniciar o programa
  while (!Serial) {
    delay(100);
  }

  connectToNetwork("Visitante", "");

  // A função Firebase.begin() abaixo precisa ser modificada para utilizar a chave de serviço JSON.
  // A biblioteca que você está usando pode não suportar diretamente a autenticação Firestore; portanto, isso pode não funcionar.
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // Começar a ouvir as alterações no Firestore pode não ser suportado diretamente.
  // Este é um placeholder baseado na sua descrição. A funcionalidade real depende da biblioteca que você está usando.
  if (!Firebase.beginStream(firebaseData, FIRESTORE_PATH)) {
    Serial.println("Could not begin stream");
    Serial.println("REASON: " + firebaseData.errorReason());
  }
}

void loop() {
  // Novamente, a leitura de dados do Firestore como mostrado pode não ser suportada diretamente.
  // Isso é um exemplo genérico e pode não funcionar como esperado sem a biblioteca correta.
  if (!Firebase.readStream(firebaseData)) {
    Serial.println("Stream read error");
    Serial.println("REASON: " + firebaseData.errorReason());
  }

  if (firebaseData.streamTimeout()) {
    Serial.println("Stream timeout, resume streaming...");
    Firebase.resumeStream(firebaseData);
  }

  if (firebaseData.streamAvailable()) {
    Serial.println("Stream Data available...");
    Serial.println(firebaseData.streamPath());
    Serial.println(firebaseData.dataPath());
    Serial.println(firebaseData.dataType());
    Serial.println(firebaseData.jsonData());

    // Processamento adicional para exibir os dados desejados do Firebase
    // ...
  }
}