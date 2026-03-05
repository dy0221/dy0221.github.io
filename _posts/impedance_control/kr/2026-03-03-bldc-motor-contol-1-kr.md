---
title: 'BLDC motor control using simple foc'
date: 2026-03-03
permalink: /posts/bldc-contorl/1/
tags:
  - Study
  - impedance control
  - Project
  - kr

excerpt: ""
parent_category: Project
category: Impedance Control
lang: kr
slug_id: Impedance Control/2
---
  
### 개요
이전에 모터제어에 관한 공부도 진행을 하였고, 임피던스 제어의 survey 논문 또한 보면서 간단하게 나마 공부를 했었다.  
따라서 이를 통해 직접 bldc모터를 제어해보고 임피던스 제어를 구현해보는 간단한 프로젝트를 진행하였다.  
  
모터       : IFlight IPower GM3506 130T  
엔코더      : AS5048A  
제어기      : 아두이노 uno & mega  
모터드라이버 : simple foc mini 1.1v  
SimpleFOClibrary : v2.4.0 (이후에 말하겠지만 이전 버전을 사용하다가 버전업이 되어 이 버전으로 끝냈다.)  
전원        : DC Power supply  
  
### 1.모터드라이버
simple foc는 foc제어를 도와주는 open source project이다. 커뮤니티도 활발하게 이루어지고 있고, 보드 또한 오픈소스로 풀려 있다.  
    
보드 종류로는 2가지가 있는데, SimpleFOCShield와 SimpleFocMini가 있다. SimpleFOCShield의 가장 큰 특징은 전류 감지기능이 존재해 전류를 측정할수 있다는 것이다.  
SimpleFocMini의 경우 전류를 측정할 수 없어 전류를 추정해서 사용해야 한다.  
  
나의 경우 총 3가지의 보드를 태웠는데, 첫번째로 SimpleFocShield 3.2v을 사용 했었다. 태운 원인이 맞는지 모르겠지만, 내가 추정하기로 spi통신에서 아두이노에서 cc선을 digitial 10번 Pin으로 설정했는데, 내가 헷갈러서 B상의 pwm받는 핀에다 연결을 했다. 그후 B상의 PWM이 안나왔다.  
<p align="center">
  <img src="/assets/images/impedance_control/asang.jpg" width="33.3%">
  &nbsp; &nbsp; <img src="/assets/images/impedance_control/bsang.jpg" width="33.3%">
  &nbsp; &nbsp; <img src="/assets/images/impedance_control/csang.jpg" width="33.3%">
  <br/>
  <strong>그림 1.</strong> a,b,c상에 멀티미터(교류파형)
</p>
  
위에 사진을 보면 b상에만 교류파형이 나타나지 않는 것을 알 수 있다. 영상으로 남기지는 않았지만 모터가 회전하지 않고 좌우로 움직이기만 했다.  
그리고 지금 생각해보니 그때가 모터가 가장 뜨거웠던거 같다.  
  
이것이 모터의 문제인지, 모터 드라이버의 문제인지, 또는 제어기의 문제인지 알기 위해 각각 테스트를 했다. 다만 모터의 문제인지 확인을 하기 위해 새로운 모터드라이버가 필요 했는데, 커뮤니티에서 l298n으로 돌릴 수 있다는 것을 알게 되어 이를 통해 테스트를 진행했다.  
    
**SimpleFOC Community - bldc모터 l298n으로 돌리는 것에 대한 토론 주소**
[https://community.simplefoc.com/t/3-bldc-and-stepper-foc-driver-l298n/296](https://community.simplefoc.com/t/3-bldc-and-stepper-foc-driver-l298n/296)  
  
<p align="center">
  <a href="https://www.youtube.com/watch?v=05NoxKzyMZI&t=5s">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   Open loop test with L298n
</p>
  
  
결론은 모터드라이버가 문제였다는 것을 알게 되었다.  
l298n으로 돌릴 수 있다는걸 확인하고 이걸 쓸까 했지만, 커뮤니티 글을 읽어보니 l298n은 FOC제어를 하기에 지연시간이 크고 에너지 효율이 떨어진다고 해서 다소 비용이 저렴한 Simple foc mini 1.1v를 샀다.  

처음 시작할때는 전류 측정이 왜 필요한지 몰라서 단순하게 싼 미니보드를 택했지만(따라서 전류 센싱이 안되는 것이 아쉬웠다.) 이번 프로젝트 정도를 하는 거면, 적당하게 타협을 하고 나중에 더 좋은 BLDC와 제어기를 사용 할 때, 하는 것도 좋다고 생각한다.(아니면 일단 살때 둘다 사서 mini로 시작 해서 먼저 구현해보고, 전류 센싱해서 구현으로 개선하는 것을 추천)  
   
핀헤더의 방향을 반대로 납땜해서 다음과 같이 추가적으로 납땜을 했다.  

<p align="center">
  <img src="/assets/images/impedance_control/simplefoc_mini.jpg" width="300px"/>
  <br/>
  <strong>그림 2.</strong> SimpleFOCMini 납땜
</p>

하지만 이렇게 납땜하고 사용하다 보니 선끼리 부딪혀 쇼트가 나서 simple mini보드 2개를 태웠다.  
마지막으로 선배열과 납땜과 쇼트에 주의해서 simple mini 보드를 사용했고, 프로젝트를 진행하는동안 잘 작동했다.

### 2. 제어기
제어기의 경우 esp32와 아두이노 중에서 고민을 했었다. esp32를 사용 할경우 아두이노 보다 성능이 좋다는 장점이 있다. esp32를 저번에 사용을 했을 때, pin에 timer나 클럭등을 하나하나 설정을 해주었던 기억이 있는데, 아무래도 simple foc도 처음 사용해보는거다 보니 아두이노로 먼저 구현해보고 eps32로 개선해보기로 방향성을 잡았다.  
  
하지만 이번 프로젝트에서는 아두이노로만 진행을 하였다.  
다만 SimpleFOClibrary의 경우 프로젝트를 진행하는 동안 버전업이 되었는데, 버전업을 진행해서인지 아두이노 uno 메모리 용량보다 커져서 아두이노 mega로 바꿔서 사용하였다.  
   
### 3. 진행사항
프로젝트의 처음 진행한 목표는  
1. bldc모터의 foc제어 해보기
2. foc제어를 통해 토크 제어를 해보기
3. 임피던스 제어를 해보기
  
이런 큰 틀을 기준으로 잡고 프로젝트를 진행했다.  
  
### bldc모터 foc제어 해보기
FOC제어가 무엇인지 자세하게는 motor control에서 공부 했으므로 자세하게 다루지는 않겠다.  
  
foc제어를 간단하게 말하자면 3상 bldc모터의 a,b,c상에 전압(전류)를 가상의 2축 d축과 q축으로 좌표 변환을 해, 각각 자속과 전류(힘)으로 나누어서 다루는 제어 기법이다.  
  
SimpleFOC에서는 FOC제어 뿐만아니라 모터의 pid제어, debug monitor, sensor read 등 다양한 FOC제어에 필요한 기능들을 구현해 놓았다.  
또한 document와 community가 존재 해 천천히 따라가면 FOC제어를 정확하게 몰라도 진행할 수 있도록 만들어 놓았다.(알면 당연히 더 좋겠지만)
  
맨 처음 github의 코드를 봤었던게 2.4v 전 버전이였는데, 2.4v으로 되면서 원래는 가상함수로 선언된 기능들을 SRC/BLDCMotor.cpp에서 구현이 되었었다.  
2.4v버전에서는 SRC/common/base_classes/FOCMotor.cpp로 많이 옮겨지고, 거기 안에서 모터의 모드 또한 자세하게 변했는데, 나는 모듈화가 잘되었다고 생각했다.  
또한 문서도 더 자세하게 바뀌어서 진짜 따라가기만 해도 이해하기 쉽게 만들어 졌다.  
<div align="center">  
    <a href="https://docs.simplefoc.com/example_from_scratch">
     <img src="/assets/images/impedance_control/simple_foc_docs.png" alt="project-image" width="500px" />
    </a>  
</div>
  
### motor drive test
모터 드라이버를 태웠었기 때문에, 가장 먼저 모터 드라이버를 테스트를 했다.  
setPwm(a,b,c)함수를 사용하면 각 상에 pwm을 얼마나 줄수 있는지 정할 수 있다.(V)  
  
위에서 모터 드라이버의 쇼트를 테스트를 할때는 교류파의2 형태를 통해 제대로 나오는지 확인을 했었다. 하지만 pwm이라는 것은 한 주기에서 껏다 켜졌다를 반복하면서 평균전압을 제어하는 방식이다. 따라서 멀티미터를 dc전압 측정으로 재면 우리가 설정한 pwm값으로 나오게 된다.  
  
나는 이것을 이때 알게 되어 사진을 찍지는 않았지만 내가 설정한 전압으로 나오는지 확인을 통해 모터드라이버가 잘 작동하는지 확인했다.(mini 보드 2개를 태웠을때, 이 방법을 통해 보드가 탔다는 것을 확인 했다.)  
  
### open loop velocity test
open loop는 피드백 없이 그냥 설정값으로 넣어서 돌리는 상황을 말한다. l298n에서 사용한 코드 그대로 사용 할 수 있기 때문에 모터 드라이브를 SimpleFOC mini로 바꿔서 바로 돌렸다.  
``` c
// Open loop motor control example for L298N board
#include <SimpleFOC.h>

#define IN1 11
#define IN2 10
#define IN3 9
#define IN4 8

// BLDC motor & driver instance
// BLDCMotor motor = BLDCMotor(pole pair number);
BLDCMotor motor = BLDCMotor(11);
// BLDCDriver3PWM driver = BLDCDriver3PWM(pwmA, pwmB, pwmC, Enable(optional));
BLDCDriver3PWM driver = BLDCDriver3PWM(IN1, IN2, IN3);

void setup() {
  // deactivate the OUT4 output
  pinMode(IN4,OUTPUT);
  digitalWrite(IN4,LOW);


  // driver config
  // power supply voltage [V]
  driver.voltage_power_supply = 12;
  driver.init();
  // link the motor and the driver
  motor.linkDriver(&driver);

  // limiting motor movements
  motor.voltage_limit = 3;   // [V]
  motor.velocity_limit = 20; // [rad/s]

  // open loop control config
  motor.controller = MotionControlType::velocity_openloop;

  // init motor hardware
  motor.init();

  Serial.begin(115200);
  Serial.println("Motor ready!");
  _delay(1000);
}

float target_velocity = 6.28; // [rad/s]

void loop() {
  // open loop velocity movement
  // using motor.voltage_limit and motor.velocity_limit
  motor.move(target_velocity);

}

```
  
<p align="center">
  <a href="https://youtu.be/05NoxKzyMZI?si=dCOgNQh5CCQ5SRMI&t=14">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   Open loop test with SimpleFOC mini 1.1v
</p>
  
### encoder test
내가 사용한 엔코더는 AS5048A이다. 이 엔코더는 raw값을 직접적으로 받지는 않고 pwm과 spi통신을 지원한다.  
나는 spi통신을 사용했다. 핀 세팅은 다음과 같다.  
<p align="center">
  <img src="/assets/images/impedance_control/encoder_setting.jpg" width="300px"/>
  <br/>
  <strong>그림 3.</strong> encorder setting
</p>  
  
``` c
//Ground : White
//vCC : Red
//Master Input, Slave Output( MISO, CIPO, ISO) : Green

//Master Onput, Slave Iutput( MIOSI, COPI, OSI) : Yello
//Serial Clock ( SCL, SLK, SCK, SCLK SPCK, CLK) : Sky Blue
//Chip/ Slave Select ( CS, SS, STE, CE, SPI-CS, SDA) : Black
```  
  
  
나는 2가지의 방식으로 테스트를 진행했다.  
  

첫번째는 SimpleFOC에 다른 라이브러리인 Arduino-FOC-drivers를 사용하는 것이다.  
[https://github.com/simplefoc/Arduino-FOC-drivers/tree/master/src/encoders/as5048a](https://github.com/simplefoc/Arduino-FOC-drivers/tree/master/src/encoders/as5048a)  
  
코드는 github에 올라온걸 바탕으로 썼다. 사진을 보면, raw값은 잘 받아와 지는데, 각도나 속도는 잘 안나오는 것을 알 수 있다.  
<p align="center">
  <img src="/assets/images/impedance_control/encoder_raw_value.png" width="400px"/>
  <br/>
  <strong>그림 4.</strong> Arduino-FOC-drivers를 사용했을 때
</p>
  
다음으로는 SimpleFOC 라이브러리 자체에 있는 코드에 있는 encoder sensor코드를 사용하는 것이다.  
라이브러리에서 raw데이터와 spi, pwm, i2c등등 다양한 센서들을 지원해 준다.  
  
**getAngle(), getVelocity()**함수를 사용해서 각도와 속도를 가져오는데, 코드를 살펴보면 차분 방정식으로 속도를 구하고 있는 것을 알 수 있다.(논문에서 나왔던 것 처럼)
  
<p align="center">
$$
\Delta \dot{x}(k) = \frac{\Delta x(k) - \Delta x(k-1)}{T_s} 
$$
</p>  
  
```c
/*
  Shaft velocity calculation
  function using mixed time and frequency measurement technique
*/
float Encoder::getVelocity(){
  // Copy volatile variables in minimal-duration blocking section to ensure no interrupts are missed
  noInterrupts();
  long copy_pulse_counter = pulse_counter;
  long copy_pulse_timestamp = pulse_timestamp;
  interrupts();
  // timestamp
  long timestamp_us = _micros();
  // sampling time calculation
  float Ts = (timestamp_us - prev_timestamp_us) * 1e-6f;
  // quick fix for strange cases (micros overflow)
  if(Ts <= 0 || Ts > 0.5f) Ts = 1e-3f;

  // time from last impulse
  float Th = (timestamp_us - copy_pulse_timestamp) * 1e-6f;
  long dN = copy_pulse_counter - prev_pulse_counter;

  // Pulse per second calculation (Eq.3.)
  // dN - impulses received
  // Ts - sampling time - time in between function calls
  // Th - time from last impulse
  // Th_1 - time form last impulse of the previous call
  // only increment if some impulses received
  float dt = Ts + prev_Th - Th;
  pulse_per_second = (dN != 0 && dt > Ts/2) ? dN / dt : pulse_per_second;

  // if more than 0.05f passed in between impulses
  if ( Th > 0.1f) pulse_per_second = 0;

  // velocity calculation
  float velocity = pulse_per_second / ((float)cpr) * (_2PI);

  // save variables for next pass
  prev_timestamp_us = timestamp_us;
  // save velocity calculation variables
  prev_Th = Th;
  prev_pulse_counter = copy_pulse_counter;
  return velocity;
}

// getter for index pin
// return -1 if no index
int Encoder::needsSearch(){
  return hasIndex() && !index_found;
}

// private function used to determine if encoder has index
int Encoder::hasIndex(){
  return index_pin != 0;
}
```
  
<p align="center">
  <a href="https://youtu.be/05NoxKzyMZI?si=I89QtOkYSfotW5oI&t=24">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   encoder test
</p>   

둘다 라디안을 사용하고 있는데, 따라서 한바퀴를 돌렸을 때, 위치가 약 6.28($$2\pi$$)만큼 변한 것을 알 수 있다.  
   
### close loop test
SimpleFOC 2.4v기준 close loop에서 사용할 수 있는 제어 모드는 속도, 각도, 토크가 존재한다.  
우리는 토크 제어를 할 것이므로 토크 모드에 대하여 설명하겠다.  
  
토크 모드를 사용하기 위해서는 토크 모드로 설정을 해야 한다.  
``` c
motor.controller = MotionControlType::torque;
``` 
  
FOC제어에서 토크를 제어한다는 것은 d,q축 특히 q축을 제어하는 것이다.(q축이 토크와 관련된 축이기 때문에)  
이제 foc제어는 다음과 같은 시스템으로 이루어진다.  
<p align="center">
  <img src="/assets/images/motor_control/11/spmsm.png" width="600px"/>
  <br/>
  <strong>그림 4.</strong> 표면 부착형 영구자석 동기 전동기의 벡터제어(출처:모터제어 DC,AC,BLDC Motors,김상훈)
</p>
  
결국 토크지령 혹은 자속 지령을 넣어 줄 때, 우리가 원하는 목표의 지령 값을 넣어주면 알아서 회전변환과 d-q축 역변환등을 통해 a,b,c축의 pwm을 넣어주는 것이다.  
  
SimpleFOC에서 지령값을 넣어 주는 방법에는 크게 3가지가 있다. 
1. 전압을 넣어주기
2. 전류를 넣어주기
3. 추정 전류를 넣어주기
  
### 전압을 이용한 토크제어  
전압을 넣어 준다는 것은 open loop처럼 그냥 이론 값을 넣어주는 것이다.  
move(target);이라는 함수를 통해 모터에 원하는 타겟 값을 넣어 주는데, **voltage** 값을 넣어주게 된다.  
  
하지만 이 경우에는 결국 토크는 전류에 비례 하는데($$T = K_t \times I_q$$), 오차가 있더라도 같은 전압만 넣어주기 때문에 피드백을 넣어 줄 수가 없다.  
  
``` c
case TorqueControlType::voltage:
      voltage.q = _constrain(current_sp, -voltage_limit, voltage_limit) + feed_forward_voltage.q;
      voltage.d = feed_forward_voltage.d;
      break
```
  
### 전류를 이용한 토크제어
하지만 전류센서를 통해 실제로 모터에 들어가는 전류를 측정 할 수 있다면, 피드백 제어가 가능하기 때문에 정밀한 토크제어가 가능하다.  
  
코드에서는 전류센서를 통해 전류를 측정하고, LFP(Low Pass Filter)를 거친 뒤 PID제어를 통해 원하는 전류가 나오도록 피드백 제어를 한다.  
``` c
case TorqueControlType::foc_current:
      if(!current_sense) return;
      // constrain current setpoint
      current_sp = _constrain(current_sp, -current_limit, current_limit) + feed_forward_current.q;
      // read dq currents
      current = current_sense->getFOCCurrents(electrical_angle);
      // filter values
      current.q = LPF_current_q(current.q);
      current.d = LPF_current_d(current.d); 
      // calculate the phase voltages
      voltage.q = PID_current_q(current_sp - current.q);
      voltage.d = PID_current_d(feed_forward_current.d - current.d);
      // d voltage - lag compensation
      if(_isset(axis_inductance.q)) voltage.d = _constrain( voltage.d - current_sp*shaft_velocity*pole_pairs*axis_inductance.q, -voltage_limit, voltage_limit);
      // q voltage - cross coupling compensation - TODO verify
      if(_isset(axis_inductance.d)) voltage.q = _constrain( voltage.q + current.d*shaft_velocity*pole_pairs*axis_inductance.d, -voltage_limit, voltage_limit);
      // add feed forward
      voltage.q += feed_forward_voltage.q;
      voltage.d += feed_forward_voltage.d;
      break;
```
  
### 추정 전류 제어
  
추정 전류 제어는 전류가 얼마나 나오는지 모르기 때문에, target에 1A를 출력하라고 하면 모터의 물리적 특성을 통해 옴의 법칙 (V = IR)에 따라 1A가 흐를 법한 전압을 넣어주는 방식이다.  
  
따라서 전압 제어 방식보단 일정한 토크가 흐를 가능성이 높지만, 진정한 FOC제어라고 보기는 어렵다.  
  
이번 프로젝트에서는 simple mini를 사용해 전류 측정 기능이 없어 추정 전류 제어 방식을 사용하였다.  
``` c
case TorqueControlType::estimated_current:
      if(! _isset(phase_resistance)) return; 
      // constrain current setpoint
      current_sp = _constrain(current_sp, -current_limit, current_limit)  + feed_forward_current.q; // desired current is the setpoint
      // calculate the back-emf voltage if KV_rating available U_bemf = vel*(1/KV)
      if (_isset(KV_rating)) voltage_bemf = estimateBEMF(shaft_velocity);
      // filter the value values
      current.q = LPF_current_q(current_sp);
      // calculate the phase voltage
      voltage.q = current.q * phase_resistance + voltage_bemf;
      // constrain voltage within limits
      voltage.q = _constrain(voltage.q, -voltage_limit, voltage_limit) + feed_forward_voltage.q;
      // d voltage  - lag compensation 
      if(_isset(axis_inductance.q)) voltage.d = _constrain( -current_sp*shaft_velocity*pole_pairs*axis_inductance.q, -voltage_limit, voltage_limit) + feed_forward_voltage.d;
      else voltage.d = feed_forward_voltage.d;
      break;
``` 
  
추정 전류 제어 방식에서는 각 상저항과 타겟 전류 + kv를 통해 모터가 회전할때 발생하는 역기전력을 예측해(bemf), 해당 전류를 흐르게 할만한 전압을 제어 한다는 것을 알 수 있다.  
  
그렇다면 먼저 상저항을 구해야 하는데, 이건 직접 측정하여 구할수 있다.  
3상중 2개에 리드선을 두어 측정하는데, BLDC모터가 Y-결선인경우 1/2를 하여서 사용한다.(Y-결선 그림을 보면 쉽게 이해 가능)  
<p align="center">
  <img src="/assets/images/impedance_control/res.jpg" width="400px"/>
  <br/>
  <strong>그림 5.</strong> 상저항 측정 값
</p>
따라서 나는 $$5.98 / 2 \text{옴}$$을 사용했다.  
  
KV의 경우 SimpleFOC에서 구하는 기능을 지원해서 그것을 통해 구하였다.  
<p align="center">
  <img src="/assets/images/impedance_control/kv_check.png" width="400px"/>
  <br/>
  <strong>그림 6.</strong> kv check
</p>
  
KV의 경우 어떤 V에서도 이론상 일정해야 하지만, 아무래도 하드웨어적인 문제로 오차가 조금 있어서 1v일때 kv값인 170을 사용 했다.  
  
<p align="center">
  <a href="https://youtu.be/05NoxKzyMZI?si=bup-s8i_bAMC-Y5E&t=48">
    <img src="http://img.youtube.com/vi/05NoxKzyMZI/0.jpg" alt="Video Label">
  </a>
   <br/>
   Torque control test
</p>
토크 제어 영상을 살펴보면, 토크 제어의 경우 환경에 매우 수동적이다.  
따라서 환경에서 모터를 막아도 그냥 그 토크를 내기만 하기 때문에 그냥 그 환경에 수용한다.  
  
영상에서도 손으로 막으면 그냥 쉽게 멈추는 것을 알 수 있는데, 그냥 지령 토크만(전류) 계속 내고 있기 때문이다.  
  
### 임피던스제어
임피던스 제어는 다음 글에서 작성을 하도록 하겠다.  