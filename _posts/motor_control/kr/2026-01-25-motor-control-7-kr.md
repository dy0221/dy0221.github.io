---
title: '7.유도 전동기 속도 제어'
date: 2026-01-25
permalink: /posts/motor-control/7/
tags:
  - Study note
  - Motor control
  - kr

excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/7
---

### 유도전동기 토크  

유도 전동기의 작동 원리를 봤으니, 유도 전동기의 특성과 고전제어 방식을 살펴보자.  
  
유도 전동기의 경우 다향한 손실을 거쳐 입력전력 $$P_{in}$$이 기계적 출력 $$P_{mech}$$으로 변환 된다.  

<p align="center">
  <img src="/assets/images/motor_control/7/power_model.png" width="650px"/>
  <br/>
  <strong>그림 1.</strong> 유도 전동기에서 전력의 흐름(출처:K-mooc,전동기제어)
</p>

회전자 부분을 보면, 공극에서 온 공극 전력 $$P_{ag}$$가 회전자 동손 $$P_r$$과 기계적 출력 $$P_{mech}$$으로 바뀌는 것을 알 수 있다.  
  
<p align="center">
  <img src="/assets/images/motor_control/7/rotator_circuit.png" width="250px"/>
  <br/>
  <strong>그림 2.</strong> 회전자 회로
</p>
  
회전자 회로를 보면 저항이 $$\frac{R_r}{s}$$로 되어 있다.  
이는 회전자의 동손과 기계적 출력이 합쳐 있다고 생각할수 있고, 기계적 출력은 다음과 같다.  
  
<p align="center">
$$  
P_{ag} = I_r ^2 \frac{R_r}{s} = I^2_r R_r \, (\text{회전자 회로의 동손}) \, + I^2_r \frac{R_r}{s}(1-s) \, (\text{기계적 출력}) 
$$
</p> 
  
이는 공극의 전력을 (1-s)의 비율로 바꿨다고 생각 할수 있다. $$(P_{mech} = (1-s)P_{ag})$$
  
에너지 보존 법칙에 의해 3상 유도 전동기의 총 기계적인 출력은 토크와 기계적인 각속도로 구할 수 있다.
<p>
\begin{align}
P &= \tau \omega \\[4pt]
\rightarrow 3P_{mech} &= T_{mech} \omega_{mech} \\[10pt]
T_{mech} &=\frac{3}{\omega_{mech}}I^2_r \frac{R_r}{s}(1-s) \\[4pt]
\rightarrow &= \frac{3}{\omega_s} I^2_r \frac{R_r}{s}
\end{align}
</p> 

기계적인 각속도($$\omega_{mech}$$)는 회전자가 회전하는 실제속도($$n$$)이다. 따라서 동기속도 $$\omega_s(=n_s)$$로 표현해주었다. ($$\omega_{mech} = \omega_s - \omega_s s$$)  
  
정확한 등가회로에서 회전자 전류 $$I_r$$의 표현식이 복잡해 진다.  
  
일반적으로 리액턴스는 저항을 무시해도 될정도로 크다. 따라서 다음과 같이 회로를 간략화 하고, $$I_r$$은 다음과 같다.  

<p align="center">
  <img src="/assets/images/motor_control/7/simple_circuit.png" width="550px"/>
  <br/>
  <strong>그림 3.</strong> 간략화된 등가 회로
</p>

<p>
\begin{align}
I_r &= \frac{V_s}{(R_s + \frac{R_r}{s}) + j(X_{ls}+ X_{lr})} \\[4pt]
T_{mech} &= \frac{3}{\omega_s} \frac{V^2_s}{(R_s + \frac{R_r}{s})^2+(X_{ls}+X_{lr})^2} \frac{R_r}{s} \, (I^2_r \text{은 전류의 크기이다.})

\end{align}
</p> 

토크 식을 살펴보면, 토크는 슬립과 관련이 있다는 것을 알 수 있다.  
  
유도 전동기가 정격운전시 슬립은 0과 매우 가깝다. 이때, $$\frac{R_r}{s}$$가 매우 커져 리액턴스를 고려하지 않아도 된다. 또한 $$\frac{R_r}{s}$$가 $$R_s$$보다 매우커서 고려하지 않아도 된다.  
  
<p align="center">
$$  
(R_s + \frac{R_r}{s})^2 >> (X_{ls}+X_{lr})^2 \, \, , \frac{R_r}{s} >> R_s
$$
</p> 

토크는 슬립에 비례한다고 볼 수 있다.  
<p align="center">
$$  
T_{mech} \approx \frac{3}{\omega_s} \frac{V^2_s}{R_r}s
$$
</p> 
  
저속 운전시에는 슬립이 커 리액턴스가 저항을 무시해도 된다.  
<p align="center">
$$  
(R_s + \frac{R_r}{s})^2 << (X_{ls}+X_{lr})^2
$$
</p> 
  
이때는 토크는 슬립에 반비례 한다.  
<p align="center">
$$  
T_{mech} \approx \frac{3}{\omega_s} \frac{V^2_s}{X_{ls}+ X_{lr}} \frac{R_r}{s}
$$
</p> 

- 등가 속도 근처에서는 회전자 속도가 증가하면($$s \downarrow$$), 토크가 감소한다.  
- 저속에서는 회전자의 속도가 감소하면($$s \uparrow$$), 토크가 증가한다.  
  
따라서 최대 토크 값($$T_{\text{max}}$$)는 이 사이 어딘가에 존재 한다.  
최대 토크는 토크식을 슬립으로 미분해서 구할수있다. ($$\frac{dT}{ds}=0$$)
  
증가하다가 감소하는 함수이므로 극점에서 최댓값을 가질 것이다.  
합성 분수에서 미분값이 0이 나오려면 분자가 0이되어야 한다. 이를 바탕으로 계산하면 다음과 같다.  
  
<p>
\begin{align}
0&=-\frac{R_r}{s} \big( (R_s + \frac{R_r}{s})^2 + (X_{ls}+ X_{lr})^2 \big) -\frac{R_r}{s} 2 (R_s + \frac{R_r}{s})(-\frac{R_r}{s^2}) \\[4pt]
0&=-\frac{R_r}{s}\big( (R_s+ \frac{R_r}{s})^2 + (X_{ls}+X_{lr})^2 - \frac{2}{s}R_s R_r - 2\frac{R_r^2}{s^2}\big) \\[4pt]
(\frac{R_r}{s})^2 &= R^2_s + (X_{ls}+ X_{lr})^2 \\[4pt]
s_{\text{max}} &= \pm \frac{R_r}{\sqrt{R^2_s + (X_{ls}+X_{lr})^2}} \propto R_r \\[4pt]
\\
T_{\text{max}} &= \frac{3}{\omega_s} \frac{V^2_s}{R_s + \sqrt{R^2_s +(X_{ls}+ X_{lr})^2} +(X_{ls}+ X_{lr})^2}\sqrt{R^2_s +(X_{ls}+ X_{lr})^2} \\[4pt]
        &= \frac{3}{\omega_s} \frac{V^2_s}{R^2_s + 2R_s\sqrt{R^2_s +(X_{ls}+ X_{lr})^2} +R^2_s + (X_{ls}+X_{lr})^2 + (X_{ls}+X_{lr})^2}\sqrt{R^2_s +(X_{ls}+ X_{lr})^2} \\[4pt]
        &= \frac{3}{\omega_s} \frac{V^2_s}{2 \sqrt{R^2_s +(X_{ls}+ X_{lr})^2}(R_s + \sqrt{R^2_s +(X_{ls}+ X_{lr})^2})}\sqrt{R^2_s +(X_{ls}+ X_{lr})^2} \\[4pt]
        &= \frac{3}{2\omega_s} \frac{V^2_s}{R_s + \sqrt{R^2_s +(X_{ls}+ X_{lr})^2}}
\end{align}
</p> 

<p align="center">
  <img src="/assets/images/motor_control/7/torque_speed.png" width="450px"/>
  <br/>
  <strong>그림 4.</strong> 토크-속도 그래프(출처:K-mooc,전동기제어)
</p>

유도 전동기는 최대 토크 이후에서 속도를 제어해야 한다.  
  
만약 a의 경우 외란이 생겨 속도가 늘어나거나 줄어들 경우, 토크가 비례해서 늘어나거나 줄어들어 운전점을 벗어나는 현상이 생긴다.  
  
반면, b나 c의 경우 속도가 늘어나거나 줄여들면, 토크가 반대로 줄어들거나 늘어나 운전점으로 되돌아가는 현상이 발생한다.  

### 속도 제어  
유도 전동기 속도제어 하는 방법에는 다음과 같은 2가지로 분류된다.  

1. 슬립 제어(전압조정, 회전자 저항 조정)
2. 동기 속도 제어(주파수 조정)
  
슬립제어는 슬립을 조절해 속도를 제어한다.  
전압을 조절하는 경우 출력 토크의 변화를 통해 속도를 제어한다.  
<p align="center">
  <img src="/assets/images/motor_control/7/volt_control.png" width="450px"/>
  <br/>
  <strong>그림 5.</strong> 고정자 전압 제어
</p>

<p align="center">
$$  
T_{mech} = \frac{3}{\omega_s} \frac{V^2_s}{(R_s + \frac{R_r}{s})^2+(X_{ls}+X_{lr})^2} \frac{R_r}{s} \propto V^2_s
$$
</p> 
  
$$s_{\text{max}}$$식을 볼 경우, 전압과 상관이 없다. 따라서 전압을 바꾸더라도 $$s_{\text{max}}$$ 값이 바뀌지 않는다. 
따라서 전압 제어시 안전 운전을 위한 바꿀 수 있는 속도의 범위가 작다.  
  

최대 토크($$T_{\text{max}}$$) 수식을 보면, 회전자의 저항($$R_r$$)과는 상관이 없다. 회전자 슬립의 경우 최대 슬립($$s_{\text{max}}$$)과 비례 관계가 있다. 따라서 
회전자 저항 제어의 경우 최대 슬립의 위치를 옮겨 속도를 제어하는 방법이다.  
<p align="center">
  <img src="/assets/images/motor_control/7/registor_contol.png" width="450px"/>
  <br/>
  <strong>그림 6.</strong> 회전자 저항 제어
</p>

하지만 회전자 저항 제어의 경우 에너지 효율이 떨어진다는 단점이 있다.  
  
주파수 제어의 경우 고정자 주파수 $$f_s$$를 바꿔 동기 속도($$n_s$$)를 조절해 제어하는 방법이다.  
  
동기속도와 주파수의 관계는 다음과 같다.  
<p align="center">
$$  
n_s = \frac{120 f_s}{P}
$$
</p> 
주파수만 제어할 경우, 주파수가 줄어들면 토크가 증가하는 문제가 있다. 토크는 주파수의 제곱에 반비례 한다.  
<p align="center">
$$    
T_{mech} \cong \frac{3V^2_s}{(\frac{R_r}{s})^2 + (\omega_s L_{lr})^2} \frac{R_r}{\omega_s s} = 3 (\frac{V_s}{\omega_s})^2 \frac{R_r \omega_{sl}}{R^2_r + (L_{lr} \omega_{sl})^2} \, (X_{lr} = 2 \pi f_s L_{lr} = \omega_s L_{lr}, s = \frac{\omega_{sl}}{\omega_s})
$$
</p> 

이러한 이유는 주파수가 바뀌면서 공극의 자속이 변화하기 때문이다. 따라서 공극의 자속을 일정하게 유지시켜야 하는데, 유기기전력의 관계에서 조절 할 수 있다.  
<p align="center">
$$    
\phi \propto \frac{E_s}{f_s} \simeq \frac{V_s}{f_s} \rightarrow (\because E_s = 4.44f_s N_s \phi K_{ws})
$$
</p> 
  
주파수를 조절하면, 회전자의 전류 또한 주파수에 반례로 변동한다.  
<p align="center">
$$    
I_r = \frac{V_s}{\sqrt{(\frac{R_r}{s})^2+X^2_{lr}}} = (\frac{V_s}{\omega_s}) \frac{\omega_{sl}}{\sqrt{R^2_r + (\omega_{sl} L_{lr})^2}} \propto \frac{1}{f_s}
$$
</p> 

따라서 토크와 회전자 전류를 일정하게 유지하기 위해서는 주파수 변동에 따라 고정자 전압을 비례해서 변동시켜서 공극 자속을 일정하게 제어해야 한다.  
  
이러한 제어 방법을 **V/f 일정 제어**라고 한다.  
<p align="center">
  <img src="/assets/images/motor_control/7/v_f_control.png" width="650px"/>
  <br/>
  <strong>그림 7.</strong> 일정 자속을 위한 주파수와 전압, V/f 제어(출처:K-mooc,전동기제어)
</p>

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈  
2. K-MOOC, 전동기제어, 이교범  
3. 유튜브 이재현[시나브로], (화질개선) 전기기기 39강 (158~159p)_유도전동기 토크, https://youtu.be/wxi7ivtv1y4?si=QK2zzxukHJ8LHGJE