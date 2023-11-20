#include "Timestamp.hpp"

#include <iostream>
#include <sstream>
#include <iomanip>
#include <ctime>
// #include <WiFi.h>

namespace Cartly {
  long extractNanoseconds(std::chrono::time_point<std::chrono::system_clock> timePoint) {
    auto duration = timePoint.time_since_epoch();
    auto durationInSeconds = std::chrono::duration_cast<std::chrono::seconds>(duration);
    auto durationInNanoseconds = std::chrono::duration_cast<std::chrono::nanoseconds>(duration);

    return (durationInNanoseconds - durationInSeconds).count();
  }

  Timestamp Timestamp::fromString(const char* str) {
    std::istringstream stream(str);

    // Converter a timestamp do firebase para um formato de calendário 
    std::tm time = {};
    stream >> std::get_time(&time, "%Y-%m-%dT%H:%M:%S.");

    // Extrair os nanosegundos restantes
    long nanoseconds;
    stream >> nanoseconds;

    // Criar um time point utilizável a partir da timestamp
    Timestamp timestamp;
    timestamp.timePoint = std::chrono::system_clock::from_time_t(std::mktime(&time));
    timestamp.timePoint += std::chrono::nanoseconds(nanoseconds);

    return timestamp;
  }

  std::string Timestamp::toString() {
    std::ostringstream stream;

    // Converter o time point para uma timestamp do firebase
    time_t time = std::chrono::system_clock::to_time_t(timePoint);
    stream << std::put_time(std::localtime(&time), "%Y-%m-%dT%H:%M:%S.");

    // Adicionar os nanosegundos restantes
    long nanoseconds = extractNanoseconds(timePoint);
    stream << std::to_string(nanoseconds).substr(0, 6) << 'Z';

    return stream.str();
  }

  Timestamp Timestamp::now() {
    Timestamp timestamp;
    timestamp.timePoint = std::chrono::system_clock::now();
    
    // std::tm time = {};
    // getLocalTime(&time);
    // timestamp.timePoint = std::chrono::system_clock::from_time_t(std::mktime(&time));
    
    return timestamp;
  }

  bool operator<(const Timestamp& lhs, const Timestamp& rhs) {
    return lhs.timePoint < rhs.timePoint;
  }

  bool operator==(const Timestamp& lhs, const Timestamp& rhs) {
    return lhs.timePoint == rhs.timePoint;
  }
}