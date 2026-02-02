---
title: '9.유도전동기, 동기전동기 모델링'
date: 2026-02-02
permalink: /posts/motor-control/9/
tags:
  - Study note
  - Motor control
  - kr

excerpt: ""
parent_category: Study
category: Motor Control
lang: kr
slug_id: Motor Control/9
---

### 수식계산이 너무 많아 생략한것이 많습니다.

교류 전류를 사용하는 유도, 동기 전동기는 DC모터와 달리 속도를 자세히 제어하기 힘들다.  
  
따라서 d-q축 변환을 통해 자속과 전압을 따로 표기하고, 시간에 따라 바뀌는 시변수(Time-variant)를 불시변수(Time-invariant)로써 봄으로써 DC모터와 같이 제어가 편해진다.  
abc축을 d-q축으로 변환하기전에 abc축 모델링을 먼저 보자.  
  
### 유도전동기 abc축 모델링
유도전동기의 경우 고정자 3상 회전자 3상으로 총 6개의 전압 방정식이 존재한다.  
<p>
\begin{align}
v_{as} &= R_s i_{as} + \frac{d\lambda_{as}}{dt} \, \, \, \, v_{ar}' = R_r' i_{ar}' + \frac{d\lambda_{ar}'}{dt}  \\[4pt]
v_{bs} &= R_s i_{bs} + \frac{d\lambda_{bs}}{dt} \, \, \, \, v_{br}' = R_r' i_{br}' + \frac{d\lambda_{br}'}{dt}  \\[4pt]
v_{cs} &= R_s i_{cs} + \frac{d\lambda_{cs}}{dt} \, \, \, \, v_{cr}' = R_r' i_{cr}' + \frac{d\lambda_{cr}'}{dt}  \\[4pt]
\end{align}
</p> 

'''은 권선비를 고려하여 회전자 변수를 고정자 축으로 환산했다는 의미인데, 앞으로는 생략하겠다.  
  
쇄교자속은 자기 권선에 쇄교하는 자속 뿐만아니라 나머지 5개의 상에서 만들어져 쇄교하는 자속도 포함한다.  
<p>
\begin{align}
\lambda_{as} &= \lambda_{asas} + \lambda_{asbs} + \lambda_{ascs} + \lambda_{asar} + \lambda_{asbr} + \lambda_{ascr} \\[4pt]
             &= L_{asas}i_{as} + L_{asbs}i_{bs} + L_{ascs}i_{cs} + L_{asar}i_{ar} + L_{asbr}i_{br} + L_{ascr}i_{cr}
\end{align}
</p> 

이를 행렬로 표현하면 다음과 같다.
<p align="center">
  <img src="/assets/images/motor_control/9/inductance_matrix.png" width="550px"/>
</p>

보면, **고정자 인덕턴스$$L_{s}$$**, **회전자 인덕턴스$$L_r$$**, **상호 인덕턴스 $$L_{sr},L_{rs}$$로 나눌수 있다.  
<p align="center">
$$    
\begin{bmatrix} \lambda_{abcs} \\ \lambda_{abcr} \end{bmatrix}
= 
\begin{bmatrix} L_s & L_{sr} \\ L_{rs} & L_r \end{bmatrix}
\begin{bmatrix} i_{abcs} \\ i_{abcr} \end{bmatrix}
$$
</p>   

### 유도 전동기 고정자 인덕턴스
고정자 인덕턴스 부분을 보면, 고정자의 **자기 인덕턴스**와 고정자 **상호 인덕턴스**로 나눌 수 있다.  
  
그리고 자기 인덕턴스는 자기 권선에만 쇄교하는 **누설 인덕턴스 $$L_{ls}$$**와 다른 권선들에 상호작용하는 **자화 인덕턴스 $$L_{ms}$$**로 나뉜다.  
  
자화 인덕턴스의 경우 다음과 같이 주어진다. $$L_{ms} = \mu_0 N_s^2(rl/g)(\pi/4)$$ $$\mu_0$$는 공기의 투자율, $$r$$은 평균 공극까지의 반지름, $$l$$은 회전자의 축 길이, $$g$$는 공극의 길이이다.  
  
상호 인덕턴스는 각 상의 자화 자속 $$L_{ms}i_s$$가 $$120^{\circ}$$로 작용한다.  

<p>
\begin{align}
L_{asbs} = L_{ascs} = L_{bsas} = L_{bscs} = L_{csas} = L_{csbs} &= L_{ms} \cos (\frac{2}{3}\pi) \\[4pt]
                                                                &= -\frac{1}{2}L_{ms}
\end{align}
</p> 
  
상호 인덕턴스는 서로의 자속을 방해한다는 것을 알 수 있다.  

<p align="center">
$$    
L_s = 
\begin{bmatrix} L_{asas} & L_{asbs} & L_{ascs} \\ L_{bsas} & L_{bsbs} & L_{bscs} \\ L_{csas} & L_{csbs} & L_{cscs} \end{bmatrix} = 
\begin{bmatrix} L_{ls} + L_{ms}  & -\frac{L_{ms}}{2} & -\frac{L_{ms}}{2} \\ -\frac{L_{ms}}{2}  & L_{ls} + L_{ms} & -\frac{L_{ms}}{2} \\ -\frac{L_{ms}}{2}  & -\frac{L_{ms}}{2} & L_{ls} + L_{ms} \end{bmatrix}
$$
</p>
  
### 유도전동기 회전자 인덕턴스

회전자의 자기 인덕턴스는 고정자와 같이 **누설 인덕턴스$$L_{lr}$$**과 **자화 인덕턴스$$L_{ms}$$**로 이루어진다.  

회전자의 자화 인덕턴스는 고정자 자화 인덕턴스에 권선비의 제곱에 비례한다는 걸 이용하면 다음과 같다.  
<p align="center">
$$    
L_{mr} = (\frac{N_r}{N_s})^2 L_{ms}
$$
</p>

<p align="center">
$$    
L_r = 
\begin{bmatrix} L_{arar} & L_{arbr} & L_{arcr} \\ L_{brar} & L_{brbr} & L_{brcr} \\ L_{crar} & L_{crbr} & L_{crcr} \end{bmatrix} = 
\begin{bmatrix} L_{lr} + n^2 L_{ms}  & -n^2 \frac{L_{ms}}{2} & -n^2 \frac{L_{ms}}{2} \\ -n^2 \frac{L_{ms}}{2}  & L_{lr} + n^2 L_{ms} & -n^2 \frac{L_{ms}}{2} \\ -n^2 \frac{L_{ms}}{2}  & -n^2 \frac{L_{ms}}{2} & L_{lr} + n^2 L_{ms} \end{bmatrix}
$$
</p>

### 유도전동기 상호 인덕턴스
상호 인덕턴스는 대칭성으로 인해 $$L_{asar} = L_{bsbr} = L_{cscr} , L_{asbr} = L_{bscr} = L_{csar} , L_{ascr} = L_{bsar} = L_{csbr}$$이 성립한다.  
  
고정자끼리, 회전자끼리는 서로 멈춰 있었던것과 달리, 고정자와 회전자의 상호 인덕턴스는 서로의 위치 차이를 생각해야 한다.  
  
회전자가 $$\omega_r$$의 각속도로 회전하고 이에 따라 고정자 권선과 $$\theta_r$$만큼 상대적 위치가 변한다고 하면, 고정자 권선에 쇄교하는 자속의 양은 $$\cos \theta_r$$로 변동한다.  
고정자가 만드는 자속이므로 권선비를 비교하면 고려하면 다음과 같다.  
<p align="center">
$$    
L_{asar} = L_{mr} (\frac{N_s}{N_r}) \cos \theta_r = L_{ms} (\frac{N_r}{N_s}) \cos \theta_r
$$
</p>
나머지는 위상차만 고려 하면 된다.  

<p>
\begin{align}
L_{asar} &= L_{bsbr} = L_{cscr} = L_{ms} (\frac{N_r}{N_s}) \cos \theta_r \\[4pt]
L_{asbr} &= L_{bscr} = L_{csar} = L_{ms} (\frac{N_r}{N_s}) \cos (\theta_r + \frac{2}{3}\pi ) \\[4pt]
L_{ascr} &= L_{bsar} = L_{csbr} = L_{ms} (\frac{N_r}{N_s}) \cos (\theta_r - \frac{2}{3}\pi )
\end{align}
</p> 

<p align="center">
$$    
L_{rs} =  
\begin{bmatrix} nL_{ms} \cos \theta_r & nL_{ms} \cos (\theta_r + \frac{2}{3}\pi ) & nL_{ms} \cos (\theta_r - \frac{2}{3}\pi ) \\ nL_{ms} \cos (\theta_r - \frac{2}{3}\pi ) & nL_{ms} \cos \theta_r  & nL_{ms} \cos (\theta_r + \frac{2}{3}\pi ) \\ nL_{ms} \cos (\theta_r + \frac{2}{3}\pi ) & nL_{ms} \cos (\theta_r - \frac{2}{3}\pi ) & nL_{ms} \cos \theta_r  \end{bmatrix} 
$$
</p>


고정자 자속이 회전자 권선에 쇄교하는 상호 인덕턴스$$L_{rs}$$는 $$L_{sr}$$의 전치행렬로 구할 수 있다.  
<p align="center">
$$    
L_{rs} = L_{sr}^T 
\begin{bmatrix} nL_{ms} \cos \theta_r & nL_{ms} \cos (\theta_r - \frac{2}{3}\pi ) & nL_{ms} \cos (\theta_r + \frac{2}{3}\pi ) \\ nL_{ms} \cos (\theta_r + \frac{2}{3}\pi ) & nL_{ms} \cos \theta_r  & nL_{ms} \cos (\theta_r - \frac{2}{3}\pi ) \\ nL_{ms} \cos (\theta_r - \frac{2}{3}\pi ) & nL_{ms} \cos (\theta_r + \frac{2}{3}\pi ) & nL_{ms} \cos \theta_r  \end{bmatrix} 
$$
</p>

유도 전동기의 쇄교자속은 다음과 같다.  
<p align="center">
  <img src="/assets/images/motor_control/9/phi_matrix.png" width="750px"/>
</p>

쇄교 자속을 보면 고정자와 회전자의 상호 인덕턴스가 시변수인 것을 알 수 있다. 

### 동기 전동기

<p align="center">
  <img src="/assets/images/motor_control/9/sychronous_motor.png" width="650px"/>
  <br/>
  <strong>그림 1.</strong> 돌극형 영구자석 동기전동기(출처:모터제어 책)
</p>

동기 전동기의 고정자의 회로는 유도 전동기와 동일하므로 고정자의 전압 방정식은 다음과 같다.  
<p>
\begin{align}
v_{as} &= R_s i_{as} + \frac{d\lambda_{as}}{dt} \\[4pt]
v_{bs} &= R_s i_{bs} + \frac{d\lambda_{bs}}{dt} \\[4pt]
v_{cs} &= R_s i_{cs} + \frac{d\lambda_{cs}}{dt} 
\end{align}
</p> 
  
다른점은 회전자의 자속이 영구자속 혹은 직류 전원에서 나온다는 것이다.  
<p>
\begin{align}
\lambda_{as} &= \lambda_{asas} + \lambda_{asbs} + \lambda_{ascs} + \phi_{asf} \\[4pt]
\lambda_{bs} &= \lambda_{bsas} + \lambda_{bsbs} + \lambda_{bscs} + \phi_{bsf} \\[4pt]
\lambda_{cs} &= \lambda_{csas} + \lambda_{csbs} + \lambda_{cscs} + \phi_{csf} \\[10pt]
\rightarrow 
\lambda_{as} &= \lambda_{asas} + \lambda_{asbs} + \lambda_{ascs} + L_{asf}I_f \\[4pt]
\lambda_{bs} &= \lambda_{bsas} + \lambda_{bsbs} + \lambda_{bscs} + L_{bsf}I_f \\[4pt]
\lambda_{cs} &= \lambda_{csas} + \lambda_{csbs} + \lambda_{cscs} + L_{csf}I_f \\[10pt]
\end{align}
</p> 
  
### 동기 전동기 고정자 인덕턴스
동기 전동기의 경우 회전자의 위치에 따라 공극의 크기가 달라지므로 고정자의 자화 인덕턴스가 바뀌게 된다.  
  
그림 1처럼 원통형이지만, 회전자에 자석이 박혀 있는경우 자석이 있는 곳은 공기와 같이 자속이 통과하기 힘들어 공극의 역할을 해 돌극형처럼 보인다.   
이경우 회전자의 각도가 $$90^{\circ}$$, $$270^{\circ}$$인 경우 공극이 가장 작아 릴럭턴스가 가장 작고, 인덕턴스가 가장 크다.  
반대로, 회전자의 각도가 $$0^{\circ}$$, $$180^{\circ}$$인 경우 공극의 크기가 가장커 릴럭턴스가 가장 크고, 인덕턴스가 가장 작다.  
  
이 경우 자화 인덕턴스 $$L_{ma}$$는 $$\pi$$의 주기를 갖는다.  
<p>
\begin{align}
\lambda_{asas} &= L_{ls} + L_{ma} = L_{ls} + L_A - L_B \cos 2\theta_r \\[4pt]
\lambda_{bsbs} &= L_{ls} + L_{mb} = L_{ls} + L_A - L_B \cos 2 (\theta_r -\frac{2}{3}\pi) \\[4pt]
\lambda_{cscs} &= L_{ls} + L_{mc} = L_{ls} + L_A - L_B \cos 2 (\theta_r + \frac{2}{3}\pi)
\end{align}
</p>

$$L_A$$는 자화 인덕턴스의 평균 값이고, $$L_B$$는 자화 인덕턴스의 변동분이다.  

고정자 권선들 간의 상호 인덕턴스는 다음과 같다.  
<p>
\begin{align}
L_{asbs} = L_{bsas} &= -\frac{1}{2}L_A - L_B \cos 2 (\theta_r -\frac{\pi}{3}) \\[4pt]
L_{ascs} = L_{csas} &= -\frac{1}{2}L_A - L_B \cos 2 (\theta_r -\frac{\pi}{3}) \\[4pt]
L_{bscs} = L_{bscs} &= -\frac{1}{2}L_A - L_B \cos 2 (\theta_r + \pi)
\end{align}
</p>
식을 보면, 평균값이 유도전동기처럼 각 상들이 120도의 위상차를 가지기 때문에 $$\cos(2/3)\pi$$가 곱해진것을 알수 있다.  
유의해야 할점은 상호 인덕턴스가 가장 큰 부분은 각 상들의 중간 지점이기 때문에 $$60^{\circ}$$ 위상차를 갖는 것을 알 수 있다.  

<p align="center">
  <img src="/assets/images/motor_control/9/sychronous_motor_inductor.png" width="650px"/>
</p>

영구자석의 자속이 고정자의 권선에 쇄교하는 상호 인덕턴스 $$L_{abcf}$$는 간단한데, 회전자가 한바퀴 돌때, $$2\pi$$를 주기로 변동할 것이기 때문이다.  
<p>
\begin{align}
L_{asf} &= L_{sf} \cos \theta_r \\[4pt]
L_{bsf} &= L_{sf} \cos (\theta_r - \frac{2}{3}\pi) \\[4pt]
L_{csf} &= L_{sf} \cos (\theta_r + \frac{2}{3}\pi) 
\end{align}
</p>

동기 전동기의 쇄교 자속식은 다음과 같다.  
<p align="center">
  <img src="/assets/images/motor_control/9/sychronous_motor_phi.png" width="850px"/>
</p>
  
돌극형 전동기는 $$L_B$$를 0으로 두면 된다.  
동기 전동기 또한 시변수를 갖는 것을 알 수 있다.  

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈 
2. K-MOOC, 전동기제어, 이교범  