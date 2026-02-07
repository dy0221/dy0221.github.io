---
title: '11.벡터제어(FOC)'
date: 2026-02-03
permalink: /posts/motor-control/11/
tags:
  - Study note
  - Motor control
  - kr

excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/11
---

### 벡터제어
   
교류전동기를 직류전동기처럼 제어하기 위해서 d-q축 좌표변환을 배웠다.  
직류전동기 처럼 제어를 한다는 것은 순시토크(순간적인 토크)를 제어한다는 것이다.  
교류전동기에서는 순시토크를 벡터제어를 통해서 하는데, 그중 **자속 기준 제어(Field Oriented Control)**를 다뤄보자.  
  
### DC모터의 순시 토크제어  
그전에 DC모터의 순시 토크를 봐보면, 전동기의 순시 토크는 자속 벡터 $$\phi$$와 그 자속을 끊는 전류 벡터 $$i$$의 곱으로 표현한다.  
  
<p>
\begin{align}   
T &= k(\phi \times i)  \\[4pt]
T &= k|\phi||i| \sin \theta
\end{align}
</p>

직류 전동기를 살펴보면, DC모터는 기계적인 구조로 인하여 자속과 전류가 항상 $$90^{\circ}$$의 위상차이를 가진다.  
이 말은 주어진 자속과 전류로 가장 큰 토크를 만드는 것도 맞지만, 더 중요한것은 서로의 간섭이 없다는 것이다.  
즉, 계자(고정자)의 자속과 전기자(회전자)의 기자력이 서로간의 간섭을 주지 않아 따로 따로 제어할 수 있다는 것이다.  
  
<p align="center">
$$    
T = k|\phi_f||i_a|        
$$
</p>
  
또한 우리가 일정 토크 영역을 생각해보면, 계자의 자속은 정격 전압에서 항상 최대치로 고정했었다.  
  
따라서 직류 전동기는 전기자의 전류에 비례하게 된다. 전류를 빠르게 제어할수 있다면, 토크를 빠르게 제어할 수 있게 된다.  
<p align="center">
$$    
T = k'|i_a|        
$$
</p>
  
### 전동기의 순시 토크 제어를 위한 조건
1. 계자 자속과 전기자 기자력(전류)은 항상 공간적으로 $$90^{\circ}$$를 유지해야 한다.  
2. 계자 자속과 전기자 기전력은 각각 독립적인 제어가 가능해야 한다.
3. 전기자 전류의 즉각적인 제어가 가능해야 한다.  
  

### 유도 전동기의 순시 토크 제어
순시 토크제어를 위한 조건을 살펴보면, 왜 d-q축 변환을 공부 했는지 조금 느낌은 온다. 
또한 d축은 자속으로 q축은 전류(기전력)를 나타낸다는 말도 이해가 된다.  
  
유도 전동기는 abc상의 변수들을 d-q축으로 변환을 해서 조건을 만족시켜 순시 토크를 제어 할 수 있다.  
  
일반적으로 d축에는 자속, q축에는 전류를 기준으로 나눈다고 했는데, 직류 전동기는 계자의 자속이 회전하지 않지만, 유도전동기의 경우 
자속 벡터 $$\lambda$$는 회전자계로 인하여 회전한다.  
따라서 d-q축을 정지 좌표계가 아닌 회전 좌표계로 봐야 한다.  
  
만약 회전을 시키지 않을 경우, d축을 우리가 자속축이라고 하였지만 실제로는 $$\lambda$$를 만드는 전류는 q축과 d축 둘다에서 만드는 상황이 발생한다.  

<p align="center">
  <img src="/assets/images/motor_control/11/do_not_rotate.png" width="400px"/>
  <br/>
  <strong>그림 1.</strong> 좌표계를 회전시키지 않을 경우(출처: 모터제어 책)
</p>
  
따라서 d-q축 좌표계를 동기속도로 회전하는 회전 자계를 따라 같이 회전시킨다. 그렇게 되면, d축은 자속을 따라 회전하게 된다. 따라서 d축을 자속에 관한 축이라 한다.   
<p align="center">
  <img src="/assets/images/motor_control/11/rotate.png" width="500px"/>
  <br/>
  <strong>그림 2.</strong> 좌표계를 회전시킬 경우(출처: 모터제어 책)
</p>
  
결론 부터 말하자면, 유도 전동기의 토크 식은 직류 전동기와 비슷해진다.  
<p>
\begin{align}   
T_e &= \frac{3}{2}\frac{P}{2}\frac{L_m}{L_r}(\lambda^e_{dr}i^e_{qs} - \lambda^e_{qr}i^e_{ds})  \\[4pt]
    &= k \lambda i^e_{qs}  
\end{align}
</p>
  
보면, q축의 전류 $$i^e_{qs}$$만 $$T_e$$에 관여 한다는 것을 알 수 있다. (일정 토크 영역에서는 자속은 고정이므로)  
따라서 q축의 경우 토크에 관한 축이라고 한다.  
  
이렇게 d축은 $$\lambda$$ 자속 벡터로 기준으로 하여 $$d^e-q^e$$ 좌표계에서 d축 전류로 자속을 q축 전류로 토크를 순시적으로 제어하는 기법을 FOC(Field Oriented Control)라고 한다.  
  
**유도 전동기의 벡터 제어 과정**  
1. 토크, 자속 지령
2. 지령에 맞는 $$i^e_{ds},i^e_{qs}$$를 찾음
3. $$d^e-q^e$$축의 전류를 좌표 역변환($$T(\theta)^{-1}$$)을 해 abc상의 전류를 구함.
4. abc상의 전류를 유도전동기에 넣어 토크를 제어
  
<p align="center">
  <img src="/assets/images/motor_control/11/induction_motor_vec.png" width="600px"/>
  <br/>
  <strong>그림 3.</strong> 유도 전동기의 모터제어(출처: 모터제어 책)
</p>

d축의 기준이 되는 자속에는 **고정자 자속, 회전자 자속, 공극 자속** 3가지가 있는데, FOC제어에서는 95%이상이 회전자 자속을 기준으로 하므로 **회전자 쇄교 자속**을 기준으로 하겠다.  
  
### 회전자 자속 기준 벡터 제어  
유도 전동기에서 고정자 abc상에 전류를 넣어 주기 위해서는 먼저, $$i^e_{ds},i^e_{qs}$$를 알아야 한다.  
따라서 회전자 자속 기준 벡터제어시 $$i^e_{ds},i^e_{qs}$$가 어떻게 표현이 되는지 알아보자.  

### 고정자 $$d^e$$축 전류 $$i^e_{ds}$$와 회전자 쇄교 자속 $$\lambda_r$$과의 관계
회전자 자속을 d축에 일치시킨다는 말은 결국 q축에는 자속이 존재하지 않는다라는 말과 같다.  
  
따라서 회전자 자속 기준 벡터 제어는 $$\lambda^e_{qs}$$가 0이라는 것과 같다. 그러면 유도 전동기의 d-q축 동기 좌표계에서 전압 방정식은 다음과 같이 표현된다.  
<p>
\begin{align}   
v^e_{dr} &=  R_r i^e_{dr} + p \lambda^e_{dr} - (\omega_e - \omega_r) \lambda^e_{qr} (p\text{는 미분 연산자}) \\[4pt]
\rightarrow i^e_{dr} = - \frac{p \lambda^e_{dr}}{R_r}(\because \lambda^e_{qr}=0) 
\end{align}
</p>
  
이 전류식을 $$d^e$$축 회전자 쇄교 자속식에 대입하면 $$i^e_{ds}\text{와}\lambda^e_{dr}$$의 관계 식을 얻을 수 있다.  
<p>
\begin{align}   
\lambda^e_{dr} &= L_r i^e_{dr} + L_m i^e_{ds} \\[4pt]
\lambda^e_{dr} &= \frac{R_r L_m}{R_r + L_rp} = \frac{L_m}{1 + p\frac{L_r }{R_r}} 
\end{align}
</p>
  
보면, $$d^e$$축 쇄교 자속 $$\lambda^e_{dr}(=\lambda_r)$$과 고정자 전류 $$i^e_{ds}$$는 일차 지연 관계인 것을 알 수 있다.  
  
시간 지연이 존재하지만, 일정 시간이 지나면 쇄교 자속은 d축의 전류에 비례 한다는 것을 알 수 있다.  

### 고정자 $$q^e$$축 전류 $$i^e_{qs}$$와 토크 $$T_e$$와의 관계  
  
d축 전류에서와 같이 유도 전동기 토크식에 $$\lambda^e_{qs}=0$$을 적용하면 다음과 같다.  
  
<p>
\begin{align}   
T_e &= \frac{3}{2}\frac{P}{2}\frac{L_m}{L_r}(\lambda^e_{dr}i^e_{qs} - \lambda^e_{qr}i^e_{ds})  \\[4pt]
    &= \frac{P}{2} \frac{3}{2} \frac{L_m}{L_r}\lambda^e_{dr} i^e_{qs} \\[4pt]
T_e &= K_T i^e_{qs}
\end{align}
</p>
  
직류 전동기 처럼 일정 토크 영역에서 계자의 자속을 고정시키면, q축의 전류에만 토크가 비례한다는 것을 알 수 있다.  
  
d축 전류로 자속을 제어하고, q축 전류로 토크를 제어할수 있는데, 전류의 값을 변경하면 d-q축의 전류 합의 크기도 달라지고 위상도 달라진다. 따라서 벡터제어라고 한다.  
  
이렇게 동기 좌표계의 d-q축 전류를 구했다면 이를 역변환 $$T(\theta)^{-1}$$을 해야 한다. 그렇다면, 자속각 $$\theta$$를 아는 것이 중요하다.  
자속각을 직접 계산하거나 센서등을 통해 구하는 방법을 **직접 벡터 제어**라고 하고, 슬립 속도(상대 속도)를 통해 자속각을 구하는 방법이 **간접 벡터 제어**라고 한다.   

### 회전자 자속 기준 간접 벡터 제어
  
회전자의 속도를 encoder등을 통해 구한다면, $$\theta = \int \omega_e dt = \int (\omega_{sl}+\omega_r)dt$$이므로 상대속도(슬립속도) $$\omega_{sl}$$을 구하면 $$\theta$$를 추정할수 있다.  
  
$$d^e-q^e$$ 방정식을 보면, 회전자의 전압 방정식이 상대 속도와 관련이 있는 것 을 알 수 있다.  
  
<p>
\begin{align}   
v^e_{qr} &= R_r i^e_{qr} + p\lambda^e_{qr} + (\omega_e - \omega_r)\lambda^e_{dr} = R_r i^e_{qr} + (\omega_e - \omega_r)\lambda^e_{dr} = 0 \\[4pt]
\rightarrow \omega_e - \omega_r &= \omega_{sl} = -\frac{R_r i^e_{qr}}{\lambda^e_{dr}} \\[10pt]
\lambda^e_{qr} &= L_r i^e_{qr} + L_m i^e_{qs} = 0 \\[4pt]
\rightarrow  i^e_{qr} &= - \frac{L_m}{L_r} i^e_{qs} \\[10pt]
\omega_{sl} &= \frac{R_r L_m}{L_r} \frac{i^e_{qs}}{\lambda^e_{dr}}\\[4pt]
\rightarrow \omega_{sl} &= \frac{1+T_r p}{T_r} \frac{i^e_{qs}}{i^e_{ds}} (T_r = \frac{L_r}{R_r})
\end{align}
</p>
  
결론을 보면, 상대 속도의 식은 d축과 q축의 전류 크기의 비율인 것을 알 수 있다.  
  
$$\theta$$는 회전자의 속도와 함께 구할 수 있다.  
<p align="center">
$$    
\theta_e = \int \omega_e dt = \int (\omega_{sl} + \omega_r)dt    
$$
</p>
  
### 회전자 자속 기준 직접 벡터 제어
직접 벡터 제어는 정지 좌표계의 $$\lambda^s_{dr}, \lambda^s_{qr}$$을 구해서 자속각 $$\theta$$를 구한다.  
<p align="center">
$$    
\theta_e = \tan^{-1} (\frac{\lambda^s_{qr}}{\lambda^s_{dr}})  
$$
</p>

<p align="center">
  <img src="/assets/images/motor_control/11/theta.png" width="500px"/>
  <br/>
  <strong>그림 4.</strong> 회전자 자속각(출처: 모터제어 책)
</p>
  
센서등을 통해 자속을 구하지 않을 경우 직접 계산 하는데, 전압을 통해서 하는 방법과 전류를 통해서 구하는 방법이 있다.  
  
전압 모델은 큰 고속 운전에서 전류 모델은 저속 운전으로 2차 low pass filter를 사용해서 만드는데 여기서 식을 정리하지는 않겠다.  

### 동기 전동기의 벡터 제어
최근 로봇에서도 bldc모터가 많이 사용되는데, 다른 이유도 있겠지만 이번에 공부하면서 벡터제어가 상대적으로 쉽다는 이유도 있다는 것을 알게 되었다.  
  
유도 전동기에서는 간접 벡터제어를 할때 회전자 시정수인 $$T_r = \frac{R_r}{L_r}$$을 통해 상대 속도를 구한다.  
  
하지만 회전자 저항 $$R_r$$은 모터가 돌아가면서 온도가 올라감에 따라 달라지고, $$L_r$$또한 고속 운전에서는 크게 변한다. 따라서 자속각 $$\theta$$에 오차가 있을 수 있게 된다.  
q축에 자속이 없다고 가정을 했지만, 자속이 생겨 전류가 적절하게 분배가 되지 않는 Detuning이 발생 할 수 있다.  
  
하지만 동기 전동기는 매우 간단한데, $$\theta$$를 추정할 필요가 없이 회전자의 위치가 자속이 위치이기 때문이다.  
따라서 encoder로 회전자의 위치만 알면 $$\theta_e = \theta_r$$로 자속각을 알수 있다.  
  
### SPMSM의 벡터제어
  
영구 자석을 이용하여 자속을 생성하는 경우 고정자의 전류가 $$d^r$$축에 사용될 이유가 없다.(알아서 자속이 만들어 지니깐) 따라서 동기 전동기의 벡터제어를 한다는 것은 $$i^r_{ds}$$가 0이라는 것을 의미한다.  
<p align="center">
$$    
T_e = \frac{P}{2} \frac{3}{2} \phi_f i^r_{qs} 
$$
</p>
  
제어를 할때, $$d^r$$을 0으로 두고 $$q^r$$을 통해 토크 제어를 하면 된다.  
  
<p align="center">
  <img src="/assets/images/motor_control/11/spmsm.png" width="600px"/>
  <br/>
  <strong>그림 5.</strong> 표면 부착형 영구자석 동기 전동기의 벡터제어(출처: 모터제어 책)
</p>

### IPMSM의 벡터 제어  
  
매입형 영구 자석 동기 전동기의 경우 SPMSM과 달리 토크식에 릴럭턴스 토크 성분이 껴있어 $$i^r_{ds}$$를 0으로 둘수 없다.  
<p align="center">
$$    
T_e = \frac{P}{2} \frac{3}{2} [\phi_f i^r_{qs} + ((L_{ds}-L_{qs})i^r_{ds}i^r_{qs})]        
$$
</p>
d축에서의 인덕턴스가 q축 보다 작기 때문에 릴럭턴스 토크는 전류가 둘다 양수면 음수를 가지게 된다.  
따라서 릴럭턴스 토크가 영구자석에 의한 토크와 더해지기 위해서는  $$i^r_{ds}<0$$이 되어야 한다.(MTPA제어)

더 자세한 방법이 있는데, 고정자 전류의 크기 $$I_s = \sqrt{i^{r2}_{ds}+i^{r2}_{qs}}$$가 되는 방향으로 전류를 구해서 제어한다는 것만 정리하겠다.  

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈 
2. K-MOOC, 전동기제어, 이교범   