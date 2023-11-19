#ifndef CARTLY_TIMESTAMP_H
#define CARTLY_TIMESTAMP_H

#include <string>
#include <chrono>

namespace Cartly {
  // Timestamp example: "2023-11-17T03:50:08.912975Z"
  // https://firebase.google.com/docs/reference/kotlin/com/google/firebase/Timestamp
  class Timestamp {
    std::chrono::time_point<std::chrono::system_clock> timePoint;

	// Timestamp();
	
  public:
    static Timestamp fromString(const char *str);
    std::string toString();

    static Timestamp now();

    friend bool operator<(const Timestamp& lhs, const Timestamp& rhs);
    friend bool operator==(const Timestamp& lhs, const Timestamp& rhs);
  };
}

#endif