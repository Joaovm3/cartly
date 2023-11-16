#include <Firebase_ESP_Client.h>

namespace Cartly {
  void Firestore::setProject(const char *id) {
    strncpy(project_id, id, sizeof(project_id));
    project_id[sizeof(project_id) - 1] = '\0';
  }

  void Firestore::setUser(const char *email, const char *password) {
    auth.user.email = email;
    auth.user.password = password;
  }

  void Firestore::setApiKey(const char *key) {
    config.api_key = key;
  }

  void Firestore::begin() {
    buffer.setBSSLBufferSize(4096, 1024);
    buffer.setResponseSize(2048);

    Firebase.begin(&config, &auth);
  }

  bool Firestore::ready() {
    return Firebase.ready();
  }
}