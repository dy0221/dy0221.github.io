---
title: 'Impedance Control Survey Paper Review'
date: 2026-02-27
permalink: /posts/impedance-control-survey-paper-review/1/
tags:
  - Study
  - impedance control
  - Project
  - kr

excerpt: ""
parent_category: Project
category: Impedance Control
lang: kr
slug_id: Impedance Control/1
---

### 서론
이전에 모터의 작동 원리로 유도 전동기, 동기 전동기의 foc 제어 방법까지 공부를 했었다. 이를 공부하게 된 계기가 다음 같은 2족 보행 or 4족 보행 로봇을 만들어보고 싶어 찾아봤을때 다음과 같은 영상들을 접하게 되었다.  
<p align="center">
  <a href="https://www.youtube.com/watch?v=aNkJG4zc544">
    <img src="http://img.youtube.com/vi/aNkJG4zc544/0.jpg" width="45%" alt="Video 1">
  </a>
  <a href="https://www.youtube.com/shorts/EZ2KpCu2hEE">
    <img src="http://img.youtube.com/vi/EZ2KpCu2hEE/0.jpg" width="45%" alt="Video 2">
  </a>
</p>
여러 자료를 접하면서 임피던스 제어가 너무 신기해서 한번 해보고 싶다는 생각을 했었다. 그래서 BLDC모터로 영상과 같은 임피던스 제어를 해보기 위해 BLDC의 작동 방법중 하나인 foc제어를 공부했다. 이를 바탕으로 simple foc라는 모터 드라이버를 이용해서 모터를 제어하고 PD 임피던스 제어를 해보았다.  
  
임피던스 제어가 무엇인지 공부하기 위해 자료들을 찾아봤는데, 실제 처음 임피던스 제어가 나오게된 논문 등을 읽어볼까 하다가 제어도 잘 모르고, 임피던스 제어도 잘 모르는 입장에서 survey 논문이 처음 입문하기에 좋을 것 같아 읽어보고 한번 구현하는 프로젝트를 진행했다.  
  
읽어 본 논문은 다음과 같다.  
***Peng Song, Yueqing Yu and Xuping Zhang (2019). A Tutorial Survey and Comparison of Impedance Control on Robotic Manipulation***  
  
<div style="text-align: center; margin: 20px 0;">
  <a href="https://www.cambridge.org/core/journals/robotica/article/abs/tutorial-survey-and-comparison-of-impedance-control-on-robotic-manipulation/4C93E5D0778D23E0F9DDDA36E5E86C9E" 
     style="display: inline-block; padding: 12px 24px; background-color: #005596; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    📄 Read Full Paper (Robotica)
  </a>
</div>
  
이 논문은 Section 2에서 임피던스 제어가 무엇이고 어떤 원리인지 설명하고 Section 3에서 구현 방법을 알려 준다.  
4,5에서는 더 개선된 임피던스 제어 연구 방향과 실제 적용을 알려주고 있다.  
  
### 1. Introduction
임피던스 제어의 차별점
- motion(운동), contact force(접촉력)을 따로 따로 제어 하는 것이 아닌 그 둘의 동적인 상호 작용을 한다.
>First, the core idea of impedance control is to control the dynamic interaction between motion and contact force as desired instead of controlling these variables separately.
- Free motion(주위에 아무것도 없어서 자유롭게 움직이는 상황), constrained motion(환경에의해 방해를 받는 상황), transient process(과도 상황)에서 모드를 바꿀 필요없이 하나의 제어를 사용 할 수 있다.  
>Second, impedance control can be utilized in all manipulation phases consisting of free motion, constrained motion, and the transient process between them, without the need to switch different control modes.
- 운동과 접촉힘을 같이 제어하므로써 환경과 매니퓰레이터 간에 적절한 상호 작용이 가능하다.  
>Last, impedance control provides a possibility to control motions and contact forces simultaneously by designing a proper interaction between a manipulator and its environment.  
  
여기서 임피던스 제어가 무엇이고 왜 나오게 되었는 지에 관해 약간의 설명이 나온다. 임피던스 제어는 인간의 근육과 같은 성능을 내기 위해 나타 났다. 
이게 무슨 말이냐면, 우리가 근육을 생각 할때 힘을 낸다고만 생각하는 데, 실제로는 정교하게 임피던스를 제어한다. 여기서 **임피던스는 매니퓰레이터의 환경에 대한 동적인 응답을 말한다.** 
>The impedance actually defines the dynamic response of manipulator to its environment.
  
논문에서 인체의 팔로 예시를 들었는데, 팔을 주먹을 쥐고 뻗은 상태에서, 주먹에 몸쪽으로 향하는 힘을 받는다고 가정해보자.  
  
우리는 이를 **강직하게(stiffness)** 받아 내어 그대로 뻗고 있을 수도 있고(근육에 tension을 주어 아플 수도 있지만) **댐핑(damping)**을 주는 것 처럼 팔을 구부려 그 힘을 받을 수도 있을 것이다.  
또, 적절하게 그 사이에 적당히 구부릴 수 도 있을 것이다. 여기서 팔을 manipulator. 팔에서 힘을 주는 상황, 요인을 environment. 그리고 팔이 외부 상황에 어떻게 반응 할지가 impedance라고 할 수 있다.  
  
또한 최근에는 임피던스 이론이 많이 연구가 되어서 임피던스 제어 기술을 더 발전 시키거나 임피던스를 다양한 상황에 적용 되도록(작은 손가락이나 등등 여러가지) 확대 시키는 연구가 진행 되고 있다고 한다.  
  
### 2. Concepts and Principles  
이 논문에서는 왜 그런가 보다는 결론만 알려주는 부분이 많다. 따라서 일단 그런가 보다 생각하고, 더 관심이 생기면 다른 논문들을 찾아보는 것이 좋을 것 같다.  
  
임피던스는 입력(input flow, 매니퓰레이터)과 출력 힘(output effort, 환경)간의 동적인 상호 작용이다. 여기서 입력은 매니퓰레이터의 속도이고, 출력은 접촉 힘이다.  
  
라플라스 도메인에서 임피던스 $$Z(s)$$는 flow($$\dot{X}(s)$$)와 effort($$F(s)$$)간의 비율이다.  
<p>
\begin{aligned}
Z(s)&= F(s)\dot{X}(s) \\[4pt]
Z(s)&= F(s)sX_r(s) \, \, (X_r \text{는 위치, 라플라스 도메인에서 미분은 s를 곱하는 산술 연산}) \\[4pt]
\rightarrow F(s) &= sZ(s) \cdot X_r(s)
\end{aligned} 
</p>
  
이 식을 통해 알 수 있는 것은 $$X_r(s)$$와 $$F(s)$$가 독립 된 변수가 아니라는 것이다.  
임피던스 제어는 $$X_r(s)$$와 $$Z(s)$$를 조절 해 **자동으로 $$F(s)$$를 간접적으로** 제어하는 방법이다.  
  
$$Z(s)$$는 $$M$$ (관성, inertia), $$B$$ (댐핑, damping), 그리고 $$K$$ (강성, stiffness)로 다음과 같이 표현 된다.  
<p align="center">
$$    
Z(s) = Ms + B +K/s
$$
</p>  
<br>
<br>
$$X_r(s)$$은 상대적인 변위로, 매니퓰레이터의 **실제 위치**와 **평형 위치(equilibrium position)**의 차이로 구해진다.  
<p align="center">
$$    
X_r(s) = X(s) - X_v(s)
$$
</p>  
임피던스 식을 정리해서 라플라스 역변환 하면 다음과 같이 쓸 수 있다.  
<p align="center">
$$    
M_d(\ddot{x}-\ddot{x_v}) + B_d(\dot{x}-\dot{x_v}) + K_d(x-x_v) = F(t) 
$$
</p>  
  
> $$M_d, B_d$$, and $$K_d$$ represent the desired inertia, damping, and stiffness matrices determined by designer, whose dimensions depend on the degrees of freedom  
  
> $$F(t)$$ is the actual contact force  
  
>  $$x(t)$$ is the actual position vector of the end-effector; $$x_v(t)$$ refers to the virtual trajectory of the end-effector, which defines a series of virtual equilibrium positions for interaction.  
  
만약 외부에 접촉이 없다면, 가상의 궤적과 실제 매니퓰레이터의 위치가 같을 것이다. 하지만 외부의 접촉력 때문에 해당 위치로 가지 못한다면 가상의 평형점과의 오차가 생기게 된다.  
  
그렇다면 접촉력 $$F(t)$$와 가상 평형점과의 변위,속도,가속도 오차 사이의 동적 관계(impedance)를 제어하는 것이 임피던스 제어이다.  

이를 환경에 얼만큼 compliance(순응)할 것 인지 정한다고 할 수도 있다. 
>  impedance actually represents a measure of the dynamic compliance of the manipulator.  
  
정확하게는 임피던스를 어떻게 설정하냐에 따라 compliance가 달라지고, 이에 따라 환경과의 상호작용이 바뀐다.  
  
### 2.3 Impedance versus admittance  
  
임피던스와 어드미턴스는 상호보완 관계이다.  
  
환경이 어드미턴스로 설정하면 매니퓰레이터는 임피던스가 되고, 반대로 환경을 임피던스로 설정하면 매니퓰레이터는 어드미턴스가 된다.  
(일반적으로 매니퓰레이터를 임피던스, 환경을 어드미턴스로 설정한다.)  
  
- 임피던스   : input 운동, output 힘
- 어드미턴스 : input 힘,   output 운동 
    
다른 구현 영상들을 살펴보면, 임피던스 제어의 경우 모터에 외부에 움직임을 입력 받으면 그걸 수용하면서 지정된 임피던스로 되돌아 가려고 하고,
어드미턴스 제어의 경우 반대로 모터에 외부 힘을 받았을때, 그대로 움직임으로 변하는 것으로 느꼈다.  
  
### 2.4 Comparisons among different control shemes
1. position control  
우리가 모터제어를 할때 가장 처음 만나는 위치 제어는 free motion에서는 모터가 제어에 따라 추종을 잘 하지만, 환경에의해 제약된 constrained motion에서는 에러가 나고 강한 저항에의한 과도한 접촉력이 발생 할 수 있다.  
  
2. force control  
토크제어라고도 하는 힘제어는 환경에 매우 수동적이라 constrained motion에서 모터의 위치를 보장을 하지 못한다.  
  
3. hybrid position/force control  
position space와 force space를 환경구조와 기하학적인 환경에 따라 적절히 나눠서 사용한다.  
환경을 정확하게 알아야 하고, 그 사이의 과도기 상황은 에러나 과도한 접촉력이 발생 할 수 있다.  
  
-> 임피던스 제어는 위의 3가지 제어와 달리 2가지의 장점이 있다. "flexibility", "adaptability"  
  
- "flexibility": 유연성은 임피던스 파라미터를 유연하게 바꾸어 환경에대한 순응성(compliance)을 바꿀 수 있다.
- "adaptability": 적응성은 다양한 제어 환경에 사용이 가능하고, 모든 상황에 하나의 임피던스 모델이 사용될 수 있다.  
  

### 3. Impelemention
### 3.1 Coupled stability
servo system이나 impedance system 둘 다 제어를 잘 하기 위해서는 2가지의 기능 필요하다. "Nominal Stability", "Command Following"
  
- **Nominal Stability(예측된 안정성)** : 독립된 시스템에서의 안정성이 있어야 한다. >> (laplace domain에서 극점이 s-plane 왼쪽에 존재하도록 만듦)
> The “Nominal Stability” refers to the stability of the isolated system, such as the manipulator in the free space. 
+ In Laplace domain, the poles of the isolated system should be kept in the left half s-plane.  
  
- **Command Following(명령 추종)**    : 명령을 내리면 빠르고 정확하게 그 명령에 따라 움직이는 것이 필요하다.    
> The “Command Following” refers to the ability of the controlled system to track a reference command. 

이 2가지가 보장이 되어야 시스템의 제어 성능을 보장 할 수 있다.  
  
하지만, impedance system에서는 추가로 Coupled Stability가 요구된다.
  
- **Coupled Stability(결합 안정성)** : 매니퓰레이터와 환경의 결합에 대한 안정성을 의미한다.
> refers to the stability of the manipulator coupled with its environment.  
  
서보 제어기의 경우 환경의 방해(외란)이 있을 경우 그것을 거부한다. (예를 들어 90도 움직이라했을때, 거기 도착을 못하면 더 전류를 끌어다 써서 거기에 도달) 하지만 임피던스 제어기의 경우 적절한 임피던스에 따라 상호작용을 한다. 

따라서 free space에서 Nominal Stability를 보장한다고 해서 constrained space에서 까지 stability를 보장하지 않다. 따라서 Coupled Stability를 고려 해야 한다.  
  
결론적으로 결합 안정성은 passivity(수동성, 수동적인) 임피던스를 가진 매니퓰레이터와 passivity한 환경과 상호작용을 할 때, 보장 될 수 있다. 
  
- **passivity** : 상호작용이 된 지점에서 나오는 에너지는 받은 거보다 큰 에너지를 나오지 않는 시스템
> A system with “passivity” cannot output more energy at its port of interaction than that which has been put into the same port for all time.  
  
선형 단독 포트로 정의된 시스템에서 임피던스 $$Z(s)$$의 수동성을 가질 필요 충분조건 : 
1. $$Z(s)$$는 Right Half Plane(RHP)에 극점이 존재하면 안된다.
2. $$Z(s)$$의 허수 축의 극점은 simple(차수가 1)하고 잔차가 양의 실수를 가져야 한다.  
3. $$\text{Re}(Z(j\omega)) \geq 0$$.
  
이러한 기준은 임피던스 모델의 파라미터를 정하는 가이드가 된다.  
  
### 3.2 Implementation of the desired impedance  
  
임피던스를 정하는 방법에는 하드웨어 기반 방법과 소프트 웨어 기반 방법 2가지가 존재한다.  
  
하드웨어 기반 방법으로는 nonlinear spring이나 pneumatic muscle등 하드웨어적인 장치로 강성을 만들고 다양한 damper들로 댐핑을 만들어 직접적으로 매니퓰레이터에 임피던스를 주는 것이다.   
  
대부분의 하드웨어 기반 접근 방식은 수동적인 임피던스제어가 많다는 특징이 있고. 또한 물리적으로 임피던스를 주므로 신뢰성이 높고 각각의 special case에 맞춰서 사용할 수 있다는 장점이 있다.(하지만 물리적인 한계로 너무 작은 부분은 사용하기 힘들다.)
  
반대로 소프트웨어 기반 접근 방식은 설계나 구현에서 유연성이 높다.(임피던스 파라미터를 바꾸기 쉬우므로), 다만 소프트웨어 제어를 사용하므로 제어의 응답이 빨라야 성능이 나온다는 특징이 있다.  
  
소프트웨어 기반 접근 방식은 Position-based method, Torque-based method, Model-based method 3가지가 있다.  

### Position-based method   
<p align="center">
  <img src="/assets/images/impedance_control/position_base_method.png" width="600px"/>
  <br/>
  <strong>그림 1.</strong> position-based method 작동 다이어그램
</p>
포지션 기반 접근은 총 2가지의 loop로 구성되어 있다. 그림에는 outer loop만 표현이 되어 있는데, position servo system 또한 loop로 이루어져 있다.  
  
inner loop에서는 실시간으로 모터의 명령에 따른 위치로 이동한다. outer loop에서는 임피던스 제어가 이루어 지는 곳으로 원하는 임피던스를 통해 운동의 궤적을 계산한다.  
  
$$X_v$$는 앞에서 말했던 것 처럼 평형점이다. 매니퓰레이터는 환경으로 부터 접촉힘 $$F$$를 받아서 임피던스에 따라 적절한 $$\Delta X(=X-X_v)$$를 계산하고 이를 통해 $$X_c$$로 명령을 한다.  
  
그러면 매니퓰레이터는 입력 $$X_c$$로 움직이려고 한다.  
  
하지만, 또 다시 환경으로 부터 접촉력을 받아 현재 경로가 바뀌고 순환이 반복되어 제어가 이루어진다.  
  
### Torque-based method  
<p align="center">
  <img src="/assets/images/impedance_control/torque_base_method.png" width="600px"/>
  <br/>
  <strong>그림 2.</strong> torque-based method 작동 다이어그램
</p>
토크 기반 접근도 포지션 기반 접근과 비슷하지만 다른 점은 inner loop가 목표 토크 $$\tau_c$$를 추종한다는 것이다.  
  
또한 임피던스 모델도 원하는 임피던스에 대한 접촉힘을 계산한다는 점 또한 다르다.   
  
### model-base-method
이 방식은 다른 두가지 방식과 다르게 로봇의 동역학 모델이 요구 된다.  
임피던스 모델을 동역학 모델에 넣어 원래 동역학 모델은 보상되어 없어지고, 새로운 동역학 모델이 임피던스로써 생겨 제어 되는 방식이다.  
>the key step of this method is to substitute the target impedance model into the original dynamics model of the manipulator to derive the required control law. Under the action of the driving torque generated by this control law, the original dynamics of robot is compensated off, and the new dynamics is ideally shaped as the designed impedance.
  
<p align="center">
  <img src="/assets/images/impedance_control/model_base_method.png" width="600px"/>
  <br/>
  <strong>그림 3.</strong> model-based method 작동 다이어그램
</p>

<p align="center">
$$    
M(x)\ddot{x} + C(x,\dot{x})\dot{x}) + G(x) + f(\dot{x}) = J^{-T}\tau - F_{\text{ext}}
$$
</p>
위에와 같은 동역학 모델 식이 있고, 임피던스 식을 다음과 같이 변형하면 두 식을 합칠 수 있다.  
<p>
\begin{align}  
&M_d(\ddot{x}-\ddot{x_v}) + B_d(\dot{x}-\dot{x_v}) + K_d(x-x_v) = -F_{\text{ext}} \\[4pt]
&\ddot{x} = \ddot{x_v} -M_d^{-1}[B_d(\dot{x}-\dot{x_v}) + K_d(x-x_v) +F_{\text{ext}}] 
\end{align}
</p> 
  
그러면 식이 실제 사용되는 힘인 F_{\text{act}}로써 바뀌게 된다.  

<p>
\begin{align}  
\tau &= J^T F_{\text{act}} \\[4pt]
F_{\text{act}} &= F_{\text{ext}} + C\dot{x} + G + f + M{\ddot{x_v} -M_d^{-1}[B_d(\dot{x}-\dot{x_v}) + K_d(x-x_v) +F_{\text{ext}}]}
\end{align}
</p> 
  
### 3.4 Impedance design
  
어떤 임피던스 제어 방법을 사용할지 정했다면, 이제 가상 궤적(평형 점) $$X_v$$과 임피던스의 파라미터인 강성 $$K_d$$, 댐핑 $$B_d$$, 관성 $$M_d$$를 정해야 한다.  
  
### Design of virtual trajectory
가상 궤적은 평형점들의 집합이다.  
> The virtual trajectory defines a series of equilibrium positions to set the effective range of impedance control.
  
1. For human–machine interaction works  
사람과의 상호작용인 경우 임피던스 제어의 가상 궤적은 실제로 도달할수 있는 위치에 설정한다.  
2. For the mechanical manipulations
기계적인 작업에서 임피던스 제어는 닿을수 없는 위치에 설정한다. 예를 들어 로봇이 서있기 위해 가상 궤적을 지면 아래에 설정하면 지속적으로 힘을 주며 서있을 수 있게 된다.  (이 경우 만약 지면이 평형점이라면, 평형점과 실제 위치가 같으므로 아무런 힘이 없이 쓰러지게 된다.)

### Design of impedance parameter
임피던스 제어식을 다음과 같이 $$\Delta = x-x_v$$로 표현하면, 라플라스 도메인에서 접촉힘에 대한 변위(위치)의 전달 함수는 2차 시스템으로 표현 된다.  
<p>
\begin{align}  
& \Delta x = x - x_v \\[4pt]
& M_d \delta \ddot{x} + B_d \Delta \dot{x} + K_d \Delta x = F(t) \\[4pt]
\rightarrow &T_{imo}(s) = G(s) = \frac{\Delta X(s)}{F(s)} = \frac{1}{M_d s^2 + B_d s + K_d} \\[4pt]
&T_{imp}(s) = \frac{1/M_d}{s^2 + \frac{B_d}{M_d} s + \frac{K_d}{M_d}} = \frac{1/M_d}{s^2 + 2\zeta \omega_n s + \omega_n^2} 
\end{align}
</p> 
  
2차 시스템의 공식에 따라 감쇠비 $$\zeta$$와 자연 주파수 $$\omega_n$$은 다음과 같다.  
<p>
\begin{align}  
\zeta &= \frac{B_d}{2\sqrt{K_d M_d}} \\[4pt]
\omega_n &= \sqrt{\frac{K_d}{M_d}}
\end{align}
</p> 
  
일반적으로 $$K_d$$를 정상 상태를 기반으로 구하고, $$B_d, M_d$$를 2차 시스템의 수식에 따라서 구한다.  
  
### precise manipulation with stiff environment
정상 상태 오차 분석(steady-state-error)을 통해 $$K_d$$를 결정한다. 정상 상태의 경우 가속도와 속도가 0이므로 임피던스 제어식은 다음과 같다.

<p align="center">
$$    
K_d (x-x_v) = K_e (x_e - x)= K_e(x_e-x_v)-K_e(x-x_v) = F_d \, \, (K_e\text{는 환경의 강성} x_e\text{는 rest position(변형 되지 않을 경우 환경의 원래 위치)})
$$
</p>
  
매니퓰레이터의 정상 상태의 위치 오차를 $$e^P_{ss} = (x-x_v)$$로 정의하고 위치 오차로 정리하면 다음과 같다.  
<p>
\begin{align}  
K_d e^P_{ss} &= K_e(x_e-x_v)-K_ee^P_{ss} \\[4pt]
\rightarrow e^P_{ss} &= \frac{K_e (x_e - x_v)}{K_d + K_e}
\end{align}
</p> 
  
$$K_d$$는 다음과 같다.  
<p align="center">
$$    
K_d = \frac{F_d K_e}{K_e(x_e - x_v) - F_d}
$$
</p>  
  
$$K_d$$를 정했다면 역으로 접촉힘을 예측 할 수 있다.  
<p align="center">
$$
\hat{F} = K_d e^P_{ss} = \frac{K_d K_e (x_e - x_v)}{K_d + K_e}  
$$
</p>  
  
### 설계 방법  
  
1. $$K_d$$는 static impedance parmeter로 위에 수식을 따라 첫번째로 구한다.  
2. $$B_d, M_d$$는 dynamic impedance parmeter로 시스템의 동적인 반응성을 높인다.  
3. 시뮬레이션과 실험을 통해 parameter를 고쳐나간다.  

파라미터들의 ***직관적(dynamic specification)***이해.  
  
- K_d는 강성을 의미하므로 커지면 접촉힘이 커진다.  
- B_d는 댐핑을 의미하고, 커지면 모터의 운동이 느려지고 진동이 줄어든다.  
- M_d는 관성을 의미하고, 커지면 저주파와 높은 진동이 발생한다
  
### manipulation with soft environment
  
상대적으로 환경이 부드러우면 position-based method가 작동을 잘한다. 이경우 명령 $$x_c$$를 먼저 구한다.  
<p>
\begin{align}  
F_d &= K_e (x_e - x_c) \, \, \rightarrow \, \, x_c = x_e - \frac{F_d}{K_e} \\[4pt]
\rightarrow & \\[4pt]
x_c &= x_e - \frac{F_d}{K_e} \\[4pt]
K_d &= \frac{F_d}{x_c - x_v}
\end{align}
</p>
  
### + sampling으로 구현  
  
소프트웨어 제어에서 일반적으로 특정 주기로 계산을 진행하기 때문에 이경우 차분 방정식으로써 미분을 적용할 수 있다.  
<p>
\begin{align}  
& M_d \Delta \ddot{x} + B_d \Delta \dot{x} + K_d \Delta x = F_c(t) \\[4pt]
& \Delta x = x - x_v \\[4pt]
& \Delta \dot{x}(k) = \frac{\Delta x(k) - \Delta x(k-1)}{T_s} \\[4pt]
& \Delta \ddot{x}(k) = \frac{\Delta \dot{x(k)} - \Delta \dot{x(k-1)}}{T_s} 
\end{align}
</p>
$$T_s$$는 샘플링 주기이다.  
  
이를 통해 실시간으로 위치 오차를 추정할 수 있다.  
<p align="center">
$$
\Delta x(k) = \frac{F_c(k)T_s^2 + B_d T_s \Delta x (k-1) + M_d(2 \Delta x (k-1) - \Delta x (k-2))}{M_d + B_d T_s + K_d T_s^2}
$$
</p>  
  
### 4. Control Technique Development
  
임피던스 제어를 개선하는 다양한 방법이 있다.  
  
전부 다 정리하지는 않고 대략적인 방향을 말하자면, 위에서 파라미터들도 보면, 모델의 동역학식을 정확하게 모르거나 환경을 정하게 모르면 
임피던스 제어의 성능이 떨어진다.  
  
따라서, 이를 극복하기 위한 기법이 많이 생겼다. 크게 F에 F'추가적인 reference항을 다양한 방식으로 추가해 힘의 추종을 더 잘되게하는 방법과 
임피던스 파라미터를 가변해 다양한 환경에서 적절하게 사용될 수 있는 방법 2가지로 소개가 되었다.  

흥미로운 점은 둘다 신경망을 이용해 개선 하는 방법이 소개가 되었다는 점이 흥미로웠다.  

### 5. Applications, 6. Conclusions and Outlook
chapter 5는 임피던스 제어가 어디에 사용되는지 알려주는 부분이라 넘어가겠다.  
  
chapter6은 결론인데, 이 논문은 1980 부터 2018까지의 논문들로 쓰였다.  
  
더 나아갈 방향으로는
  
- 임피던스 파라미터 $$M_d, B_d, K_d$$를 어떻게 지정할 것인지에 대한 보다 체계적인 지침이나 방법론을 확립해야 합니다.
- 불확실한 동역학과 불확실한 환경 속에서도 로봇 조작이 동적 상호작용을 더 잘 달성할 수 있도록, 설계 가능한 임피던스를 갖춘 강인하고 적응형인 하드웨어를 개발해야 합니다.
- 동적 성능을 더욱 향상시키기 위해 임피던스 제어기에 더 새롭고 진보된 강인 제어, 적응 제어 및 학습 알고리즘을 통합해야 합니다. 임피던스 제어와 인공지능 기술의 결합은 유망한 방향이 될 수 있습니다.
- 이 연구에서 개괄한 것 외에도 로봇 조작의 다른 응용 분야에 대한 노력과 시도를 더해야 합니다.

로 마무리를 한다.  
  

***Peng Song, Yueqing Yu and Xuping Zhang (2019). A Tutorial Survey and Comparison of Impedance Control on Robotic Manipulation***  
  
<div style="text-align: center; margin: 20px 0;">
  <a href="https://www.cambridge.org/core/journals/robotica/article/abs/tutorial-survey-and-comparison-of-impedance-control-on-robotic-manipulation/4C93E5D0778D23E0F9DDDA36E5E86C9E" 
     style="display: inline-block; padding: 12px 24px; background-color: #005596; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    📄 Read Full Paper (Robotica)
  </a>
</div>

