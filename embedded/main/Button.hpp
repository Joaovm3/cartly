#ifndef CARTLY_BUTTON_H
#define CARTLY_BUTTON_H

namespace Cartly {
  class Button {
    int pin, lastState;

  public:
    Button(int pin);
    
    void begin();
    bool clicked();
  };
}

#endif