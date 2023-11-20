#include "Button.hpp"

#include <Arduino.h>

namespace Cartly {
  Button::Button(int pin) { // : pin(pin), lastState(LOW) { } 
    this->pin = pin;
    lastState = LOW;
  }

  void Button::begin() {
    pinMode(pin, INPUT_PULLUP);
  }

  bool Button::clicked() {
    int state = digitalRead(pin);
    bool result = state == LOW && lastState == HIGH;
    lastState = state;

    return result;
  }
}