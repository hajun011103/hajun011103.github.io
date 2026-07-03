---
type: Concept
aliases:
  - Homogeneous Coordinate
tags:
  - Study/Math/LinearAlgebra
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)
- [jinsol kim's blog](https://gaussian37.github.io/vision-concept-homogeneous_coordinate/)

동차좌표계
컴퓨터 비전과 그래픽스, 로보틱스 분야에서 3차원 공간을 다룰 때 필수적인 수학적 도구.

$$\begin{aligned} y &= Ax \\ y &= Ax + b \end{aligned}$$
첫 번째 식은 선형변환
두 번째 식은 [[transformations-in-2d#Affine transformations|Affiine transformation]] 이다.

여기서 Affine transformation 을 선형 변환 (linear transformation) 과 같이 쓰고 싶다면 homogeneous coordinate 을 사용하면 된다.
