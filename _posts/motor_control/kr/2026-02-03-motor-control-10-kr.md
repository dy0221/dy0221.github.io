---
title: '10.d-q축 변환'
date: 2026-02-03
permalink: /posts/motor-control/10/
tags:
  - Study note
  - Motor control
  - kr

excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/10
---
### 수식계산이 너무 많아 생략한것이 많습니다.
### d-q축 변환
  
이전 글에서 교류 전류를 받는 유도, 동기 전동기는 속도 제어를 하기 힘들어서 d-q축 변환을 한다고 했다. d-q축 변환을 하게되면, 전류나 전압제어를 통해 쉽게 속도를 제어 할 수 있다. 
  
전동기의 전류, 역기전력, 자속등 3상 교류전동기의 변수들을 d,q,n축의 직교(Orthogonal Axis)로 변환 하는 것을 d-q축 변환이라고 한다.  
   
**d축(Direct Axis)**  
d축은 통상 전동기의 자속이 발생하는 축이다. d축은 교류 전동기의 벡터 제어에서 기준이 되는 축이다.  
  
**q축(Quadrature Axis)**  
q축은 전동기가 회전하는 방향에 d축보다 90도 앞선축으로 벡터 제어에서 토크를 발생하는 전류(역기전력)의 축이 된다.  
  
**n축(Neutral Axis)**  
n축은 영상분(zero-sequence) 성분을 나타내며, 대칭 3상 시스템에서는 0이 된다.

d-q축 변환하는 좌표계는 정지한 정지좌표계와 회전하는 회전좌표계 2가지가 있다.  
정지 좌표계의 경우 d축을 일반적으로 a축에 일치시킨다.  
  
d-q축을 회전시키는 이유는 앞서 교류전동기는 변수들이 시변수였었다. 따라서 이를 시불변수로 보기위해 시간에 따라 움직이는 시변수를 따라 같이 움직여서 시변수를 시불변수로 볼수 있도록 하기 위함이다.  
  
<p align="center">
  <img src="/assets/images/motor_control/10/d_q.png" width="450px"/>
  <br/>
  <strong>그림 1.</strong> d-q축의 회전좌표계와 정지좌표계, V/f 제어(출처:K-mooc,전동기제어)
</p>

### 행렬을 통한 d-q축 변환
  
정지되어 있는 $$d^s-d^q$$축 좌표계와 $$\omega$$의 각속도로 회전하고 있는 $$d^{\omega}-q^{\omega}$$ 좌표게에 $$\theta$$만큼의 각도차이가 있다고 해보자.  
($$\theta = \int_{0}^{t} \omega dt + \theta(0)$$)
  
d-q축 변환을 한다는 것은 abc축상의 변수 $$f_a, f_b,f_c$$를 d-q축 좌표계로 투영을 하는 것으로 볼 수 있다.  
  
먼저 정지해 있다고 생각하면 a축은 d축과 일치 할것이고, b축과 c축은 각각 $$120^{\circ}$$, $$240^{\circ}$$떨어져 있다.  
  
<p align="center">
$$    
f^s_d = k[f_a \cos(0) + f_b \cos(-\frac{2}{3}\pi) + f_c \cos(-\frac{4}{3}\pi)]
$$
</p>  
  
q축의 경우는 d축보다 $$90^{\circ}$$ 앞서 있다.  
<p>
\begin{align}
f^s_q &= k[f_a \cos(\frac{\pi}{2} + 0) + f_b \cos(\frac{\pi}{2}-\frac{2}{3}\pi) + f_c \cos(\frac{\pi}{2}-\frac{4}{3}\pi)] \\[4pt]
      &= k[-f_a \sin(0) - f_b \sin(-\frac{2}{3}\pi) - f_c \sin(-\frac{4}{3}\pi)]
\end{align}
</p> 
  
이제 d-q축이 회전한다고 일반화 하면 다음과 같다.  
<p>
\begin{align}
f^{\omega}_{dqn} &= T(\theta)f_{abc} \\[10pt]

T(\theta) &= \frac{2}{3} \begin{bmatrix}
                         \cos(\theta) & \cos(\theta-\frac{2}{3}\pi) & \cos(\theta-\frac{4}{3}\pi) \\
                         \sin(\theta) & -\sin(\theta -\frac{2}{3}\pi) & -\sin(\theta-\frac{4}{3}\pi)\\
                         \frac{1}{2}  & \frac{1}{2}                   & \frac{1}{2}
                         \end{bmatrix}
\end{align}
</p> 
$$k$$의 값이 $$\frac{2}{3}$$로 바뀌었는데, k는 abc상의 변수가 무엇인지에 따라 달라진다. 2/3을 사용하게 된다면, d-q축 변환된 값이 abc상에서 표현된 전압과 전류등 실효값과 일치하게 된다.(Magnitude Invariance) 하지만 그만큼 토크와 전력은 2/3이 줄어드는 특성이 있다.  

만약 $$\sqrt{2/3}$$을 사용할경우 전력과 토크가 같아진다.(Power Invariance)  
  
정지좌표계의 변환 행렬 $$T(0)$$은 말 그대로 $$\theta$$를 0으로 두면 된다.  
<p align="center">
$$    
f^s_{dqn} = T(0)f_{abc} = \frac{2}{3} \begin{bmatrix}
                         1 & -\frac{1}{2} & -\frac{1}{2} \\
                         0 & \frac{\sqrt{3}}{2} & -\frac{\sqrt{3}}{2}\\
                         \frac{1}{2}  & \frac{1}{2}& \frac{1}{2}
                         \end{bmatrix}                        
                         \begin{bmatrix}
                          f_a \\f_b \\f_c
                         \end{bmatrix}-\sin\theta(-\frac{4}{3}\pi)
$$
</p>  

<p>
\begin{align}
f^s_d &= \frac{2f_a -f_b -f_c}{3} \\[4pt]
f^s_q &= \frac{1}{\sqrt{3}}(f_b-f_c) \\[4pt]
f^s_n &= \frac{f_a +f_b +f_c}{3} \\[4pt]
\end{align}
</p> 

n축 (영상분)이 없다고 한 이유가 나오는데, 우리는 외력이 없다고 생각하기 때문에, $$f_a + f_b + f_c =0$$이기 때문이다.  
이 경우 식을 다시 써보면 다음과 같다.  

<p>
\begin{align}
f^s_d &= f_a \\[4pt]
f^s_q &= \frac{1}{\sqrt{3}}(f_b-f_c) \\[4pt]
\end{align}
</p> 

d-q축 값을 다시 abc축 값으로 돌리는 역변환 행렬은 다음과 같다. (영상분이 없는 경우)
<p align="center">
$$    
T(0)^{-1} = \frac{2}{3} \begin{bmatrix}
                         \cos(\theta)                &  \sin(\theta)                  & \frac{1}{2} \\
                         \cos(\theta-\frac{2}{3}\pi) & -\sin(\theta -\frac{2}{3}\pi)  & \frac{1}{2} \\
                         \cos(\theta-\frac{4}{3}\pi) & -\sin(\theta-\frac{4}{3}\pi)   & \frac{1}{2} \\
                         \end{bmatrix}                   
$$
</p> 

<p>
\begin{align}
f_a &= f^s_d \\[4pt]
f_b &= -\frac{1}{2}f^s_d + \frac{\sqrt{3}}{2}f^s_q \\[4pt]
f_c &= -\frac{1}{2}f^s_d - \frac{\sqrt{3}}{2}f^s_q
\end{align}
</p> 
  
기본적인 제어의 방식은 abc축을 d-q축으로 변환하고 다시 abc축으로 역변환해서 abc축에 원하는 값을 넣는 방향이 될것이다.  

### 정지좌표계 회전좌표계 변환
조금 더 정확하게 말하면, d-q축 정지 좌표계로 변환을 하고, 정지 좌표계를 회전 좌표계로 바꾸고 다시 역변환을 하는 형태가 많이 사용된다.  
  
정지 좌표계를 회전좌표계로 바꾸는 방법은 그냥 회전행렬을 곱해서 구한다.(책에서는 반시계 방향 회전이 정회전이라 생각하므로 반시계 방향 회전행렬을 곱한다.)
<p align="center">
$$    
f^e_{dqn} = R(\theta)f^s_{dqn} = \begin{bmatrix}
                                  \cos \theta  & \sin \theta  & 0 \\
                                  -\sin \theta & \cos \theta  & 0 \\
                                  0 & 0   & 1 \\
                                  \end{bmatrix} 
                                  \begin{bmatrix}
                                  f^s_d \\ f^s_q \\ f^s_n
                                  \end{bmatrix}               
$$
</p> 
$$f^e$$는 동기속도로 회전한다는 의미이다.  

<p>
\begin{align}
f^e_d &= f^s_d \cos \theta  + f^s_q \sin \theta \\[4pt]
f^e_q &= -f^s_d  \sin \theta + f^s_q\cos \theta \\[4pt]
\end{align}
</p> 

역변환은 다음과 같다.  
<p>
\begin{align}
f^s_d &= f^e_d \cos \theta  - f^e_q \sin \theta \\[4pt]
f^s_q &= f^e_d  \sin \theta + f^e_q\cos \theta \\[4pt]
\end{align}
</p> 

<p align="center">
  <img src="/assets/images/motor_control/10/d_q_transform.png" width="650px"/>
  <br/>
  <strong>그림 2.</strong> 좌표 변환 과정(출처:모터제어 책)
</p>
  
### 복소수 벡터를 이용한 좌표 변환
abc 상의 변수 들은 각상의 축에 크기를 갖고 존재한다. 또한 각상들은 $$120^{\circ}$$의 간격으로 존재한다.  
그렇다면, 이는 복소 평면 상에서 공간 벡터로 표현 할수 있다.  
또한 각 공간벡터들을 더해 하나의 공간벡터 $$f_{abc}$$를 만들수 있다.  

<p align="center">
  <img src="/assets/images/motor_control/10/complex_number.png" width="450px"/>
  <br/>
  <strong>그림 3.</strong> 복소수 공간 벡터
</p>

각각의 공간 벡터를 표현해보면,  
a상은 회전을 하지 않았으므로 그대로 $$f_a$$  
b상은 $$120^{\circ}$$ 반시계 회전했으므로, $$f_b e^{j\frac{2}{3}\pi}$$  
c상은 $$240^{\circ}$$ 반시계 회전했지만 반대로 시계로 $$120^{\circ}$$ 회전했다고 할수 있으므로 $$f_c e^{-j\frac{2}{3}\pi}$$이다.  
  
<p align="center">
$$    
f_{abc} = \frac{2}{3} [f_a + af_b + a^2 f_c] (a= e^{j\frac{2}{3}\pi},a^2 = e^{-j\frac{2}{3}\pi})            
$$
</p> 
  
공간 벡터 $$f_{abc}$$는 각주파수 $$\omega_e$$에 비례한 각속도로 회전한다.  
그렇다면, 실수 축을 d축, 허수축을 q축이라고 보면 공간 벡터를 d-q축에 투영함으로써, d-q축 변환을 할 수 있다.  
  
우리가 구한것은 결국 정지 좌표계의 d-q축 벡터이다.  
정지 좌표계에서 회전 좌표계로 변환을 해주려면, 그만큼 회전만 해주면 된다.  
  
<p>
\begin{align}    
f^e_{dq} &= f^s_{dq}e ^{-j\theta_e} \\[4pt]
f^s_{dq} &= f_{abc}e^{-j0} = f_{abc} 
\end{align}
</p> 
  
공간 벡터 $$f_{abc}$$로 부터 abc상 변수를 구하는 방법은 0도로 회전시켜 구할수 있다.  
<p>
\begin{align}    
f_a &= Re[f_{abc}] + f^{\omega}_n \\[4pt]
f_b &= Re[a^2 f_{abc}] + f^{\omega}_n \\[4pt]
f_c &= Re[a f_{abc}] + f^{\omega}_n 
\end{align}
</p> 

### 유도 전동기 d-q축 변환

유도전동기의 고정자와 회전자의 전압 방정식과 쇄교 방정식을 d-q축 변환을 해보자.  
<p>
\begin{align}    
v_{abcs} &= R_s i_{abcs} + \frac{d\lambda_{abcs}}{dt} \\[4pt]
v_{abcr} &= R_r i_{abcr} + \frac{d\lambda_{abcr}}{dt}  \\[10pt]

\begin{bmatrix} \lambda_{abcs} \\ \lambda_{abcr} \end{bmatrix}
&=
\begin{bmatrix} L_s & L_{sr} \\ (L_{sr})^T & L_r \end{bmatrix}
\begin{bmatrix}    i_{abcs} \\ i_{abcr} \end{bmatrix}
\end{align}
</p>

전압 방정식에 회전 행렬을 곱해주면 된다.  

<p>
\begin{align}    
v_{abcs} &= R_s i_{abcs} + \frac{d\lambda_{abcs}}{dt} \\[4pt]
\rightarrow T(\theta)v_{abcs} &= T(\theta)R_s i_{abcs} + T(\theta)\frac{d\lambda_{abcs}}{dt} \\[4pt]
\rightarrow v^{\omega}_{dqns} &= T(\theta)R_s (T(\theta)^{-1}i^{\omega}_{dqns}) + T(\theta)\frac{d(T(\theta)^{-1}\lambda^{\omega}_{dqns})}{dt} \\[4pt]
&(T(\theta)R_s (T(\theta)^{-1}) = R_s)\\[4pt]
\rightarrow v^{\omega}_{dqns} &= R_si^{\omega}_{dqns} + T(\theta)\frac{dT(\theta)^{-1}}{dt}\lambda^{\omega}_{dqns} + T(\theta)T(\theta)^{-1}\frac{d\lambda^{\omega}_{dqns}}{dt} \\[4pt]
&(T(\theta)\frac{dT(\theta)^{-1}}{dt}\lambda = \omega\begin{bmatrix} 0 & -1 & 0 \\ 1&0&0 \\ 0&0&0 \end{bmatrix}) \\[10pt]

\rightarrow v^{\omega}_{dqns} &= R_s i^{\omega}_{dqns}  + \begin{bmatrix} 0 & -\omega & 0 \\ \omega&0&0 \\ 0&0&0 \end{bmatrix} \lambda^{\omega}_{dqns} +  \frac{d\lambda^{\omega}_{dqns}}{dt}

\end{align}
</p>

<p>
\begin{align}    
v^{\omega}_{ds} &= R_s i^{\omega}_{ds} + \frac{d \lambda^{\omega}_{ds}}{dt} - \omega \lambda^{\omega}_{qs} \\[4pt]
v^{\omega}_{qs} &= R_s i^{\omega}_{qs} + \frac{d \lambda^{\omega}_{qs}}{dt} + \omega \lambda^{\omega}_{ds} \\[4pt]
v^{\omega}_{ns} &= R_s i^{\omega}_{ns} + \frac{d \lambda^{\omega}_{ns}}{dt}
\end{align}
</p>
  
시을 살펴보면, 축의 회전으로 인해 속도 전압항 **$$\omega \lambda^{\omega}_{qs},\omega \lambda^{\omega}_{ds}$$**가 존재하고, 이는 각각 다른 축의 성분에 영향을 미친다는 것 을 알수 있다.  

**회전자의 전압 방정식**의 경우 고정자와 비슷하다. 

<p>
\begin{align}   
\rightarrow v^{\omega}_{dqnr} &= R_r i^{\omega}_{dqnr}  + \begin{bmatrix} 0 & -(\omega-\omega_r) & 0 \\ (\omega-\omega_r)&0&0 \\ 0&0&0 \end{bmatrix} \lambda^{\omega}_{dqnr} +  \frac{d\lambda^{\omega}_{dqnr}}{dt}  \\[10pt] 

v^{\omega}_{dr} &= R_s i^{\omega}_{dr} + \frac{d \lambda^{\omega}_{dr}}{dt} - (\omega-\omega_r) \lambda^{\omega}_{qr} \\[4pt]
v^{\omega}_{qr} &= R_s i^{\omega}_{qr} + \frac{d \lambda^{\omega}_{qr}}{dt} + (\omega-\omega_r) \lambda^{\omega}_{dr} \\[4pt]
v^{\omega}_{nr} &= R_s i^{\omega}_{nr} + \frac{d \lambda^{\omega}_{nr}}{dt}
\end{align}
</p>
  
이는 회전자는 동기속도 $$\omega, n_s$$에서 회전자의 실제속도 $$\omega_r, n$$을 뺀 상대 속도 $$sn_s$$와 관련 있다는 것을 알 수 있다.  

**고정자 쇄교 자속**식은 다음과 같다.  
<p>
\begin{align}    
\lambda_{abcs} &= L_s i_{abcs} + L_{sr}i_{abcr} \\[4pt]
\rightarrow T(\theta)\lambda_{abcs} &= T(\theta)L_s i_{abcs} + T(\theta)L_{sr}i_{abcr} \\[4pt]
\rightarrow \lambda^{\omega}_{dqns} &= T(\theta)L_s(T(\theta)^{-1} i^{\omega}_{dqns}) + T(\theta)L_{sr}(T(\theta)^{-1}i^{\omega}_{dqnr}) \\[4pt]

\big( T(\theta)L_sT(\theta)^{-1} &= T(\theta) \begin{bmatrix}
                                             L_{ls} + L_{ms}  & -\frac{L_{ms}}{2} & -\frac{L_{ms}}{2} \\
                                            -\frac{L_{ms}}{2}  & L_{ls} + L_{ms} & -\frac{L_{ms}}{2} \\ 
                                            -\frac{L_{ms}}{2}  & -\frac{L_{ms}}{2} & L_{ls} + L_{ms} \end{bmatrix} T(\theta)^{-1} \\[4pt]
                                            &=
                                            \begin{bmatrix}
                                             L_{ls} + \frac{3}{2}L_{ms}  & 0 & 0 \\
                                            0  & L_{ls} + \frac{3}{2}L_{ms} & 0 \\ 
                                            0  & 0 & L_{ls} + L_{ms} \end{bmatrix} \big) \\[4pt]
\big( T(\theta)L_{sr}T(\theta)^{-1} &= \begin{bmatrix}
                                            \frac{3}{2}L_{ms}  & 0 & 0 \\
                                            0  & \frac{3}{2}L_{ms} & 0 \\ 
                                            0  & 0 & 0 \end{bmatrix} \big) \\[10pt]
                            
\rightarrow \lambda^{\omega}_{dqns} &=\begin{bmatrix}
                                        L_{ls} + \frac{3}{2}L_{ms}  & 0 & 0 \\
                                        0  & L_{ls} + \frac{3}{2}L_{ms} & 0 \\ 
                                        0  & 0 & L_{ls} + L_{ls} \end{bmatrix} i^{\omega}_{dqns} +
                                        \begin{bmatrix}
                                            \frac{3}{2}L_{ms}  & 0 & 0 \\
                                            0  & \frac{3}{2}L_{ms} & 0 \\ 
                                            0  & 0 & 0 \end{bmatrix} i^{\omega}_{dqnr}
\end{align}
</p>

$$L_m = \frac{3}{2} L_{ms}, L_s = L_{ls} + L_m$$이라고 두면, 다음과 같이 정리 할 수있다.  
<p>
\begin{align}   
\lambda^{\omega}_{qs} &= L_{ls} i^{\omega}_{qs} + L_m(i^{\omega}_{qs} + i^{\omega}_{qr}) = L_s i^{\omega}_{qs} + L_m i^{\omega}_{qr} \\[4pt]
\lambda^{\omega}_{ds} &= L_{ls} i^{\omega}_{ds} + L_m(i^{\omega}_{ds} + i^{\omega}_{dr}) = L_s i^{\omega}_{ds} + L_m i^{\omega}_{dr} \\[4pt]
\lambda^{\omega}_{ns} &= L_{ls} i^{\omega}_{ns}
\end{align}
</p>
  
**회전자의 쇄교자속**식은 다음과 같다.  

<p>
\begin{align}   
\rightarrow \lambda^{\omega}_{dqnr} &=\begin{bmatrix}
                                        L_{lr} + \frac{3}{2}L_{mr}  & 0 & 0 \\
                                        0  & L_{lr} + \frac{3}{2}L_{mr} & 0 \\ 
                                        0  & 0 & L_{lr} \end{bmatrix} i^{\omega}_{dqnr} +
                                        \begin{bmatrix}
                                            \frac{3}{2}L_{ms}  & 0 & 0 \\
                                            0  & \frac{3}{2}L_{ms} & 0 \\ 
                                            0  & 0 & 0 \end{bmatrix} i^{\omega}_{dqns} \\[10pt]

\lambda^{\omega}_{dr} &= L_{lr} i^{\omega}_{dr} + L_m(i^{\omega}_{ds} + i^{\omega}_{dr}) = L_s i^{\omega}_{dr} + L_m i^{\omega}_{ds} \\[4pt]
\lambda^{\omega}_{qr} &= L_{lr} i^{\omega}_{qr} + L_m(i^{\omega}_{qs} + i^{\omega}_{qr}) = L_s i^{\omega}_{qr} + L_m i^{\omega}_{qs} \\[4pt]
\lambda^{\omega}_{nr} &= L_{lr} i^{\omega}_{nr}
\end{align}

</p>

위에 식은 권선비를 1로 하여, $$L_m = \frac{3}{2} L_{mr} =\frac{3}{2} L_{ms}$$로 하고 고정자 처럼  $$L_r = L_{lr} + L_m$$로 하여 간단히 정리한 식이다.  
  
쇄교 자속 식을 보면, 시변수가 불시변수로 변하였고, d축에 관한 식과 q축에 관한 식을 각각 따로 분리한것을 확인 할 수 있다.  
  
$$d^{\omega}-q^{\omega}$$축의 등가회로는 다음과 같다.  

<p align="center">
  <img src="/assets/images/motor_control/10/induction_motor_eq.png" width="500px"/>
  <br/>
  <strong>그림 4.</strong> 유도 전동기의 d-q축 등가회로(출처: 모터제어 책)
</p>

마지막으로 전압 방정식과 쇄교자속식을 정리하면 다음과 같다.  

<p>
\begin{array}{l l} 
v^{\omega}_{ds} = R_s i^{\omega}_{ds} + \frac{d \lambda^{\omega}_{ds}}{dt} - \omega \lambda^{\omega}_{qs}            
& \quad \lambda^{\omega}_{qs} = L_s i^{\omega}_{qs} + L_m i^{\omega}_{qr}\\[4pt]
v^{\omega}_{qs} = R_s i^{\omega}_{qs} + \frac{d \lambda^{\omega}_{qs}}{dt} + \omega \lambda^{\omega}_{ds}            
& \quad \lambda^{\omega}_{ds} = L_s i^{\omega}_{ds} + L_m i^{\omega}_{dr}\\[4pt]

v^{\omega}_{dr} = R_s i^{\omega}_{dr} + \frac{d \lambda^{\omega}_{dr}}{dt} - (\omega-\omega_r) \lambda^{\omega}_{qr} 
& \quad \lambda^{\omega}_{dr} = L_s i^{\omega}_{dr} + L_m i^{\omega}_{ds}\\[4pt]
v^{\omega}_{qr} = R_s i^{\omega}_{qr} + \frac{d \lambda^{\omega}_{qr}}{dt} + (\omega-\omega_r) \lambda^{\omega}_{dr} 
& \quad \lambda^{\omega}_{qr} = L_s i^{\omega}_{qr} + L_m i^{\omega}_{qs}
\end{array}
</p>

**출력 토크**의 경우 처음 기본동작에서 다뤘듯이 두 전류와 상호 인덕턴스로 나타 낼 수 있다.  
<p align="center">
$$    
T_e = (\frac{P}{2})(i_{abcs})^T \frac{\partial L_{sr}}{\partial \theta_r}i_{abcr}          
$$
</p> 

결론만 말하자면 토크식은 다음과 같다.  

<p align="center">
$$    
T_e = \frac{P}{2} \frac{3}{2} L_m (i^{\omega}_{qs}i^{\omega}_{dr}-i^{\omega}_{ds}i^{\omega}_{qr}) \quad (L_m = \frac{3}{2}L_{ms})          
$$
</p> 

### 동기 전동기 d-q 축 변환 (IPMSM)

동기전동기의 고정자 회로는 유도 전동기와 동일 하므로 d-q축 고정자 전압 방정식은 유도 전동기와 같다.  

<p>
\begin{align}    
v^{\omega}_{ds} &= R_s i^{\omega}_{ds} + \frac{d \lambda^{\omega}_{ds}}{dt} - \omega \lambda^{\omega}_{qs} \\[4pt]
v^{\omega}_{qs} &= R_s i^{\omega}_{qs} + \frac{d \lambda^{\omega}_{qs}}{dt} + \omega \lambda^{\omega}_{ds} \\[4pt]
v^{\omega}_{ns} &= R_s i^{\omega}_{ns} + \frac{d \lambda^{\omega}_{ns}}{dt}
\end{align}
</p>

다만 회전자가 다르기 때문에 쇄교 자속식이 다르다. 
<p>
\begin{align}
\lambda_{abcs} &= L_s i_{abcs} + L_fI_f \\[4pt]
\rightarrow T(\theta)\lambda_{abcs} &= T(\theta)L_s i_{abcs} + T(\theta)L_fI_f \\[4pt]
\rightarrow \lambda^{\omega}_{dqns} &= T(\theta)L_s(T(\theta)^{-1} i^{\omega}_{dqns}) + T(\theta)L_fI_f \\[4pt]
&(T(\theta)L_sT(\theta)^{-1} = \begin{bmatrix}
                                L_{ls} + \frac{3}{2}L_A  & 0 & 0 \\
                                0  & L_{ls} + \frac{3}{2}L_A & 0 \\ 
                                0  & 0 & L_{ls} \end{bmatrix} + \frac{3}{2}L_B 
                                \begin{bmatrix}
                                -\cos2(\theta-\theta_r) & \sin2(\theta-\theta_r) & 0 \\
                                \sin2(\theta-\theta_r)  & \cos2(\theta-\theta_r) & 0 \\ 
                                0  & 0 & 0 \end{bmatrix}) \\[4pt]
&(T(\theta)L_f = L_{sf}\begin{bmatrix} \cos(\theta -\theta_r)\\ -\sin(\theta-\theta_r)\\ 0
                        \end{bmatrix}) \\[10pt]

\rightarrow  \lambda^{\omega}_{dqns} & = \begin{bmatrix}
                                L_{ls} + \frac{3}{2}L_A -\frac{3}{2}L_B\cos2(\theta-\theta_r) & \frac{3}{2}L_B\sin2(\theta-\theta_r) & 0 \\
                                \frac{3}{2}L_B\sin2(\theta-\theta_r)  & L_{ls} + \frac{3}{2}L_A +\frac{3}{2}L_B\cos2(\theta-\theta_r) & 0 \\ 
                                0  & 0 & L_{ls} \end{bmatrix} i^{\omega}_{dqns} 
                                + \begin{bmatrix} \cos(\theta -\theta_r)\\ -\sin(\theta-\theta_r)\\ 0
                                 \end{bmatrix} \phi_f

\end{align}
</p>
  
자속은 인덕턴스와 전류의 곱이므로 $$\phi_f = L_{sf}I_f$$이다. 또한, $$L_{ds} = L_{ls} + \frac{3}{2}(L_A -L_B), L_{qs} = L_{ls} + \frac{3}{2}(L_A +L_B)$$로 
두고 다음과 같이 간단히 표현 할 수 있다.  
  
<p align="center">
$$      
\lambda^{\omega}_{dqns}  = \begin{bmatrix}
                                \frac{L_{ds}+ L_{qs}}{2} + \frac{L_{ds}- L_{qs}}{2} \cos 2(\theta-\theta_r) & \frac{L_{ds}- L_{qs}}{2} \sin 2(\theta-\theta_r) & 0 \\
                                \frac{L_{ds}- L_{qs}}{2} \sin 2(\theta-\theta_r)  & \frac{L_{ds}+ L_{qs}}{2} + \frac{L_{ds}- L_{qs}}{2} \cos 2(\theta-\theta_r) & 0 \\ 
                                0  & 0 & L_{ls} \end{bmatrix} i^{\omega}_{dqns} 
                                + \begin{bmatrix} \cos(\theta -\theta_r)\\ -\sin(\theta-\theta_r)\\ 0
                                 \end{bmatrix} \phi_f
$$
</p>
  
동기 전동기는 시변수를 제거하기 위해서는 전기각속도가 회전자의 각속도와 같아야 한다 $$(\theta=\theta_r)$$ 그렇게 되면 다음과 같은 식을 알 수 있다.  
<p>
\begin{align}     
\lambda^{r}_{dqns}  &= \begin{bmatrix}
                                L_{ds} & 0 & 0 \\
                                0  & L_{qs} & 0 \\ 
                                0  & 0 & L_{ls} \end{bmatrix} i^{r}_{dqns} 
                                + \begin{bmatrix}\phi_f\\ 0\\ 0
                                 \end{bmatrix} \\[10pt]
\lambda^{r}_{ds} &= L_{ds}i^{r}_{ds} + \phi_f \\[4pt]
\lambda^{r}_{qs} &= L_{qs}i^{r}_{qs} \\[4pt]
\lambda^{r}_{ns} &= L_{ns}i^{r}_{ns}
\end{align}
</p>

<p align="center">
  <img src="/assets/images/motor_control/10/sychronous_motor_eq.png" width="600px"/>
  <br/>
  <strong>그림 5.</strong> 동기 전동기의 d-q축 등가회로(출처: 모터제어 책)
</p>
  
전압과 쇄교자속 방정식을 정리하면 다음과 같다.  
  
**IPMSM의 회전자 각속도 $$\omega_r$$로 회전하는 $$d^r-q^r$$축 방정식**
  
<p>
\begin{array}{l l} 
v^{r}_{ds} = R_s i^{r}_{ds} + \frac{d \lambda^{r}_{ds}}{dt} - \omega_r \lambda^{r}_{qs}            
& \quad \lambda^{r}_{ds} &= L_{ds}i^{r}_{ds} + \phi_f\\[4pt]
v^{r}_{qs} = R_s i^{r}_{qs} + \frac{d \lambda^{r}_{qs}}{dt} + \omega_r \lambda^{r}_{ds}            
& \quad \lambda^{r}_{qs} &= L_{qs}i^{r}_{qs}
\end{array} 
</p>
   
동기 전동기의 출력 토크는 다음과 같다.  
  
<p align="center">
$$    
T_e = \frac{P}{2} \frac{3}{2} [\phi_f i^r_{qs} + ((L_{ds}-L_{qs})i^r_{ds}i^r_{qs})]        
$$
</p>
  
유도전동기와 비슷한듯 다른데, 일단 $$\phi_f i^r_{qs}$$라는 영구 자석에 의한 토크가 추가되었다. 또한 릴럭턴스 토크 식이 조금 다르다.  


### 동기 전동기 d-q축 변환 (SPMSM)

SPMSM은 IPMSM과 다르게 회전자가 비돌극형이다.   
  
이 말은 d축과 q축에 인덕턴스가 같다는 말이고, 따라서 쇄교자속식에서만 $$L_B=0$$으로 두고 풀면 다음과 같다.  

<p align="center">
$$      
\lambda^{r}_{dqns}  = \begin{bmatrix}
                                L_{ds} & 0 & 0 \\
                                0  & L_{qs} & 0 \\ 
                                0  & 0 & L_{ls} 
                                \end{bmatrix} i^{r}_{dqns} 
                                +\phi_f \begin{bmatrix} 
                                \cos(\theta-\theta_r)\\ 
                                -\sin(\theta-\theta_r)\\ 
                                0
                                \end{bmatrix} 
$$
</p>

전압과 쇄교자속 방정식을 정리하면 다음과 같다.  
  
**SPMSM의 회전자 각속도 $$\omega$$로 회전하는 $$d^{\omega}-q^{\omega}$$축 방정식**
  
<p>
\begin{array}{l l} 
v^{\omega}_{ds} = R_s i^{\omega}_{ds} + \frac{d \lambda^{\omega}_{ds}}{dt} - \omega \lambda^{\omega}_{qs}            
& \quad \lambda^{\omega}_{ds} &= L_{ds}i^{\omega}_{ds} + \phi_f \cos(\theta - \theta_r)\\[4pt]
v^{\omega}_{qs} = R_s i^{\omega}_{qs} + \frac{d \lambda^{\omega}_{qs}}{dt} + \omega \lambda^{\omega}_{ds}            
& \quad \lambda^{\omega}_{qs} &= L_{qs}i^{\omega}_{qs} -\phi_f \sin(\theta - \theta_r)
\end{array} 
</p>
  
**SPMSM의 회전자 각속도 $$\omega_r$$로 회전하는 $$d^r-q^r$$축 방정식**
  
<p>
\begin{array}{l l} 
v^r_{ds} = R_s i^r_{ds} + \frac{d \lambda^r_{ds}}{dt} - \omega \lambda^r_{qs}            
& \quad \lambda^r_{ds} &= L_{ds}i^r_{ds} + \phi_f \\[4pt]
v^r_{qs} = R_s i^r_{qs} + \frac{d \lambda^r_{qs}}{dt} + \omega \lambda^r_{ds}            
& \quad \lambda^r_{qs} &= L_{qs}i^r_{qs}
\end{array} 
</p>
  
출력 토크는 다음과 같다.  

<p align="center">
$$    
T_e = \frac{P}{2} \frac{3}{2} \phi_f i^r_{qs}   
$$
</p>

IPMSM과 다르게 영구자석에 의한 토크만 존재하는 것을 알 수 있다.  
정확하게는 자속 $$\phi_f$$와 q축의 성분의 전류와 상호작용해서 나오는 것을 알 수 있다.  

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈 
2. K-MOOC, 전동기제어, 이교범  