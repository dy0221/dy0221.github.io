---
title: '2.전동기 기본 동작 원리-2'
date: 2026-01-02
permalink: /posts/motor-control/2/
tags:
  - Study note
  - Motor control
  - kr
excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/2
---

### 자기 에너지  

모터 제어에서는 코일의 감은 수 $$N$$과 그 코일에 통과하는 자속 $$\phi$$로 정의 되는 **쇄교 자속($$\lambda$$, Flux Linkage)**를 사용한다. 
단위는 **[Wb-turns],(웨버 턴)**을 사용하지만, 턴은 무차원 수 이므로 그냥 **[Wb]**를 많이 사용한다.  

<p align="center">
$$
\lambda = N\phi
$$
</p> 
  
$$B-H$$ 곡선처럼 $$\lambda - i$$ 곡선이 존재 한다. 두 곡선 사이에 비례 관계가 있기 때문에 개형이 비슷하다.  
<p align="center">
  <img src="/assets/images/motor_control/2/flux-current-curve.png" width="450px"/>
  <br/>
  <strong>그림 1.</strong> 쇄교자속-전류 특성 곡선
</p>

그래프 속 기울기, 쇄교 자속 $$\lambda$$와 전류 $$i$$의 비를 **인덕턴스($$L$$, Inductance)** 라고 한다. 단위는 **[H],(헨리)**를 사용한다.  
인덕턴스는 전계와 자계의 관계를 결정 짓는 중요한 파라미터이다.  
<p align="center">
$$  
L = \frac{\lambda}{i} = N\frac{\phi}{i}
$$
</p> 

전류를 많이 넣어주면, 자속이 증가하는 것을 알수 있다. 이때 일정하게 자속이 증가하는 부분을 선형 영역이라 한다.  
하지만 일정 전류를 넘어가면 자속이 더이상 늘어나지 않는데, 이 부분을 포화 영역이라고 한다.  
  
$$\lambda$$와 $$i$$의 특성은 철심과 같은 자성체의 자화 특성뿐 만아니라 자기 경로에 존재 하는 공극에도 영향을 받는다.  
모터의 경우 부하가 움직여야 하기 때문에 공극이 필연적이다. 공극에 존재하는 공기는 철심에 비해 투자율이 매우 작아 자기 경로의 
자기 저항을 크게 증가시켜 인덕턴스가 작아진다.  
<p align="center">
  <img src="/assets/images/motor_control/2/airgap.png" width="450px"/>
  <br/>
  <strong>그림 2.</strong> 공극의 길이와 인덕턴스
</p>
  
이제 자기에너지를 구해보자. 먼저 전기 에너지가 자기 에너지를 거쳐 기계 에너지로 변환 되는 과정에서 전기와 자기에너지 부분만 먼저보자.  
먼저 기계가 없다고 생각하고, 전기 에너지($$W_e$$)가 모두 자기 에너지($$W_f$$)로 변환된다고 생각해보자.  
  
철손(hysteresis loss, eddy current loss)가 없다고 생각하면, 코일의 열에 의한 손실인 **동손($$i^2R$$)**을 제외한 전기 에너지가 모두 자기에너지로 변환 된다.  
  
<p align="center">
  <img src="/assets/images/motor_control/2/field-energy.png" width="450px"/>
  <br/>
  <strong>그림 3.</strong> 공극의 길이와 인덕턴스
</p>
  
<p>
\begin{align}
dW_e &= Pdt = vidt \\[4pt]
dW_e &= dW_f + dW_{동손},\,\, dW_f=(vi-i^2R)dt=(v-iR)idt
\end{align}
</p>   
  
전압을 인가했을 때, 코일에는 패러데이의 전자기 유도 법칙에 따라 유도기전력($$e$$)이 발생하게 된다.  
그러면 이에 관한 KVL식을 작성하면 다음과 같다.  

<p align="center">
$$  
i = \frac{v-e}{R} \rightarrow v= Ri + e = Ri + \frac{d\lambda}{dt}
$$
</p>   

전압 방정식과 에너지 식을 통해 자기 에너지와 쇄교 자속이나 전류의 함수로 표현 할 수 있다.  
<p>
\begin{align}
dW_f &= \frac{d\lambda}{dt}idt = i d\lambda \\[4pt]
W_f &= \int_{0}^{\lambda} id\lambda \\[4pt]
W_f &= \int \frac{\lambda}{L(x)}d\lambda \, \, or \, \, \int id(L(x)i) \, (\because L = \frac{\lambda}{i}) \\[4pt]
W_f &= \frac{\lambda^2}{2L(x)} \, \, or \, \, \frac{1}{2}L(x)i^2
\end{align}
</p> 
  
자기 에너지($$W_f = \int id\lambda $$)는 $$\lambda - i$$곡선에서 위의 부분의 면적인 것을 알 수 있다.  
  
<p align="center">
  <img src="/assets/images/motor_control/2/coenergy.png" width="450px"/>
  <br/>
  <strong>그림 4.</strong> energy-coenergy (출처:위키피디아)
</p>

아래 면적은 coenergy($$W_{f}' = \int \lambda di $$)로 표현하는데, 선형 영역에서 다루므로 $$W_f = W_{f}'$$으로 계산한다.
  
### 직선 운동 기계 에너지 변환
  
전기전자에너지가 기계에너지로 바뀌는 과정을 살펴보자.  
전동기의 경우 일반적으로 고정되어 있는 고정자와 부하가 달려 움직일 수 있는 회전자로 이루어져 있다.  
회전하는 기계를 보기전에 그림 5처럼 직선으로 움직이는 기계를 살펴보자.  

<p align="center">
  <img src="/assets/images/motor_control/2/linear-move-system.png" width="450px"/>
  <br/>
  <strong>그림 5.</strong> 직선 운동 시스템
</p>
  
코일에 전류가 흐르게 되면, 철심에 자속이 발생되어 운동자가 철심으로 움직이게 된다.  
이때 회전자와 고정자 사이에 공극이 감소하게 되고 자기 저항 성분이 감소하고 더 큰 쇄교 자속이 발생해, 인덕턴스가 증가한다는 의미를 갖는다.  

<p align="center">
  <img src="/assets/images/motor_control/2/lambda-i-fast.png" width="550px"/>
  <br/>
  <strong>그림 5.</strong> 운동자와 쇄교 자속-전류 곡선
</p>

운동자가 움직일때 운동자가 빠르게 움직이는 상황과 느리게 움직이는 극단적인 상황 2개로 나눌 수 있다.  
결론 부터 말하면 둘다 결과가 같다.  

<p>
\begin{align}
F_m &= \frac{1}{2}i^2\frac{\partial L(x)}{\partial x} \\[4pt]
F_m &= -\frac{\phi^2}{2} \frac{\partial \mathcal{R}(x)}{\partial x} 
\end{align}
</p> 
  
첫 번째 식을 보면, 힘은 인덕턴스가 커지는 방향(공극이 줄어드는 방향)으로 발생 한다.  
두 번째 식을 통해서도, 힘은 자기저항이 작아지는 방향(공극이 줄어드는 방향)으로 작용함을 알 수 있다.   
  
### case1 운동자가 빠르게 움직이는 경우
  
첫번째는 운동자가 빠르게 움직여 움직이는 동안에는 자속이 변하지 않고 움직임이 끝나고 자속이 변하는 경우이다.  
그림5에서 왼쪽 그래프를 확인하면 전류가 $$I$$일때, 원래는 자속이 $$\lambda_1$$이였다. 
공극이 감소하면서 쇄교 자속도 증가해야 하지만, 동작점이 A에서 C로 되고 운동이 끝난후에 C에서 B로 변한다.   

자속이 변화하지 않는다는 것은 전기 에너지의 공급량이 0이라는 것이다. $$(\because dW_e = Pdt = \frac{d\lambda}{dt}idt = id\lambda = 0)$$  
이는, 에너지 보존 법칙에서 기계적인 에너지는 자기에너지로 부터 변환했다는 것을 알 수 있다. 

<p align="center">
$$  
dW_e = dW_f + dW_m \, \rightarrow \, dW_m = -dW_f
$$ 
</p>

사용한 기계에너지는 자기에너지의 감소량인 OAC와 같다는 것을 알 수 있다.  
  
기계 에너지를 힘과의 관계로 나타내면 다음과 같다.  

<p>
\begin{align}
F_mdx &= dW_m \, \rightarrow \, F_m = \frac{\partial W_m}{\partial x} = -\frac{\partial W_f(i,x)}{\partial x} \Big|_{\lambda=constant} \\[10pt]
F_m &= -\frac{\partial W_f(i,x)}{\partial x}\Big|_{\lambda=constant} =-\frac{\partial}{\partial x} \left( \frac{\lambda^2}{2L(x)} \right)\Big|_{\lambda=constant}\\[4pt]
    & = \frac{\lambda^2}{2L(x)^2} \frac{\partial L(x)}{\partial x} = \frac{1}{2}i^2\frac{\partial L(x)}{\partial x}

\end{align}
</p> 

### case2 운동자가 느리게 움직이는 경우  
  
운동자가 느리게 움직이는 경우에는 자속이 운동자가 움직임에 따라 천천히 증가한다. (그림 5의 오른쪽에서 A에서 B로 변한다.)
자속이 천천히 움직이는 경우 유기기전력$$e$$가 0에 가까워 전류$$i$$의 변동이 적다고 생각한다.  

에너지의 변화를 살펴보면 공급된 전기 에너지$$W_e$$는 쇄교자속이 $$\lambda_1$$에서 $$\lambda_2$$로 변하면서 사각형$$\lambda_2BA\lambda_1$$만큼 증가한다.($$\lambda$$는 점은 아니지만 편의상 지정했다.)  

자기 에너지$$W_f$$의 경우는 $$OA\lambda_1 - OB\lambda_2$$만큼 변화한다.  

마지막으로 기계에너지$$W_m$$는 Coenergy$$W_f'$$의 증가량과 같다.  


<p>
\begin{align}
W_f' &= i\lambda - W_f \\[4pt]
dW_f' &=  id\lambda + \lambda di -dW_f \\[4pt]
dW_f' &= id\lambda + \lambda di - (dW_e-dW_m) = id\lambda + \lambda di - (id\lambda -dW_m) \\[4pt]
dW_f' & = \lambda di + dW_m = dW_m (\because di = 0)
\end{align}
</p> 
  
우리는 $$W_f=W_f'$$라고 가정하기 때문에, 이제 힘과 에너지의 관점으로 보면 운동자가 빠를때와 같은식이 나오게 된다.  
<p>
\begin{align}
F_mdx &= dW_m \, \rightarrow \, F_m = \frac{\partial W_m}{\partial x} = \frac{\partial W_f'(i,x)}{\partial x} \Big|_{i=constant} \\[10pt]
F_m &= \frac{\partial W_f(i,x)}{\partial x}\Big|_{i=constant} =\frac{\partial}{\partial x} \left( \frac{1}{2}L(x)i^2 \right)\Big|_{i=constant}\\[4pt]
    & = \frac{1}{2}i^2\frac{\partial L(x)}{\partial x}

\end{align}
</p>
  
마지막으로 자기저항에 관련된 식은 자기 에너지를 자기저항에 관한 식으로 두고 전개하면 구할수 있다.  

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈  
2. K-MOOC, 전동기제어, 이교범 