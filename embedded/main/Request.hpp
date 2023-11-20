#ifndef CARTLY_REQUEST_H
#define CARTLY_REQUEST_H

#include <Arduino.h>

namespace Cartly {
  String fetchPayload(const char *host, const char *url);
  void patchPayload(const char *host, const char *url, const char *payload);
}

#endif