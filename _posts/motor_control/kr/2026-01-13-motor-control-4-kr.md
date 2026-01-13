---
title: '4.DC모터'
date: 2026-01-13
permalink: /posts/motor-control/3/
tags:
  - Study note
  - Motor control
  - kr

parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/4
---

### 직류 전동기 DC MOTOR  
    
DC모터의 경우는 앞서 배운 회전기기들과 달리 고정자(계자)에 직류를 인가하거나 영구자석을 사용하여 자속을 형성하고,
회전자(전기자)에 교류전류를 흘려 보내 회전하는 방식의 모터를 말한다.  
  
정확하게는 회전자에 직류를 흘려 보내지만, 회전자에 정류자와 브러시로 인하여 전기자의 입장에서는 교류가 들어오게 된다.  
<p align="center">
  <a href="https://www.youtube.com/watch?v=HqlrxXh7lHU">
    <img src="http://img.youtube.com/vi/HqlrxXh7lHU/0.jpg" alt="Video Label">
  </a>
   <br/>
   DC모터 원리를 설명하는 아주 좋은 영상
</p>
  
DC모터는 유기기전력을 발생하지만, 전류를 사용하는 유도성(Inductive) 회로이다. 따라서 인덕터와 인덕터가 사용하는 전압으로 등가회로를 만들 수 있다.  

<p align="center">
  <img src="/assets/images/motor_control/4/Types-of-DC-Motor-1.jpg" width="450px"/>
  <br/>
  <strong>그림 1.</strong> DC Motor 등가회로(출처:https://www.eeeguide.com/types-of-dc-motor/)
</p>
  
KVL한 전압방정식은 다음과 같다.  

<p align="center">
$$  
V_a = I_a R_a + L_a \frac{dI_a}{dt} + E_a
$$
</p>  

유기기전력은 전동기에서 부하로 인해 생기는 갑작스러운 전류의 흐름을 막는 역할을 한다.  
DC모터에서는 정류자와 브러시로 인해 항상 전기자와 자속이 $$90\,^{\circ}$$를 향하게 만난다.  
이 경우 유기기전력은 다음과 같다.  
<p align="center">
$$
E_a = Blv = k_e \phi_f \omega_m
$$
</p>  

토크 또한 다음과 같다.  
<p align="center">
$$
F = Bli \, \rightarrow \, T_e = k_T \phi_f i_a
$$
</p>  

$$k_e$$의 경우 $$[\mathrm{V\cdot s/(rad\cdot Wb)}]$$, $$k_t$$는 $$[\mathrm{N\cdot m/(Wb\cdot A)}]$$단위를 사용한다.  
  
역기전력은 모터가 에너지를 만든것이고 토크는 에너지를 쓴 것이다. 따라서 에너지 법칙으로 보면 $$k_e = k_t$$이다.  
<p>
\begin{align}
P = T_e \omega_m \, \rightarrow \, E_a i_a &= T_e \omega_m \\[4pt]
             (k_e \phi_f \omega_m)i_a &= (k_T \phi_f i_a)\omega_m  \\[4pt]
             k_e \phi_f \omega_m i_a & = k_T \phi_f \omega_m i_a
\end{align}
</p>  

부하방정식은 다음과 같다.  
<p align="center">
$$
T_e = J\frac{d\omega_m}{dt} + B \omega_m + T_L
$$
</p>  

### DC모터 정상상태 속도 제어  
  
정상상태라는 것은 특정 행동 이후에 시간이 오래 지나서 어떠한 상태들이 일정한 상황을 말한다.  
DC모터가 정상상태인 경우는 전류가 일정하게 공급되고($$\frac{di_a}{dt}=0$$), 출력 토크도 일정($$T_e = T_L$$)하고 속도($$\frac{d\omega_m}{dt}=0$$)도 일정하다.  

전동기의 부하 토크와 속도의 관계는 다음과 같다.  
<p>
\begin{align}
V_a &= i_a R_a + E_a, 
& T_e &= K \phi_f i_a = T_L \\[4pt]
E_a &= K \phi \omega_m, 


\end{align}
</p>  
  
<p>
\begin{align}
K \phi_f \omega_m &= V_a - \frac{R_a T_L}{K\phi_f} \\[4pt]
\rightarrow \, \omega_m &= \frac{V_a}{K_\phi} - \frac{R_a}{(K \phi_f)^2}T_L
\end{align}
</p> 
DC모터의 속도는 부하가 커지면 속도가 줄어들고, 전압이 커지거나 자속이 줄어들면 속도가 빨라 진다는  것을 알 수 있다.  
  
### 전기자 전압 제어 (자속고정)  
일반적으로 전류를 고정시키고 전압과 자속을 통해 모터의 속도를 제어한다.  
  
먼저 자속을 고정시키므로 제어를 하는데 필요한 전압만 남기고 보기 쉽게 상수로 표현 하면 다음과 같다.  
<p>
\begin{align}
\omega_m &= \frac{V_a}{K_\phi} - \frac{R_a}{(K \phi_f)^2}T_L \\[4pt]
\rightarrow \omega_m &= K_1 V_a - K_2 T_L
\end{align}
</p>  

전압을 제어한다는 것은 0V부터 정격 전압까지 제어를 한다는 것이다. 정격전압 이후로는 전압을 고정시키고 자속을 이용해 
속도를 제어한다.  

### 계자 자속 제어 (전압 고정)  

<p>
\begin{align}
\omega_m &= \frac{V_a}{K_\phi} - \frac{R_a}{(K \phi_f)^2}T_L \\[4pt]
\rightarrow \omega_m &= \frac{K_1}{\phi_f} - \frac{K_2}{\phi_f^2}T_L
\end{align}
</p> 
  
자속을 이용하는 경우에는 자속을 떨어 뜨리면 부하 토크도 떨어진다는 단점이 있다.  
<p align="center">
$$
T_e = T_L = k_T \phi_f i_a
$$
</p>  
  
또한 계자에는 강한 자속 때문에 강한 인덕턴스가 존재해 반응성이 떨어진다. 따라서 일반적으로는 정격속도 까지는 전압으로 제어(일정 토크 영역)하고, 그후에는 자속으로 제어한다.(일정 출력 영역)

<p align="center">
  <img src="/assets/images/motor_control/4/power_curve.png" width="450px"/>
  <br/>
  <strong>그림 2.</strong>DC모터 능력 곡선(출처: 모터제어, 김상훈)
</p>

능력곡선을 보면, 일정 토크영역에서는 전압이 증가함에 따라 전력과 속도가 증가하고, 일정 출력 영역에서는 자속이 떨어지면서 
토크도 같이 떨어지는걸 알 수 있다.  