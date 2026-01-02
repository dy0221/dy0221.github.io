---
title: '1.전동기 기본 동작 원리-1'
date: 2026-01-01
permalink: /posts/motor-control/1/
tags:
  - Study note
  - Motor control
  - kr

parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/1
---

### Motor의 기본 동작 원리  
  
전동기는 크게 보면 전기 에너지를 기계 운동 에너지인 토크로 변환하는 에너지 변환 기기이다. 
이때 전기를 토크로 변환하는 과정에서 자계(자기장)을 매개체로 사용한다. 
따라서 전동기의 기본 원리를 알기 위해서는 전기 시스템, 자계 시스템, 기계 시스템 간의 에너지 변환 과정을 알아야 한다.  

<p align="center">
  <img src="/assets/images/motor_control/1/motor-system.png" width="800px"/>
  <br/>
  <strong>그림 1.</strong> 전동기의 에너지 변환
</p>

전동기의 에너지 변환 또한 에너지 보존 법칙이 적용되어 공급된 전기 에너지 $$dW_{electrical-e}$$를 통해 자기 에너지 $$dW_{field-e}$$와 부하에서 사용하는 기계에너지$$dW_{mechanical-e}$$를 구할 수 있다.
<p align="center">
$$
dW_e = dW_f + dW_m + (dW_{loss})
$$
</p>
  
### 자계
  
**자계의 세기(H, Magnetic Field Intensity)**는 매질(철심, 공기 등)의 특성과 무관하게 오로지 전류(혹은 영구자석)에 의해 생성되는 순수한 자기장의 강도를 말한다. 
단위는 **[A/m],(암페어 퍼 미터)**을 사용한다.  
  
자기장의 세기가 H라면 실제로 그 자기장의 크기가 얼마 인가는 **자속(자기 선속)($$\phi$$, Magnetic Flux)**을 사용하여 표현한다. 막대 자석의 자기장을 표현할때 선 다발로 표현해서 자속이 많은 부분을 자기장이 세다고 표현하는데, 그때 사용했던 선이 자속이다. 단위는 **[wb],(웨버)**를 사용한다.  
  
이러한 자속이 단위 면적당 얼마나 존재 하는지를 표현하는 것이 **자속 밀도(B, Magnetic Flux Density)**이다. 단위는 **[T],(테슬라)**를 사용한다.  
<p align="center">
  <img src="/assets/images/motor_control/1/magnetic-flux-density.png" width="500px"/>
  <br/>
  <strong>그림 2.</strong> 자속, 자속밀도 (출처:qsstudy)
</p>
<p align="center">
$$
\Phi = \int_{A} \mathbf{B} \cdot \mathbf{n}\, dA
      = BA \cos\theta
$$
</p>  

전류를 이용해서 자속을 표현하는 그림은 그림3과 같이 철심에 코일을 감은 그림을 많이 사용한다.  
우리가 전기 에너지를 자기 에너지로 바꿔야 하는데, 자기 에너지를 다시 기계에너지로 바꾸는데 사용하는 매질이 만약 공기라면, 자기장의 세기 H가
아무리 세도 자속밀도, 자속이 크지 않을 것이다. 따라서 적은 전류로도 강한 자속을 이끌어 낼 수 있는 강자성체를 이용해 자속을 만들어 낸다.  
코일의 전류를 흐를때 철심에 흐르는 자속의 방향은 오른 나사 법칙을 통해 쉽게 알 수 있다.  

<p align="center">
  <img src="/assets/images/motor_control/1/coil-core.png" width="400px"/>
  <br/>
  <strong>그림 3.</strong> 철심, 코일, 자속
</p>

전류가 만들어내는 자기장의 세기 그자체가 H라면 자속 밀도 B는 자기장을 통해 실제로 우리가 기계적인 출력으로 바꿀수 있는 자기장의 세기 라고 생각하면 
편할 것 같다.  
H와 B는 어떤 매질의 투자율을 통해 표현 된다. 통상 공기의 투자율 $$\mu_0$$에 대한 상대 투자율 $$\mu_r$$로 표현 되는데, 철심은 투자율이 높아 높은 자속을 내고
공기는 투자율이 낮아 낮은 자속을 낸다고 생각 할 수 있다.  
<p align="center">
$$
B = \mu_0 \mu_r H [T\,또는\,Wb/m^2]
$$
</p>  

<p align="center">
  <img src="/assets/images/motor_control/1/b-h-curve.png" width="400px"/>
  <br/>
  <strong>그림 4.</strong> B-H 커브(자화 곡선)(출처:electricalworkbook)
</p>

자속 밀도의 경우 위에 식을 보거나 그림을 봐도 알 수 있듯이 자기장의 세기에 비례한다.  
하지만 그림에서 보이듯이 항상 선형으로 비례하는 것이 아닌 일정 구간이 넘어가면 자기장이 아무리 강해도 자속 밀도가 크게 증가 하지 않는다.  
따라서 자기를 다룰 때에는 점선 사이의 선형 비례 관계를 갖는 구간에서만 제어를 한다.  

자속을 발생시키는 힘을 **기자력($$\mathcal{F}$$ mmf, Magnetomotive Force)**라고 하고, N번 감은 코일에 전류 I가 흐를 때, $$F = NI$$로 표현한다. 
단위는 **[A or A-turn],(암페어 혹은 암페어 턴)**을 사용하는데, 턴(Turn)은 물리적 차원이 없는 무차원 수(Dimensionless number)이므로 일반적으로 암페어로 사용한다.  
<p align="center">
$$
\mathcal{F} = NI = \oint Hdl \,\,\rightarrow \,\, H = \frac{\mathcal{F}}{l}=\frac{NI}{l}
$$
</p>  

또한 자계에서도 전기와 같이 저항이 존재 한다. 이를 자기 저항($$\mathcal{R}$$ magnetic reluctance)이라고 하고 이 또한 공간의 길이 $$l$$에는 비례 하나, 자속이 통과하는 단면적(Cross-sectional Area)$$A$$와 투자율 $$\mu$$에는 반비례 한다. 단위는 **[A/wb],(암페어 퍼 웨버)**를 사용한다. 
<p align="center">
$$\mathcal{R} = \frac{l}{\mu A}
$$
</p>  

### 자계와 전기

지금까지 배운 단위들을 정리하면, 기자력과 자속과 자기저항에 관한 수식이 나온다. 그리고 이는 전기에서 사용한 옴의 법칙과 굉장히 유사하다.  
<p>
\begin{align}
H &= \frac{NI}{l} \\[6pt]
B &= \mu H
   = \mu \frac{NI}{l} \\[10pt]

\Phi &= B A 
     = \frac{\mu NI}{l} A 
     = \frac{NI}{\dfrac{l}{\mu A}} 
     = \frac{NI}{\mathcal{R}} 
     = \frac{\mathcal{F}}{\mathcal{R}} \\[10pt]

\mathcal{F} &= \mathcal{R}\phi
\end{align}
</p>   

그래서 자기 회로를 전기 회로와 유사하게 해석할 수 있고, 그러면 편하다.  
<p align="center">
  <img src="/assets/images/motor_control/1/e-m-diff.png" width="550px"/>
  <br/>
  <strong>그림 5.</strong> 전기 회로와 자기 회로의 유사성(출처:K-mooc,전동기제어)
</p>

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈  
2. K-MOOC, 전동기제어, 이교범  
3. ktword, 정보통신기술용어해설  