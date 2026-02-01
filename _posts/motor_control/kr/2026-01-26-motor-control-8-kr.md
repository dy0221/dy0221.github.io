---
title: '8.동기 전동기'
date: 2026-02-01
permalink: /posts/motor-control/8/
tags:
  - Study note
  - Motor control
  - kr

excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/8
---

### 동기전동기
   
동기전동기는 유도전동기와 달리 회전자에 구체적으로 영구자석이나 독립된 직류전원을 사용해 자속을 생성하여 회전자가 회전하는 모터를 말한다.  
  
동기전동기의 고정자 **구조**는 유도 전동기와 같고, 회전자의 경우는 고정자가 만드는 회전자계와 같은 동기 속도로 회전한다.  
  
회전자의 경우 공극이 일정한 원통형 회전자와 돌극형 회전자로 나눌수 있다.
회전자의 계자 회로는 독립된 R-L 직류 회로로 해석할 수 있다.  
<p align="center">
  <img src="/assets/images/motor_control/8/synchronous_motor.png" width="650px"/>
  <br/>
  <strong>그림 1.</strong> 동기전동기 구조(출처:모터제어 책)
</p>
  
### 고정자의 전압장정식
<p align="center">
$$    
v_s = R_s i_s + \frac{d \lambda_s}{dt}
$$
</p> 
동기 전동기에서는 유도전동기처럼 유도되는 전압을 고정자와 회전자의 상호작용으로 하나로 보는 것이 아닌, 각각의 전압원으로써 봐줘야 한다.  
  
고정자 권선에는 같은 속도로 회전하는 회전자계가 2개 존재해 2개가 각각 권선에 쇄교한다.  
  
고정자의 a상의 전류 $$I_a$$에 의해 만들어지는 회전자계 $$\phi_a$$의 경우 회전자 자속과 상호작용하는 **전기자 반작용 자속**과 **누설자속**으로 구성된다.  
<p align="center">
$$    
\phi_a = \phi_{ar} + \phi_{al}
$$
</p> 
  
**전기자 반작용 자속**
이미 동기전동기는 회전자에서 자속이 발생되고 있다. 따라서 공극에는 이미 일정한 자속이 분포해 있다.    
이때 고정자에 전류가 흐르게 되어 자속이 발생하면, 전제 공극에 자속을 감자(감소), 또는 증자(증가)시키게 된다.  
따라서 이 자속을 전기자 반작용 자속이라 한다.  
    
따라서 공극에 작용하는 자속 합성 자속 $$\phi_s$$은 다음과 같다.  
<p align="center">
$$    
\lambda_s = N_s \phi_s = N_s (\phi_{ar} + \phi_f) \, \, (\phi_f \text{는 회전자가 만드는 자속})
$$
</p> 
  
고정자 전기자 반작용 자속에 의해 고정자 권선에 유도되는 기전력을 **전기자 반작용 전압 $$E_{ar}$$**이라 하고, 회전자의 계자 자속으로 인해 고정자 권선에 유도 되는 기전력을 **여자 전압 $$E_f$$**이라 한다. 
  
유기기전력은 렌츠의 법칙에 따라 자속 $$\phi_{ar}$$에 $$90\,^{\circ}$$만큼 뒤지므로 전기자 전류와 전기자 반작용 리액턴스로 나타 낼 수 있다.  
<p align="center">
$$    
E_{ar} = I_a j X_{ar}
$$
</p> 
  
동기 전동기에서 전기자 반작용 리액턴스와 누설 리액턴스를 모아 **동기 리액턴스 $$X_s(=X_{ar}+X_{al})$$**라고 한다. 

<p align="center">
  <img src="/assets/images/motor_control/8/synchronous_motor_eq.png" width="650px"/>
  <br/>
  <strong>그림 2.</strong> 동기 전동기의 등가회로(출처:모터제어 책)
</p>

유도 전동기와 다르게 동기 전동기는 역기전력을 계자 자속에 의한 성분과 전기자 반작용에 의한 성분으로 분리해서 해석한다.   

### 원통형 동기 전동기의 토크
  
유도 전동기에서 슬립이 중요했던것 처럼, 동기 전동기에서는 **부하각(전력각, 토크각)**이 중요하다.  
맨 첫단원에서 했던 동기 전동기의 토크는 $$\delta$$와 관련이 있었는데, 이는 부하각이라고 하는 것이다.  
  
부하각이 0인 경우에는 전동기의 평균 토크는 0이다. 따라서 동기 전동기가 회전하기 위해서는 처음에는 회전자의 속도를 동기속도 까지 회전을 시켜주어야 한다.  
  
회전자에 부하를 달게 되면, 전기자 전류 $$I_a$$가 커지게 되고, 동기 리액턴스에 의한 전압 강하가 커지게 된다. 그렇게 되면 전압 $$V_s$$와 $$E_f$$사이에 위상차이가 발생하게 되고 이를 부하각 이라고 한다.   
  
동기 전동기의 페이저도와 전압과 부하각의 관계는 다음과 같다.  
<p align="center">
  <img src="/assets/images/motor_control/8/synchronous_motor_phase.png" width="650px"/>
  <br/>
  <strong>그림 3.</strong> 동기 전동기의 페이저도
</p>

유도 전동기에서도 말했듯이 리액턴스는 전기자 저항에 비하면 매우 크다. 따라서 저항을 무시하고 전류의 식을 구하면 다음과 같다. $$\theta$$는 역률 각이다.  
<p align="center">
$$    
I_a \cos \theta = \frac{E_f \sin \delta}{X_s}
$$
</p> 
  
이를 전력과 토크에 관한 식으로 토크를 구하면 다음과 같다.  
<p>
\begin{align}
\omega_s T &= P = 3 V_s I_a \cos\theta \\[4pt]
\rightarrow T = & \frac{P}{\omega_s} = 3 \frac{V_s E_f}{\omega_s X_s} \sin \delta = T_{\text{max}} \sin \delta
\end{align}
</p> 

동기 전동기에서 출력과 토크는 모두 부하각에 따라 달라진다는 것을 알 수 있다.  

### 돌극형 동기 전동기
돌극형 전동기는 원통형 전동기와 다르게 회전자의 위치에 따라 고정자 권선에서 발생하는 자속의 양이 달라 인덕턴스가 다르다.  
  
튀어나온 부분은 공극이 작아 릴럭턴스가 작고, 인덕턴스가 크다. 반대로 들어간 부분은 릴럭턴스가 커 인덕턴스가 작다.  
  
돌극형 전동기의 경우 d축과 q축을 나누어서 해석하는 것이 편해 다음 정리에서 다루겠다.  
  
### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈   
2. https://m.blog.naver.com/gunpo2021/222256713046 
3. https://m.blog.naver.com/PostView.naver?blogId=somang8991&logNo=223243608930&proxyReferer=https:%2F%2Fwww.google.com%2F&trackingCode=external