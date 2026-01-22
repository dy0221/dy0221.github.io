---
title: '6.Induction motor'
date: 2026-01-13
permalink: /posts/motor-control/6/
tags:
  - Study note
  - Motor control
  - kr

parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/6
---
  
### 유도 전동기(Induction motor)의 기본 원리    
     
유도 전동기는 교류 전동기의 한 종류 이다. 고정자의 3상의 권선에 교류 전류를 흘려보내면, 
고정자와 회전자 사이에 회전 자계가 생긴다.  
이와 회전자의 상호작용으로 회전자의 전류가 유도 되어 회전하는 모터이다.  
  
기본적으로 유도 전동기는 아라고의 원판(Arago's disk)를 바탕으로 움직인다.  
아라고의 원판 그 자체 보단 회전자와 회전자계의 상호작용으로 살펴보자.  

1. 회전자계가 회전자를 돌면, 플레밍의 오른손 법칙으로 유도 기전력이 발생한다. 

<p align="center">
  <img src="/assets/images/motor_control/6/induction_motor_rotation_principle.png" width="650px"/>
  <br/>
  <strong>그림 1.</strong> 유도 전동기의 회전 기본 원리
</p>

<p align="center">
  <img src="/assets/images/motor_control/6/fleming.png" width="450px"/>
  <br/>
  <strong>그림 2.</strong> 플레밍의 오른손(발전기), 왼손(전동기) 법칙 (출처:http://www.ktword.co.kr/test/view/view.php?no=4378)
</p>

1. 1 오른손 법칙은 도체가 움직일때 기준이다. 따라서 자석이 $$v$$방향으로 움직인다면, 정지 되어 있는 자계가 움직이는 것이 자신이 자계 반대 방향 $$-v$$방향 으로 움직인다고 생각 할수 있다. 이를 통해 플레밍의 오른손 법칙을 적용하면, 회전자의 오른쪽 부분을 보면, 유도 기전력이 뚫는 방향으로 생성된다는 것을 알 수 있다.  

2. 회전자가 폐회로라면, 유도 기전력에의해 전류가 흐르게 된다. 그러면 플레밍의 왼손법칙에 의하여 자석이 회전하는 방향으로 힘이 작용하여, 회전자가 자석의 회전 방향으로 회전한다.  
  
### 고정자(Stator)  
고정자의 경우 이해를 편하게 하기 위해 3상의 권선이 다음과 같이 결선 되어 있다고 생각한다.  
<p align="center">
  <img src="/assets/images/motor_control/6/stator.png" width="350px"/>
  <br/>
  <strong>그림 3.</strong> 고정자(출처:K-mooc,전동기제어)
</p>
고정자는 철심의 슬롯(slot)에 $$120\,^{\circ}$$(전기각) 간격으로 배치되어 Y자 결선 혹은 $$\delta$$결선으로 연결 되어 있다.  
  
고정자에서 중요한점은 이론적으로 그릴때는 $$120\,^{\circ}$$각 으로 각 상을 그리므로 권선 또한 그렇게 배치 되어 있다고 생각 할 수 있다. 
하지만 실제로는 공극에 정현적인 자속의 파형을 갖도록 여러 슬롯에 각 상의 도체들을 정현적(Sinusoidal) 분포로 위치 시킨다.
  
이를 **분포권(Distributed  Winding)**이라고 한다.  
<p align="center">
  <img src="/assets/images/motor_control/6/stator_slot.png" width="650px"/>
  <br/>
  <strong>그림 4.</strong> 고정자 a상 권선의 도체 분포와 기자력 분포(출처:K-mooc,전동기제어, 모터제어 책)
</p>

그림을 보면, a상의 위치에는 도체가 가장 많이 존재 하고 a상의 축으로 갈수록 점점 작게 해, 공극의 자속이 정현적으로 분포한다. 따라서 기자력(mmf) 또한 정현파 정확하계는 계단 모양을 이루며 정현파에 근사하는 것을 볼 수 있다.
  
### 회전자(Rotor)  
회전자의 경우는 농형과 권선형으로 나눌 수 있다. 농형은 막대 형태들의 도체들이 철심의 슬롯에 삽입되어 단락환(End Ring)으로 단락된 구조를 갖는다, 권선형은 고정자 처럼 3상의 권선이 분포권으로 배치되는 구조를 갖는다.  
  
유도기의 장점인 값싼 가격과 튼튼함 때문에 유도 전동기의 95%가 농형이지만, 모델링을 할때는 일반적인 모델을 위해 3상 권선을 가진 회전자로 모델링을 한다.  
  
### 회전자계
앞서 말한 것 처럼, 회전자가 회전하기 위해서는 회전자계가 필요한다. 회전자계가 무엇이고 어떻게 생성 되는지 알아보자.  
  
고정자에 들어가는 3상의 전류 중 한상의 전류 (a상)을 살펴 보자.  
a상에 교류 전류를 흘려보내면, 공극에 자속은 정현적으로 퍼져 있다. 따라서 기자력 또한 정현적으로 분포된다.  
<p align="center">
  <img src="/assets/images/motor_control/6/a_sang_current.png" width="650px"/>
  <br/>
  <strong>그림 5.</strong> 교류 1주기에 따른 a상 전류와 기자력(출처:K-mooc,전동기제어, 모터제어 책)
</p>
오른쪽 그래프를 살펴보면, x축인 $$\theta$$에 따라 기자력은 공간상에 정현적으로 분포하고, 전류의 크기에 따라 크기만 변한다.  
  
모든 상을 고려해보면, 각상은 $$120\,^{\circ}$$의 위상차를 가지므로 다음과 같이 표현 할 수 있다. $$\omega_s (=2 \pi f_s)$$는 전류의 각속도이고, $$f_s$$는 전류의 주파수 이다.  
<p>
\begin{align}
i_a &= I_m \cos \omega_s t \\[4pt]
i_b &= I_m \cos (\omega_s t - 120\,^{\circ}) \\[4pt]
i_c &= I_m \cos (\omega_s t + 120\,^{\circ})
\end{align}
</p> 
<p align="center">
  <img src="/assets/images/motor_control/6/3sang_crruent.png" width="250px"/>
  <br/>
  <strong>그림 6.</strong> 3상 전류(출처:K-mooc,전동기제어, 모터제어 책)
</p>
  
그림 6과 그림 7을 기준으로 $$t_0$$일 때의 상황을 살펴보자. 왼쪽 그림이나 오른쪽 그림 어느 곳을 보더라도, 3상 권선에서 발생하는 기자력의 합을 보면 NS극이 하나씩있는 한개의 자석처럼 보인다는 것을 알 수 있다. 
  
$$t_0$$일 때, 전류가 a상이 $$I_m$$으로 가장 크고 b와 c상이 $$-0.5I_m$$으로 같은 것을 알 수 있다. 따라서 기자력 또한 a상이 가장 크고, b,c상이 같은 것을 알 수 있다.  
  
1주기 동안 합성 기자력 $$F$$의 공간적 움직임을 살펴보면, a상->b상->c상의 축을 따라서 1회전을 한다. 
<p align="center">
  <img src="/assets/images/motor_control/6//1T_mmf.png" width="650px"/>
  <br/>
  <strong>그림 7.</strong> 전류 한주기에 대한 기자력의 회전
</p>

고정자는 물리적으로 고정되어 있지만, 3상 교류 전류에 의해 공극에서 일정한 크기를 유지하며 회전하는 자속(또는 기자력)이 형성되는데 이를 **회전자계**라고 한다.  
    
회전 자계의 속도를 **동기속도(Synchronous Speed, $$N_s$$)**라고 하는데, 극수(P)와 주파수($$f$$)에 의해 결정된다. 따라서 이는 정해지면 변하지 않는다.  
<p align="center">
$$  
N_s = \frac{2}{P} \cdot f \cdot 60 = \frac{120 f}{P}[\text{r/min}](\text{RPM})
$$
</p> 

합성 기자력을 수식적으로 구하면 다음과 같다.  
<p>
\begin{align}
F_a(\theta) &= N i_a \cos \theta \\[4pt]
F_b(\theta) &= N i_b \cos (\theta - 120\,^{\circ}) \\[4pt]
F_c(\theta) &= N i_c \cos (\theta + 120\,^{\circ}) \\[10pt]
F(\theta) &= F_a(\theta) + F_b(\theta) + F_c(\theta) \\[4pt]
          &= \frac{3}{2}N I_m \cos (\omega_s t - \theta)
\end{align}
</p> 

삼각함수 덧셈 정리와 규칙을 이용하면 풀 수 있다.  
<p align="center">
  <img src="/assets/images/motor_control/6/rotating_field.gif" alt="GIF animation" width="600">
  <br/>
</p>
이건 실제로 기자력의 움직임을 matlab으로 표현 한 것인데, 기자력이 각속도로 회전한다는 것을 시각적으로 확인 할 수 있다.  
  
합성기자력의 식을 분석해보면 크기는 한개의 상의 최대 기자력의 1.5배가 된다. 또한 어느 시점t에서는 공극의 위치$$\theta$$에 따라 기자력이 정현파의 형태로 분포 함을 알 수 있다. 이때 기자력의 최댓값은 $$\omega_s t = \theta$$인 위치에서 나타나는데, 이는 시간의 흐름에 따라 $$\omega_s$$의 속도로 이동하는 것을 의미한다. 따라서 합성 기자력은 전류의 각속도로 회전하는 회전자계를 형성한다.  
  

<p align="center">
  <a href="https://www.youtube.com/watch?v=DlOICAg9cPI">
    <img src="http://img.youtube.com/vi/DlOICAg9cPI/0.jpg" alt="Video Label">
  </a>
   <br/>
   모터의 권선과 극을 이해 하기 좋은 영상
</p>
### 유도 전동기 등가 회로(고정자)