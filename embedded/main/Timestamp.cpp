#include "Timestamp.hpp"

#include <iostream>
#include <sstream>
#include <iomanip>
#include <ctime>

namespace Cartly {
  long extractNanoseconds(std::chrono::time_point<std::chrono::system_clock> timePoint) {
    auto duration = timePoint.time_since_epoch();
    auto durationInSeconds = std::chrono::duration_cast<std::chrono::seconds>(duration);
    auto durationInNanoseconds = std::chrono::duration_cast<std::chrono::nanoseconds>(duration);

    return (durationInNanoseconds - durationInSeconds).count();
  }

  Timestamp Timestamp::fromString(const char* str) {
    std::tm time = {};

    // Parse the timestamp in Firebase format
    std::istringstream stream(str);
    stream >> std::get_time(&time, "%Y-%m-%dT%H:%M:%S.");

    // Parse the remaining nanoseconds
    long nanoseconds;
    stream >> nanoseconds;

    Timestamp timestamp;
    timestamp.timePoint = std::chrono::system_clock::from_time_t(std::mktime(&time));
    timestamp.timePoint += std::chrono::nanoseconds(nanoseconds);

    return timestamp;
  }

  std::string Timestamp::toString() {
    time_t time = std::chrono::system_clock::to_time_t(timePoint);

    // Format as Firebase timestamp string
    std::ostringstream stream;
    stream << std::put_time(std::localtime(&time), "%Y-%m-%dT%H:%M:%S.");

    // Add the nanoseconds
    long nanoseconds = extractNanoseconds(timePoint);
    stream << std::to_string(nanoseconds).substr(0, 6) << 'Z';

    return stream.str();
  }

  Timestamp Timestamp::now() {
    Timestamp timestamp;
    timestamp.timePoint = std::chrono::system_clock::now();

    return timestamp;
  }

  bool operator<(const Timestamp& lhs, const Timestamp& rhs) {
    return lhs.timePoint < rhs.timePoint;
  }

  bool operator==(const Timestamp& lhs, const Timestamp& rhs) {
    return lhs.timePoint == rhs.timePoint;
  }
}