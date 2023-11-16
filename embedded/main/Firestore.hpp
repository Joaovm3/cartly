namespace Cartly {
  class Firestore {
    char project_id[256];

    FirebaseData buffer;
    FirebaseAuth auth;
    FirebaseConfig config;

  public:
    // Firestore(const char *api_key);

    void setProject(const char *id);
    void setUser(const char *email, const char *password);
    void setApiKey(const char *key);

    // TODO: implement. Maybe refactor the class to use virtual methods...
    // void setOnDocumentChangedCallback()

    void begin();
    bool ready();
  };
}