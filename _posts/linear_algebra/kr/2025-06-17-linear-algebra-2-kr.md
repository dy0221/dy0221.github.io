---
title: '2.Elimination and Inverse matrix'
date: 2025-06-16
permalink: /posts/2025/06/elimination-and-inverse-matrix-kr/
tags:
  - Study note
  - Linear Algebra
  - kr

parent_category: Math Notes
category: Linear Algebra
lang: kr
slug_id: Elimination and Inverse matrix
---
### 소거법
우리의 목포는 $$Ax=b$$에서 $$x$$를 구하는 것이다.   
행렬 $$A$$를 **상삼각행렬(Upper triangle matrix)** $$U$$의 형태로 바꾼다.   
그 후 $$Ux= c$$를 풀어 $$x$$를 구할것이다. 예시를 통해 알아보자.

<p align="center">
$$
A = \begin{bmatrix}1 & 2& 1 \\3 & 8 & 1 \\ 0 &4 &1 \end{bmatrix}\quad \text{and} \quad b = \begin{bmatrix}2 \\ 12 \\2 \end{bmatrix}
$$
</p>

**Upper triangle matrix**란 대각선에 있는 요소 아래쪽이 0인 행렬을 말한다.
<p align="center">
  <img src="/assets/images/linear_algebra/unit1/2/upper_triangle.png" width="300px"/>
  <br/>
  <strong>그림 1.</strong> Upper triangle
</p>
