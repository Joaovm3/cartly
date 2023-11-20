#ifndef CARTLY_SETUP_H
#define CARTLY_SETUP_H

#include <Adafruit_SSD1306.h>

namespace Cartly {
  void setupSerial(int baudRate);
  void setupWiFi(const char *ssid, const char *pass);
  Adafruit_SSD1306 *setupDisplay(int width, int height);
}

#endif