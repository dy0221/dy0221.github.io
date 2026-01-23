---
title: '3.전동기 기본 동작 원리-3'
date: 2026-01-09
permalink: /posts/motor-control/3/
tags:
  - Study note
  - Motor control
  - kr
excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/3
---

### 회전 기계 운동 에너지 변환  

회전 운동에서 힘은 토크$$T$$로써 표현한다. 
직선운동에서 얻은 힘에 관한 식을 토크로 변환하면, 회전 기계에서 사용하는 식으로 사용 할 수 있다.  
  
<p align="center">
$$  
T = \frac{1}{2}i^2\frac{dL(\theta)}{d\theta}\, = \, -\frac{1}{2}\phi^2\frac{d\mathcal R(\theta)}{d\theta}
$$
</p> 
  

<p align="center">
  <img src="/assets/images/motor_control/3/rotation_machine.png" width="550px"/>
  <br/>
  <strong>그림 1.</strong> 회전 기계 시스템
</p>

회전 기계도 인덕턴스가 증가하는 방향(자기저항이 감소하는 방향)으로 힘이 작용한다. 이를 릴럭턴스(인덕턴스) 토크라고 하며, 이 토크를 이용한 회전기계를 
릴럭턴스 전동기로 한다.  

직류전원을 여자하는 경우 $$\theta$$가 0도에서 $$\frac{dL}{d\theta}$$가 0이 되어 멈추게 된다. 따라서 교류전원 $$i_s = I_m  \cos \omega_s t$$로 여자한다.  

이 경우의 릴럭턴스 토크는 다음과 같다.  

<p align="center">
$$  
T = \frac{1}{2}i_s^2\frac{dL_{ss}(\theta)}{d\theta}
$$
</p>  

$$L_{SS}$$는 **고정자 자기 인덕턴스**로 이후에 상호 인덕턴스를 위해 필요한 표기법이다. 고정자 권선에 쇄교되는 자속에 대한 고정자 코일에 흐르는 전류의 비를 뜻한다.  
  
$$L_{ss}$$는 회전자가 움직임에 따라 공극이 변해 회전자 위치 $$\theta$$의 함수다. $$0\,^{\circ}$$, $$180\,^{\circ}$$에서 $$L_{max}$$를 갖고, $$90\,^{\circ}$$, $$270\,^{\circ}$$에서 $$L_{min}$$을 갖게 된다.  
  
이 뜻은 주기 $$\pi$$를 갖고 평균값이 $$L_0$$, 진폭 $$L_2$$를 갖는 주기 함수로 표현 할 수 있다.  
<p>
\begin{align}
L_{ss}(\theta) &= L_0 +L_2 \cos 2\theta \\[4pt]
L_0 = \frac{L_{max} + L_{min}}{2} &\,\, , \,\, L_2 = \frac{L_{max} + L_{min}}{2}
\end{align}
</p>   

  
이를 토크 식에 넣으면 다음과 같다.  
<p>
\begin{align} 
T &= \frac{1}{2}i_s^2\frac{dL_{ss}(\theta)}{d\theta} = -\frac{1}{2}(I_m  \cos \omega_s t)^2 \frac{d}{d\theta} \left( L_0 + L_2  \cos 2\theta \right) \\[4pt]
  &=-I_m^2L_2 \sin 2\theta  \cos ^2\omega_s t
\end{align}
</p>  

마지막으로 $$\theta$$를 초기 위치 $$\delta$$와 각속도 $$\omega_m$$로 회전한다고 하면 다음과 같다.  
<p align="center">
$$  
\theta = \omega_mt + \delta
$$
</p>  

이를 토크식에 넣으면 다음과 같다.  
<p>
\begin{align} 
T &= -I_m^2L_2 \sin 2(\omega_m t + \delta)  \cos ^2\omega_s t = -I_m^2L_2 \sin 2(\omega_m t + \delta)\frac{1+ \cos 2\omega_s t}{2}\\[4pt]
  &= -\frac{1}{2}I_m^2 L_2 \{  \sin 2(\omega_m t+\delta) +  \sin 2(\omega_m t + \delta) \cos 2\omega_s t \}\\[4pt]
  &= -\frac{1}{2}I_m^2 L_2 \{  \sin 2(\omega_m t+\delta) + \frac{1}{2} \sin 2([\omega_m + \omega_s]t + \delta) + \frac{1}{2} \sin 2([\omega_m - \omega_s]t + \delta) \}
\end{align}
</p>  

토크를 이런 정현 함수로 나타내는 이유는 토크의 평균값과 동기속도를 알기 위함이다. 토크는 위에서 말했듯이 전동기가 움직이려면 토크가 필요하다.  
  
하지만 sin함수는 주기성을 갖기 때문에 일반적인 경우는 평균값이 0이 나오므로 회전을 하지 않게 된다. 따라서 주기성을 갖지 않게 되는 $$\omega_m = 0$$이거나 
$$\omega_m = \pm \omega_s$$일 때만 토크를 갖게 된다.  
  
여기서 $$\omega_m = 0$$라는 것은 회전자가 움직이지 않는다는 것이니깐 제외를 하면, 회전자의 각속도 $$\omega_m$$이 고정자에 흐르는 전류의 각속도 $$\omega_s$$(**동기 속도**)만큼 회전을 할경우에만 
토크가 발생한다.  
  
### case 1 일반적인 $$\omega_m$$
<p align="center">
  <img src="/assets/images/motor_control/3/case1_torque.png" width="700px"/>
</p>

### case 2 $$\omega_m = 0$$  

$$\omega_m$$이 0이라는 것은 회전자가 회전을 하지 않는 것이므로 제외 한다.  

### case 3 $$\omega_m = \pm \omega_s$$


<p>
\begin{align} 
T_{avg} &= I_m^2L_2 \frac{1}{t} \int_{0}^{t} \{ \sin2(\omega_mt+\delta) + \frac{1}{2}sin2((-)2\omega_s t +\delta) + \frac{1}{2} \sin 2\delta \} \\[4pt]
  &= I_m^2L_2 \frac{1}{t} \int_{0}^{t} \frac{1}{2} \sin 2\delta \\[4pt]
  &= -\frac{1}{4}I_m^2L_2 \sin 2\delta \\[10pt]
T_{avg}  &= -\frac{1}{8}I_m^2(L_{max}-L_{min}) \sin 2\delta
\end{align}
</p>  
  
이러한 조건에 따라 회전하는 기기를 **동기 릴럭턴스 전동기(Synchronous Reluctance Motor)**라고 한다.  
  
### 이중 여자 기기  

이중 여자 기기는 고정자에 전류를 흘려보낼 뿐만아니라 회전자 또한 전류를 보내어 움직이는 기기를 말한다.  
전류를 통해 만들어지는 자속이 2개가 되므로 서로의 자속으로 생기는 인덕턴스 또한 고려해 줘야 한다. 이를 **상호 인덕턴스**라고 한다.[상호 인덕턴스 정보 link](https://en.wikipedia.org/wiki/Inductance#Mutual_inductance)

<p align="center">
  <img src="/assets/images/motor_control/3/doubly_fea_motor.png" width="600px"/>
  <br/>
  <strong>그림 2.</strong> 이중 여자 기기 시스템
</p>

회전자를 고정시키고 생각해보면, 모든 전기에너지는 자계 에너지로 변환된다.  
<p align="center">
$$  
dW_f = dW_e = P_sdt + P_rdt = i_sd\lambda_s + i_rd\lambda_r
$$
</p>

여기서 쇄교자속은 고정자나 회전자에 모두 들어가는 자속을 의미한다. 예를들어 $$\lambda_s$$는 고정자의 쇄교자속으로 $$i_s$$로 만들어지는 자속 뿐만아니라 
$$i_r$$이 만들어져 쇄교하는 자속 또한 포함한다.  

<p>
\begin{align} 
\lambda_s &= \lambda_{ss} + \lambda_{sr} = L_{ss}i_s + L_{sr}i_r \\[4pt]
\lambda_r &= \lambda_{rr} + \lambda_{rs} = L_{rr}i_r + L_{rs}i_s
\end{align}
</p>  

토크를 구하면 다음과 같다.  
<p>
\begin{align} 
T &= \frac{\partial W_f'(i,\theta)}{\partial \theta} = \frac{\partial W_f(i,\theta)}{\partial \theta} \\[4pt]
  &= \frac{1}{2}i_s^2\frac{dL_{ss}}{d\theta} + \frac{1}{2}i_r^2\frac{dL_{rr}}{d\theta} +i_s i_r \frac{dL_{sr}}{d\theta} \, (L_{sr}=L_{rs})
\end{align}
</p>  

### 모터가 원통형인 이유

토크 식을 보면 첫번째 두 항은 회전자 $$\theta$$에 따른 고정자와 회전자의 릴럭턴스 토크를 나타낸다. 
마지막 항은 고정자와 회전자 권선 간의 상호 인덕턴스 변동에 의한 토크를 나타낸다.  
  
릴럭턴스 전동기의 경우 회전자의 각속도가 전류의 각속도와 같은 속도로 움직여야 한다.  
하지만 고정자의 전류의 각속도 $$\omega_s$$와 회전자의 전류의 각속도 $$\omega_r$$이 같지 않다면 동기화 해야하는 회전자의 각속도 $$\omega_m$$이 2개가 되는 문제가 생긴다.  
  
만약 한개의 각속도만 맞추게 된다면 나머지 한쪽에서는 진동하는 토크가 발생하게 된다. 이 문제는 릴럭턴스 토크를 제거하면 해결 할 수 있다.  
  
먼저 회전자를 원통으로 만들게 된다면, 회전자와 고정자 사이의 공극이 항상 일정하기 때문에 고정자의 자기 인덕턴스 $$L_{SS}$$는 항상 같게 된다. 따라서 $$\frac{dL_{ss}}{d\theta} = 0$$이므로 첫번째 릴럭턴스 토크가 사라지게 된다.  

고정자 또한 원통으로 만들게 된다면 회전자 시점에서의 고정자의 공극 또한 일정하게 되어 두번째 릴럭턴스 토크가 사라지게 된다. 따라서 회전기계에서 릴럭턴스 토크 성분을 제거하기 위해서는 회전자와 고정자 모두 원통형이 되어야 한다.  

<p align="center">
  <img src="/assets/images/motor_control/3/cylindrical_r_s.png" width="450px"/>
  <br/>
  <strong>그림 4.</strong> 원통형 고정자와 회전자 시스템(=비돌극형)
</p>
  

<p align="center">
$$  
T = i_s i_r \frac{dL_{sr}}{d\theta}
$$
</p>

토크의 경우 고정자 권선과 회전자 권선의 상대적인 위치에 따른 상호 인덕턴스에만 영향을 받는다.  

이 시스템을 살펴 보면, 회전자 권선과 고정자 권선이 $$90\,^{\circ}$$와 $$270\,^{\circ}$$인 경우는 상호 인덕턴스가 0이 된다.(서로 쇄교하는 자속이 없기 때문에)
$$0\,^{\circ}$$인경우는 축과 방향이 모두 같게되어 상호 인덕턴스의 크기가 최댓값($$L_m$$)이 된다.  $$180\,^{\circ}$$인 경우는 반대로 가장 작은 $$-L_m$$이 된다.  
  
이 경우 상호 인덕턴스는 다음과 같이 표현할 수 있다.  
<p align="center">
$$  
L_{sr} = L_m \cos \theta
$$
</p>

<p>
\begin{align} 
i_s = I_{sm} \cos \omega_s t \\[4pt]
i_r = I_{rm} \cos (\omega_r t+ \alpha) \\[4pt]
\theta  = \omega_m t +\delta
\end{align}
</p>  

이렇게 가정하고 토크를 다시 표현하면 다음과 같다.  

<p>
\begin{align}
T &= i_s i_r \frac{dL_{sr}}{d\theta} \\[6pt]
  &= - I_{sm} I_{rm} L_m
    \cos \omega_s t \,
    \cos(\omega_r t + \alpha)\,
    \sin(\omega_m t + \delta) \\[6pt]
&= -\frac{I_{sm} I_{rm} L_m}{4}
\left[
\begin{aligned}
& \sin\!\bigl(\omega_m t + (\omega_s+\omega_r)t + \alpha + \delta \bigr) \\
&+ \sin\!\bigl(\omega_m t - (\omega_s+\omega_r)t - \alpha + \delta \bigr) \\
&+ \sin\!\bigl(\omega_m t + (\omega_s-\omega_r)t - \alpha + \delta \bigr) \\
&+ \sin\!\bigl(\omega_m t - (\omega_s-\omega_r)t + \alpha + \delta \bigr)
\end{aligned}
\right]
\end{align}
</p>  

평균 토크가 존재 하기 위해서는 
<p align="center">
$$  
|\omega_m| = |\omega_s \pm \omega_r|
$$
</p>
이 되어야 한다. 이 경우도 $$\omega_m=0$$인 경우를 제외하면 3가지 경우가 존재한다.  

### 직류전동기 DC Motor

직류 전동기의 경우는 고정자의 권선을 직류로 여자한다.($$\omega_s = 0$$) 따라서 다음 조건을 만족해야 한다.  
<p align="center">
$$  
|\omega_m| = |\omega_r|
$$
</p>
  
평균 토크는 다음과 같다.
<p align="center">
$$  
T_{avg} = - \frac{L_m}{2}I_{sm}I_{rm}
$$
</p>

### 동기 전동기 Synchronous Motor

동기전동기는 회전자 권선을 직류로 여자하는 방식이다.($$\omega_r = 0$$)

<p align="center">
$$  
|\omega_m| = |\omega_s|
$$
</p>

<p align="center">
$$  
T_{avg} = - \frac{I_{sm}I_{rm}}{2}L_m \sin \delta
$$
</p>

### 유도 전동기 Induction Motor

유도 전동기는 회전자와 고정자가 모두 교류로 여자되는 방식이다.  
이 방식에서는 회전자가 두 주파수의 차이만큼으로 회전해야 한다.  

<p align="center">
$$  
|\omega_m| = |\omega_s - \omega_r|
$$
</p>

<p align="center">
$$  
T_{avg} = - \frac{I_{sm}I_{rm}}{4}L_m \sin (\alpha + \delta)
$$
</p>

  
### 기어가 존재하는 부하 시스템  

기본적으로 부하 시스템의 운동방정식은 다음과 같다.  
<p align="center">
$$  
T_M = J\frac{d\omega}{dt} + B\omega +T_L
$$
</p>
$$T_M, T_L$$은 각각 모터와 부하가 받는 토크이고 $$J$$는 관성모멘트 $$B\omega$$는 마찰력이다.  

<p align="center">
  <img src="/assets/images/motor_control/3/gear_system.png" width="450px"/>
  <br/>
  <strong>그림 5.</strong> 기어 혹은 벨트가 있는 부하 시스템
</p>

기어가 있는 경우 기어가 움직인 변위는 모터의 기어와 부하의 기어 둘다 같다.  
<p align="center">
$$  
N_1\omega_M = N_2\omega_L
$$
</p>

또한 기어 양측에서의 동력(일률)도 같다.  
<p>
\begin{align}
T_M \omega_M = T_L \omega_L \\[4pt]
T_M \frac{N_2}{N_1} \omega_L = T_L \omega \\[10pt]

T_L = \frac{N_2}{N_1} T_M
\end{align}
</p>  
부하에 걸리는 토크는 기어비에 따라 모터에 걸리는 토크가 스케일링 되었다고 생각하면 편하다.  
  
부하의 관점에서 본 운동방정식은 다음과 같다.  
<p align="center">
$$  
T_L = J_L\frac{N_1}{N_2}\frac{d\omega_M}{dt} + B_L\frac{N_1}{N_2}\omega_M = \frac{N_2}{N_1} T_M
$$
</p>

최종적으로 모터의 관점으로본 운동방정식은 다음과 같다.  
<p align="center">
$$  
T_M = J_L\frac{N_1}{N_2}^2\frac{d\omega_M}{dt} + B_L\frac{N_1}{N_2}^2\omega_M
$$
</p>

결국 부하의 관성$$J_L$$과 마찰계수$$B_L$$는 기어비의 제곱과 관련 있다는 것을 알수있다.(정확히는 역수) 
### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈  