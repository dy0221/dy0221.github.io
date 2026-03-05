---
title: 'BLDC motor impedance control'
date: 2026-03-04
permalink: /posts/bldc-contorl/2/
tags:
  - Study
  - impedance control
  - Project
  - kr

excerpt: ""
parent_category: Project
category: Impedance Control
lang: kr
slug_id: Impedance Control/3
---
  
### 임피던스 제어 구현
  
단일 모터에서 임피던스 제어는 가상의 스프링 댐퍼(PD)제어기로써 나타낼 수 있다.  
  
임피던스 제어설명에 대한 matlab 주소  
(내가 다루었던 survey논문에서도 정리하지는 않았지만 1자유도 모터의 임피던스 제어 내용도 같다.)   
[https://kr.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html](https://kr.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html)   
   
이 경우 비례항(각도식)이 스프링을 나타 내고, 미분항(속도식)이 댐퍼를 나타낸다.  
  
<p align="center">
$$  
\tau_{\text{act}} = K(\theta_v - \theta) + B(\dot{\theta_v}-\dot{\theta})
$$
</p> 
  
여기서 왜 (현재 값 - 평형점)을 빼는 것이 아닌, 반대로 (평형점 - 현재 값)을 넣어주는 이유는 환경에의해 방해 받았을 때, 해당 임피던스로 만들어진 힘으로 되돌아 가야 하기 때문에 -가 붙었다고 생각 하면 편하다.  
  
구현 코드는 다음과 같다.
``` c
#include <SimpleFOC.h>

#define   POLE_PAIRS        11
#define   PHASE_RESISTANCE  5.9f/2
#define   KV_RATING         170.0f
#define   _SQURT3           1.7320508075f
#define   _RPM_TO_RADS      0.10471975512f  //RPM to rad/s >> 2pi/60
// magnetic sensor instance - SPI
MagneticSensorSPI sensor = MagneticSensorSPI(AS5048_SPI, 53);
//***
//Ground : White
//vCC : Red
//Master Input, Slave Output( MISO, CIPO, ISO) : Green

//Master Onput, Slave Iutput( MIOSI, COPI, OSI) : Yello
//Serial Clock ( SCL, SLK, SCK, SCLK SPCK, CLK) : Sky Blue
//Chip/ Slave Select ( CS, SS, STE, CE, SPI-CS, SDA) : Black
//
// BLDC motor & driver instance
BLDCMotor motor = BLDCMotor(POLE_PAIRS, PHASE_RESISTANCE, KV_RATING);
BLDCDriver3PWM driver = BLDCDriver3PWM(9, 5, 6, 8);

// commander interface
Commander command = Commander(Serial);

// ----------------------
// Impedance control params
// ----------------------
float eq_angle = 0.0f;       // equilibrium angle [rad]
float eq_vel = 0.0f;         // equilibrium velocity [rad/s]
float K_d = 0.8f;           
float B_d = 0.01f;        
float u_ff = 0.0f;          // feedforward voltage
float u_max = 1.0f;         // Current limit [A]  (driver/motor voltage_limit와 동일하게)

bool enabled = true;

// 각도 오차를 -pi~pi로 정규화 (래핑 문제 방지)
static inline float normalize_angle(float _angle) {
  while (_angle > PI)  _angle -= 2.0f * PI;
  while (_angle < -PI) _angle += 2.0f * PI;
  return _angle;
}

static inline float limit_check(float _value, float _low, float _high) {
  if (_value < _low) return _low;
  if (_value > _high) return _high;
  return _value;
}

// ----------------------
// Commander callbacks
// ----------------------

// 목표 평형각 설정 (degree 입력)
void onTarget(char* cmd) {
  float deg = atof(cmd);
  eq_angle = deg * (PI / 180.0f);
  Serial.print("eq_angle [rad]: ");
  Serial.println(eq_angle, 6);
}

// 강성 K 설정/조회 (V/rad)
void onK(char* cmd) {
  command.scalar(&K_d, cmd);
  Serial.print("K_d [V/rad]: ");
  Serial.println(K_d, 6);
}

// 감쇠 B 설정/조회 (V/(rad/s))
void onB(char* cmd) {
  command.scalar(&B_d, cmd);
  Serial.print("B_d [V/(rad/s)]: ");
  Serial.println(B_d, 6);
}

// FF 전압 설정 (V)
void onFF(char* cmd) {
  command.scalar(&u_ff, cmd);
  Serial.print("u_ff [V]: ");
  Serial.println(u_ff, 6);
}

// 전류 제한 설정 (A) - driver/motor voltage_limit도 같이 갱신
void onUMax(char* cmd) {
  command.scalar(&u_max, cmd);
  if (u_max < 0.0f) u_max = 0.0f;
  motor.updateCurrentLimit(u_max); // A
  Serial.print("u_max [V]: ");
  Serial.println(u_max, 6);
}

// Enable/Disable (E1 / E0)
void onEnable(char* cmd) {
  int _enable = atoi(cmd);
  enabled = (_enable != 0);
  if (!enabled) {
    motor.disable();
    Serial.println("Motor: DISABLED");
  } else {
    motor.enable();
    Serial.println("Motor: ENABLED");
  }
}

void setup() {
  Serial.begin(115200);
  SimpleFOCDebug::enable(&Serial);

  // sensor init
  sensor.init();
  motor.linkSensor(&sensor);

  // driver init
  driver.voltage_power_supply = 12;
  driver.voltage_limit = 5;
  driver.init();
  motor.linkDriver(&driver);

  // ----------------------
  // IMPORTANT: torque mode
  // ----------------------
  motor.controller = MotionControlType::torque;
  motor.torque_controller = TorqueControlType::estimated_current;
  motor.updateCurrentLimit(u_max);
  // voltage safety limits
  motor.voltage_limit = 5;

  // init motor + FOC
  motor.init();
  motor.initFOC();

  _delay(1000);

  //motor angle set
  eq_angle = motor.shaft_angle;
  eq_vel = 0.0f;

  // Commander commands
  command.add('M', onTarget, "equilibrium angle");
  command.add('K', onK,      "stiffness");
  command.add('B', onB,      "damping B");
  command.add('F', onFF,     "feedforward u_ff");
  command.add('U', onUMax,   "current limit u_max");
  command.add('E', onEnable, "enable motor 0/1");
  command.decimal_places = 6;

  Serial.println(F("\n=== SimpleFOC Impedance Control === "));
  Serial.print  (F("M: set equilibrium angle"));
  Serial.println(eq_angle);
  Serial.print  (F("K: set stiffness"));
  Serial.println(K_d);
  Serial.print  (F("B: set damping"));
  Serial.println(B_d);
  Serial.print  (F("F: set feedforward voltage"));
  Serial.println(u_ff);
  Serial.print  (F("U: set current limit"));
  Serial.println(u_max);
  Serial.print  (F("E: enable/disable motor"));
  Serial.println(enabled);
  Serial.print  (F("Init eq_angle [rad]: ")); 
  Serial.println(eq_angle, 6);
  Serial.print  (F("u_max [V]: ")); 
  Serial.println(u_max, 3);
}

void loop() {
  motor.loopFOC();

  if (enabled) {
    // state
    float current_angle  = motor.shaft_angle;     // [rad]
    float current_vel = motor.shaft_velocity;  // [rad/s] (sensor.cpp)

    // impedance law: u = u_ff + K_d*(x) + B_d*(x')
    float error_angle  = normalize_angle(eq_angle - current_angle);
    float error_vel = (eq_vel - current_vel);

    float u = u_ff + (K_d * error_angle) + (B_d * error_vel); //A
    
    u = limit_check(u, -u_max, u_max);

    motor.move(u);
  } else {
    motor.move(0);
  }

  command.run();
}

```
  
임피던스 제어를 하기 위해 많은 것을 공부했지만 결론으로 구현식은 매우 간단한 것을 알 수 있다.  
``` c
float u = u_ff + (K_d * error_angle) + (B_d * error_vel);
```
앞서 봤던 스프링과 댐퍼로 이루어진 PD제어기의 형태를 띄고 있고 u_ff는 조금 제어가 잘 안되면 넣으려고 했던 피드 포워드 항이다.  
  
>파라미터들의 **직관적(dynamic specification)**이해.  
>  
>- K_d는 강성을 의미하므로 커지면 접촉힘이 커진다.  
>- B_d는 댐핑을 의미하고, 커지면 모터의 운동이 느려지고 진동이 줄어든다.  
>- M_d는 관성을 의미하고, 커지면 저주파와 높은 진동이 발생한다  
  
논문에서 다루었던 내용과 정말 같은지 확인 하기 위해 3가지의 case를 정리했다.  
  
### CASE1 K0.8 B0.01
<p align="center">
  <a href="https://youtu.be/05NoxKzyMZI?si=CEna2tCXjQcxv_I5&t=78">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   K0.8 B0.01 test 영상
</p>
이 경우 모터가 내가 생각하기에는 적절한 탄성을 갖고 평형점으로 되돌아 오는 모습을 확인 할 수 있다.  

### CASE2 K0.1 B0.01
<p align="center">
  <a href="https://youtu.be/05NoxKzyMZI?si=eDuY6xusbcHZInlT&t=90">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   K0.1 B0.01 test 영상
</p>
강성을 내렸더니 영상에는 담길지 모르겠지만, 확실하게 접촉힘이 줄어든것이 느껴졌고, 상대적으로 댐핑이 늘어나고 스프링(강성)이 감소하여 되돌아 가지 않고 그자리에 멈추는 것을 알 수 있다.  

### CASE3 K0.8 B0.0
<p align="center">
  <a href="https://youtu.be/05NoxKzyMZI?si=wj54YbnoCHFsBVOc&t=100">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   K0.1 B0.0 test 영상
</p>
이 경우는 B를 줄였더니 진동이 매우 커진 것을 알 수 있다.  
  
### 결론 
지금까지 모터의 제어 방식을 공부하며 유도 전동기와 동기 전동기를 특히 중점으로 모터 제어 방식을 공부했다. 거기서 나오는 FOC 벡터 제어 방식은 최근 BLDC모터에서도 많이 사용되는데, BLDC모터를 FOC제어로 해보기 위해 SimpleFOC라는 오픈 소스 프로젝트를 사용했다.  
  
그 후 임피던스 제어를 간단하게나마 공부했고, 직접 1자유도 모터 한개의 임피던스 제어를 공부했다.  
  
실제로 강성과 댐핑 파라미터를 수정해 보며 직관적인 이해를 느낄 수 있었다.   
  
### 개선 사항
- 실제로 전류를 측정해서 FOC제어를 해보기. 
아무래도 전류를 추정해서 사용하다보니, PID제어도 그렇고, 파라미터 바꾸는 것도 그렇고 내가 목표한 것만큼 자세하게 다뤄보지는 못한것 같다. 따라서 다음번에 BLDC의 FOC제어를 할때는 전류를 직접 측정하면서 사용하는 방법을 해보는 것이 필요하다고 느꼈다.  

- 임피던스 제어 모델의 확장 
지금은 1자유도를 가진 모터 한개로만 진행을 하였는데, 이를 확장해 하나의 로봇팔 혹은 다관절 로봇 등으로 확장하고 싶다는 생각을 했고, 해야 겠다고 느꼈다.  
  