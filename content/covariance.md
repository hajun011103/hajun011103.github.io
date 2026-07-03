---
type: Fundamental
aliases:
  - Covariance
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [위키피디아](https://en.wikipedia.org/wiki/Covariance)
- [Steve Brunton 교수 강좌](https://www.youtube.com/watch?v=QKPdk57y7Ck)

### Introduction
Covariance is a measure of the joint variability of two random variables.
Covariance can be approximately though of as quantifying the joint dependence between two variables $X$ and $Y$.

공분산은 두 확률 변수 $X$ 와 $Y$ 사이의 선형 관계를 나타내는 값.
한 변수가 증가할 때 다른 변수가 함께 증가하는지, 아니면 감소하는지를 수치화.
3개 이상의 확률 변수의 상관계수를 구하기 위해서는 [[covariance-matrix|공분산 행렬]] 를 이용해야 함.

### Definition
$$\begin{aligned} \text{Cov}(X, Y) &= \mathbb{E}[(X-\mathbb{E}[X])(Y-\mathbb{E}[Y])] \\
&= \mathbb{E}[XY]-\mathbb{E}[X]\mathbb{E}[Y]
\end{aligned}$$
- $X, Y$: random vectors
- $\mathbb{E}$: expected value (기댓값)

$\mathbf{x} \sim \mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$
$\mathbf{y} = \mathbf{A}\mathbf{x} + \mathbf{b}$


$\text{Cov}(X,Y)$ 의 의미
- $>0$ : 양의 상관계수 (함께 증가하거나 함께 감소)
- $<0$ : 음의 상관계수 (한 쪽이 늘면 다른 쪽은 감소)
- $=0$ : 선형적인 관계가 없음 (두 확률은 독립적일 가능성이 높음)

![[attachments/pasted-image-20260130173823.png|100]]

