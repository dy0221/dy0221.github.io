---
title: '지뢰찾기 프로젝트 1'
date: 2024-03-26
permalink: /posts/minesweeper/1/
tags:
  - Project
  - Minesweeper
  - kr

excerpt: ""
parent_category: Project
category: Minesweeper
lang: kr
slug_id: Minesweeper/1
---

게임이 어떤 식으로 작동되어 있는지 궁금했었는데, 2학년 기말고사가 끝나고 지뢰 찾기를 만들어 보고 싶다는 생각을 했다. 그래서 3월 초중반동안 지뢰 찾기를 만드는 프로젝트를 진행했다.  
  
<p align="center">
  <img src="/assets/images/minesweeper/1/project_img.png" width="600px"/>
  <br/>
  <strong>그림 1.</strong> 프로젝트 만든 사진
</p>
  
### 프로젝트 초기  
<p align="center">
  <img src="/assets/images/minesweeper/1/first_idea.png" width="400px"/>
  <br/>
  <strong>그림 2.</strong> 프로젝트 만든 사진
</p>  
  
1. 지뢰찾기의 원리

2. 어떻게 만들것인가

3. 객체지향이란 무엇인가  
  
이 3가지를 가장 처음 생각해 보았다.  
  
처음에는 지뢰 찾기가 n x n 형태의 지뢰찾기를 생각해서 1부터 n^2 가지의 input을 받아서 상호작용하는 형태로 생각하였고 그렇다 보니 자연스럽게 n^2의 크기의 1차원 리스트를 만들어서 지뢰찾기 map에 관한 정보를 담고 이를 확인하는 형태로 만들어야겠다는 생각을 했고, 어떤 k번째 칸으로부터 주위의 8칸을 어떻게 찾을까 라는 생각으로 리스트 속 관계를 생각했다.  
  
객체지향을 아직 내가 공부한 적이 없어서 지금부터 하는 말이 정답이 아닐 가능성이 높지만, 프로젝트 동안 나의 생각을 말하기 위해 말하자면, C++관련한 책에서 짧게 "사과장수가 고객에게 사과를 판다"라는 것처럼 사과장수, 고객, 사과가 팔린다라는 관계 속에서 상호작용이 이뤄진다. 이런 예시였던 거 같은데 이 부분과 다양한 유튜브나 짧은 글을 읽어보면서 '객체 간의 상호작용이 필요하구나'라는 생각을 가지고 어떤 식으로 객체를 만들어야 할지 생각했다.  
  
<p align="center">
  <img src="/assets/images/minesweeper/1/first_idea.png" width="400px"/>
  <br/>
  <strong>그림 3.</strong> 처음에 생각했던 객체간의 상호작용
</p>   
  
### 프로젝트 중반  
처음에는 게임의 map을 만들었는데, map을 만들다 보니, 각 게임 칸 (cell)에 여러 가지 정보가 필요하다고 생각했다. 따라서 linked list를 게임 map에 정보를 담는 데이터 형태로 선택하였다.  
  
ui를 만들기 위해 여러가지 정보를 찾아보았는데, 처음에는 opengl을 생각했다. 하지만 opengl은 보통 3d 그래픽 관련 작업에 쓰인다고 하고 이런 ui를 만드는 데는 적합하지 않다고 하여 qt라는 것을 선택했다. (qt와 opengl은 같은 개념이라 보기 어렵다, 간단하게 qt는 다양한 크로스플랫폼 어플을 만들 수 있고, qt에서 opengl을 쓸 수 있는 개념)  
  
ui의 경우에는 당연하게 행렬의 형태로 cell들이 배치되어 있다 보니, 행과 열의 형태로 데이터를 처리하는 것이 편하고 linked list로 만든 map 데이터의 경우 다차원 배열보다 1차원 배열이 관리하기 편하여서 2가지 형태를 모두 사용하는 것으로 생각하고 2가지 경우의 데이터 변환 방법을 생각했다. 행렬로 생각하다 보니 n x n에서 n x m으로 확장될 수 있다고 생각해서 n x m으로 map을 확장했다.  
  
또한 개발을 하면서 event 기반의 프로그래밍이나 qt에서는 오른쪽 클릭이 지원하지 않아 직접 만드는 등 여러 가지 기능을 만들어서 프로젝트를 진행했다.  
  
### 프로젝트 완성
이렇게 해서 visual studio에서 qt를 이용하여 지뢰 찾기를 완성했다. visual studio에서 만든 프로그램을 배포를 하려면 debug 모드가 아닌 release 모드에서 빌드를 진행해야 하고 프로그램의 icon이나 그림 같은 경우는 리소스 파일로 관리를 해야 한다.  
  
qt가 설치가 되지 않은 컴퓨터에서 실행하기 위해서는 qt관련 종속성이 있는 파일들을 추가해 줘야 하는데, 이는 qt에서 지원한다.  
<p align="center">
  <img src="/assets/images/minesweeper/1/qt1.png" width="300px"/>
  <br/>
  <strong>그림 4.</strong> qt 6.6.2 (MSVC 2019 64-bit)
</p>   
  
나는 visual studio에서 진행하였기 때문에 MSVC라 쓰여있는 터미널을 열어서(visual studio는 Microsoft Visual C++지원).exe파일이 있는 경로로 이동한 뒤 아래와 같은 명령어를 사용하면 자동으로 필요한 종속성 파일들을 채워준다.  
  
``` bash
windeployqt \실행파일 이름.exe
```
  
<p align="center">
  <img src="/assets/images/minesweeper/1/qt_result.png" width="600px"/>
  <br/>
  <strong>그림 5.</strong> 명령어를 실행한 모습
</p>  
  
이런 식으로 프로젝트 배포하는 거 까지 제작을 하였다. 이 글은 전체적인 과정을 보여주기 위해 간단하게 설명을 하였는데 다음 글에는 조금 더 자세한 내용을 담아보도록 하겠다.  
<p align="center">
  <a href="https://youtu.be/2scbEiA6mGc">
    <img src="http://img.youtube.com/vi/2scbEiA6mGc/0.jpg" alt="Video Label" width="700px">
  </a>
   <br/>
   시연 영상
</p>  
  
<div align="center">  
    <a href="https://github.com/dy0221/Minesweeper">
     <img src="https://socialify.git.ci/dy0221/Minesweeper/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Plus&theme=Light" alt="project-image" width="600px" />
    </a>  
</div>