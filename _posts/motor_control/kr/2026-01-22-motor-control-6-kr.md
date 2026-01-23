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
  <img src="/assets/images/motor_control/6/1T_mmf.png" width="650px"/>
  <br/>
  <strong>그림 7.</strong> 전류 한주기에 대한 기자력의 회전
</p>

고정자는 물리적으로 고정되어 있지만, 3상 교류 전류에 의해 공극에서 일정한 크기를 유지하며 회전하는 자속(또는 기자력)이 형성되는데 이를 **회전자계**라고 한다.  
    
회전 자계의 속도를 **동기속도(Synchronous Speed, $$n_s$$)**라고 하는데, 극수(P)와 주파수($$f$$)에 의해 결정된다. 따라서 이는 정해지면 변하지 않는다.  
<p align="center">
$$  
n_s = \frac{2}{P} \cdot f \cdot 60 = \frac{120 f}{P}[\text{r/min}](\text{RPM})
$$
</p> 

합성 기자력을 수식적으로 구하면 다음과 같다.  
<p>
\begin{align}
F_a(\theta) &= N_s i_a \cos \theta \\[4pt]
F_b(\theta) &= N_s i_b \cos (\theta - 120\,^{\circ}) \\[4pt]
F_c(\theta) &= N_s i_c \cos (\theta + 120\,^{\circ}) \\[10pt]
F(\theta) &= F_a(\theta) + F_b(\theta) + F_c(\theta) \\[4pt]
          &= \frac{3}{2}N_s I_m \cos (\omega_s t - \theta)
\end{align}
</p> 

삼각함수 덧셈 정리와 규칙을 이용하면 풀 수 있다.  
<p align="center">
  <img src="/assets/images/motor_control/6/rotating_field.gif" alt="GIF animation" width="600">
  <br/>
</p>
이건 실제로 기자력의 움직임을 matlab으로 표현 한 것인데, 기자력이 각속도로 회전한다는 것을 시각적으로 확인 할 수 있다.  
  
합성기자력의 식을 분석해보면 크기는 한개의 상의 최대 기자력의 1.5배가 된다. 또한 어느 시점t에서는 공극의 위치$$\theta$$에 따라 기자력이 정현파의 형태로 분포 함을 알 수 있다. 이때 기자력의 최댓값은 $$\omega_s t = \theta$$인 위치에서 나타나는데, 이는 시간의 흐름에 따라 $$\omega_s$$의 속도로 이동하는 것을 의미한다. 따라서 합성 기자력은 전류의 각속도로 회전하는 회전자계를 형성한다.  
  
조금은 복잡했지만 신호의 관점으로 보면 $$\cos (\omega_s t - \theta)$$는 진행파(Traveling Wave)이다. $$\omega_s$$의 속도로 $$+\theta$$방향으로 진행 하는 함수인데, 각도이므로 회전한다고 할 수 있다.  

<p align="center">
  <a href="https://www.youtube.com/watch?v=DlOICAg9cPI">
    <img src="http://img.youtube.com/vi/DlOICAg9cPI/0.jpg" alt="Video Label">
  </a>
   <br/>
   모터의 권선과 극을 이해 하기 좋은 영상
</p>

### 유도 전동기 등가 회로(고정자)  
유도전동기의 등가회로는 전압기와 매우 유사 하다.  
  
고정자 회로의 경우 $$V_s$$의 교류 전원이 인가되었을 때, 고정자 권선의 저항에 의한 전압 강하 $$R_s I_s$$와 유도된 자속에의해 만들어진 전압으로 이루어 진다.  
<p align="center">
$$  
V_s = R_s I_s + \frac{d \lambda_s}{dt}
$$
</p> 
  
유도된 자속에 의해 만들어진 전압은 자속이 회전자를 지나가 전압을 유도하는 자속($$\phi_m$$)도 있을 것이고, 누설되어 고정자 철심에만 머무는 누설 자속($$\phi_{ls}$$) 또한 있을 것이다.

<p align="center">
$$  
\lambda_s = N_s \phi_s = N_s(\phi_{ls}+\phi_m) = L_{ls}I_s + L_m I_m \, \, \, (\because L = \frac{\lambda}{i} = N_s \frac{\phi}{i})
$$
</p> 
<p align="center">
  <img src="/assets/images/motor_control/6/stator_v_eq.png" width="450px"/>
  <br/>
</p>

<p align="center">
  <img src="/assets/images/motor_control/6/stator_eq_circuit.png" width="650px"/>
  <br/>
  <strong>그림 8.</strong> 고정자 권선의 등가 회로
</p>

간단하게 설명하면, 고정자 권선에 전류 $$I_s$$를 흘려보내면, 철심을 자화 시키기 위한 여자 전류($$I_{\phi}$$)와 부하에서 사용하는 전류 $$I_r$$을 고정자 측에서 환산한 $$I_r'$$으로 나누어 져서 사용된다.  
  
위에서 봤듯이 전압 강하($$R_s I_S$$), 누설 리액턴스($$X_{ls}$$) 그리고 유기 기전력($$e_s$$)이 존재하고, 여자 전류는 철손(히스테리시스 loss, eddy current loss)에 사용한 전류 $$I_c$$ 자화 시키기 위한 전류 $$I_m$$으로 이루어 진다.  
  
실제로 유기 기전력 $$e_s$$를 구해보자. 유기 기전력은 쇄교 자속의 변화량이다.  
  
a상 하나만 보면, 쇄교자속은 회전자계가 a상의 축와 일치되는 $$\theta$$가 0일때, 최댓 값인 $$N\phi$$가 되고, 회전자계가 $$90\,^{\circ}$$가 되면 최소(0)이 될것이다.  
쇄교 자속은 회전자계가 a상 권선 축과 이루는 전기각 $$\theta$$에 따라 정현적으로 변하며, 회전자계가  전기 각속도 $$\omega_s$$로 회전하므로 다음과 같이 표현 할 수 있다.  
<p align="center">
$$  
\lambda_a = N_s \phi \cos \theta = N_s \phi \cos \omega_s t
$$
</p> 
유기 기전력은 다음과 같다.  
<p align="center">
$$  
e_a = -\frac{d \lambda_a}{dt} = \omega_s N \phi \sin \omega_s t = E_{max} \sin \omega_s t
$$
</p> 
b상과 c상은 $$120\,^{\circ}$$의 위상차가 있기 때문에 다음과 같다.  
<p>
\begin{align}
e_a &= E_{max} \sin \omega_s t \\[4pt]
e_b &= E_{max} \sin (\omega_s t -120\,^{\circ}) \\[4pt]
e_c &= E_{max} \sin (\omega_s t + 120\,^{\circ})
\end{align}
</p> 
  
유기 기전력 또한 정현함수로 표현되는데, 실효값은 최댓값에 $$\frac{1}{\sqrt{2}}$$를 곱해 구한다.  
<p align="center">
$$  
E_{rms} = \frac{E_{max}}{\sqrt{2}} = \frac{\omega_s N_s \phi}{\sqrt{2}} = 4.44 f_s N_s \phi
$$
</p> 

고정자를 보면, 각 상은 실제로는 슬롯에 정현적으로 분포되어 있다.(그림4) 따라서 실제 기전력은 각 상의 중첩 때문에, 이론적 값보다 10%정도 작게 나오게 된다. 이를 고려 해서 $$K_{ws}$$라는 권선 계수를 사용해서 유기 기전력을 표시하게 된다.  

<p align="center">
$$  
E_s = 4.44 f_s N_s \phi K_{ws}
$$
</p> 

### 유도 전동기 등가 회로(회전자)
  
유도 전동기에서는 **슬립(Slip) s**가 가장 중요하다. '전동기 기본동작 원리-3'에서 전동기가 지속적인 회전을 위해 토크가 발생하려면, 고정자(정확하게는 고정자가 만드는 회전자계)와 회전자의 각속도 차이로 발생한다고 말했었다.  
  
만약, 회전자계와 회전자가 같은 속도로 움직인다면, 회전자의 도체가 자속을 가르지 않아 회전자에 유기 기전력이 발생하지 않는다. 그러면 전류가 흐르지 않고, 토크가 발생하지 않아. 모터가 회전하지 않게 된다.  
  
이러한 속도의 차이를 나타내는게 **s**이다. 유도전동기에는 3가지의 속도가 존재한다.  
1. 회전자계의 속도 : $$n_s$$ (**동기 속도**라고도 한다.)
2. 회전자의 속도 : $$n$$ (**실제 속도**라고도 한다.)
3. 슬립 속도 : $$sn_s$$ (**상대 속도**라고도 한다, 회전자가 느끼는 상대적인 회전자계의 속도라고 볼 수 있다.)
  
상대 속도는 동기 속도와 실제 속도의 차이로 구할 수 있다. 이를 바탕으로 슬립은 동기속도에 대한 상대속도의 비로 정의 할 수 있다.  
<p>
\begin{align}
sn_s &= n_s -n \\[4pt]
\rightarrow s &= \frac{n_s-n}{n_s}
\end{align}
</p> 
  
슬립은 유도전동기의 효율,토크,역률,전류등 유도전동기의 모든 특성들을 결정한다.  
  
슬립에 대하여 조금더 알아보면,  

1. 동기속도는 항상 실제속도보다 빠르다(회전자계에 의해 회전자가 끌려오기 때문) 그렇기 때문에 0~1의 값을 가진다.  
  
회전자가 멈춰있는 경우(정지시) 실제 속도 $$n=0$$이므로 **s는 1**이 된다.  
  
실제 속도가 동기 속도와 같으면(실제로는 같지 않으므로 매우 가까운 경우) $$n \simeq n_s$$ **s는 0**이 된다.  
  
2. 실제로 정상 운전시 모터의 슬립은 0.03~0.05사이로 매우 작다. 

슬립이라는 것은 회전자계와 회전자의 속도 차이를 나타내는 비율이다. 회전자계는 전기각속도 $$\omega_s$$로 회전하고 있고, $$\omega_s$$는 전원의 인가 주파수 $$f_s$$에 의해 결정된다.($$\omega_s = 2\pi f_s$$)   
  
회전자가 회전자계보다 s만큼의 비율로 느리게 돈다면, 그 비율 만큼 회전자가 회전자계의 자속을 끊게 된다.(주파수)  

ex)
1. 고정자의 회전자계가 1초에 100번 회전한다 -> 동기속도 $$n_s = 100 [\text{rps}]$$이 될것이고, 고정자는 가만히 있기 때문에 회전자계가 회전하는데로 1초에 100번 자속을 끊게 된다. 따라서 고정자 권선에 유도 되는 기전력은 전원 주파수 $$f_s = 100hz$$를 가지게 된다.    
2. 회전자는 1초에 80번 회전한다. -> 실제속도 $$n = 80 [\text{rps}]$$ 회전자의 도체(권선)은 회전자계의 자속을 1초동안 100-80=20번 끊게 될것이고, 1초에 20번 끊는 다는 것은 회전자의 유도 기전력(또는 전류)의 주파수($$f_r$$)가 20hz라는 것을 의미한다.  

3. 이를 일반화 하면 고정자의 회로의 전원 주파수 $$f_s =100(\text{hz})$$가 있는데, 회전자의 회로에 유도되는 전류의 주파수는 $$s = \frac{100-80}{100}= 0.2$$의 비율로 변화한다. $$f_r = sf_s = 0.2 x100 = 20(\text{hz})$$

이를 회전자의 유기기전력으로 살펴보면, 회전자의 유기기전력의 실효값은 다음과 같다.  
<p align="center">
$$  
E_r = 4.44 f_r N_s \phi K_{wr}
$$
</p> 

회전자 회로의 주파수$$f_r$$은 회전자가 정지시에 가장 크다.($$f_r=f_s$$가 되기 때문에) 따라서 이때 유기 기전력을 $$E_{r0}$$라고 한다.  

<p align="center">
$$  
E_{r0} = 4.44 f_s N_s \phi K_{wr}
$$
</p> 
  
일반적인 상황(운동시)에서는 정지시의 **s배**가 되게 된다.  
<p align="center">
$$  
E_{r} = 4.44 f_r N_s \phi K_{wr} = 4.44 sf_s N_s \phi K_{wr} = sE_{r0}
$$
</p>
  ㅈ
이는 유도전동기에서 회전자에서 주파수와 관련된 값은 전부 운동시, 정지시의 s배 이다.  

1. **회전자 주파수**
   - 정지 시 : $$f_r = f_s$$
   - 운전 시 : $$s f_s$$

2. **회전자 유도기전력**
   - 정지 시 : $$E_{r0}$$
   - 운전 시 : $$sE_{r0}$$

3. **회전자 누설리액턴스**
   - 정지 시 : $$X_{lr} = 2\pi f_r L_{lr}$$
   - 운전 시 : $$sX_{lr} = 2\pi s f_s L_{lr}$$
  
이를 통해 등가회로를 그리면 다음과 같다.  
<p align="center">
  <img src="/assets/images/motor_control/6/rotator_eq_circuit.png" width="650px"/>
  <br/>
  <strong>그림 9.</strong> 회전자 등가회로
</p>

회전자 기준으로 본 등가회로를 슬립 s로 나누어 주면 고정자와 같은 주파수를 가지게 된다. 여기서 **권선비 a**를 이용해서 임피던스만 환산을 해주면, 고정자를 기준으로 보는 유도 전동기의 전체 등가회로를 알 수 있다.  
  
<p>
\begin{align}
\frac{E_s}{E_{r0}} &= \frac{N_s}{N_r} \frac{K_{ws}}{K_{wr}} \simeq \frac{N_s}{N_r}  = a \frac{I_r}{I_s} \\[4pt]
\rightarrow & E_s =aE_{r0} \, , \, I_s = \frac{I_r}{s} \\[4pt] 
Z_s &= \frac{e_s}{I_s} \, , \, Z_r = \frac{e_r}{I_r} \\[4pt]
\frac{Z_s}{Z_r} &= a^2 \rightarrow Z_s = a^2 Z_r

\end{align}
</p> 
<p align="center">
  <img src="/assets/images/motor_control/6/induction_motor_eq_circuit.png" width="650px"/>
  <br/>
  <strong>그림 10.</strong> 유도 전동기의 전체 등가회로
</p>

마지막으로 알아야 할것은 회전자가 만드는 회전자계이다.  
  
고정자의 3상 권선에 교류전류를 흘려 보내 만들어진 자속이 회전자계$$F_s$$를 만들었다면, 회전자의 3상 권선에 유도된 전류 또한 회전자계 $$F_r$$를 만든다.  
  
회전자를 기준으로 살펴보면 이 회전자에의한 회전자계는 회전자의 주파수인 상대속도 $$sn_s$$로 회전한다.  
  
그 말은 멈춰있는 고정자를 기준으로 살펴보면 회전자가 돌이가는 실제 속도 $$n$$과 상대속도 $$sn_s$$를 합친 만큼의 속도로 돌아간다는 것을 알 수 있고, 이는 고정자가 만드는 회전자계$$F_s$$의 속도인 동기속도 $$n_s$$와 같은 것을 알수 있다.  
  
이는 두 회전자계의 속도가 일정한 각을 유지하며 항상 같은 속도로 돌아가고 있다는 것을 의미하며, 이는 지속적인 토크를 만들어 낼 수 있는 원인이다.  

### reference
1. 모터제어 DC,AC,BLDC Motors, 김상훈  
2. K-MOOC, 전동기제어, 이교범  
3. 유튜브 조경필, 유도전동기, 실제변압기, 리액턴스 ... , https://youtu.be/6-xCUuPVAZc?si=AlgqaRXEUsmqsirr
4. 유튜브 Ozan Keysan, Rotating MMF Concept, https://youtu.be/_Ili77ip0-c?si=HEBFB9IQueA5F6Yq
5. 유튜브 이재현, (화질개선) 전기기기 27강 (110~112p)_변압기 등가회로, https://youtu.be/KGVqhNg3XGc?si=IPBUFXDArbyRlech
6. 유튜브 Sabin 토목공학, 전기 모터 권선을 알아보세요!, https://youtu.be/DlOICAg9cPI?si=VznSaMfq5gf-5kH-
7. 유튜브 전기뿌수기(남민수), 왜 $$\omega = 2\pi f$$ 일까? , https://youtu.be/oeIFz-TVadE?si=ncqTzUM0zLn2HnOG