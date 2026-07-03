---
type: Fundamental
aliases:
  - Variance
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [위키피디아](https://en.wikipedia.org/wiki/Variance)

### Introduction
Variance (분산) 은 통계학에서 데이터 (관측값) 가 평균을 중심으로 얼마나 퍼져 있는지를 나타내는 척도이다.
그 확률변수가 기댓값으로부터 얼마나 떨어진 곳에 분포하는지를 가늠하는 숫자.
기댓값은 확률변수의 위치를 나타내고 분산은 그것이 얼마나 넓게 펴져 있는지.

> [!quote] 
> In probability theory and statistics, variance is the expected value of the squared deviation from the mean of a random variable.
> standard deviation = $\sigma^2$
> The [[covariance]] of the random variable with itself

$$\text{Var}(X) = \text{Cov}(X,X) = \mathbb{E} \left[ (X - \mathbb{E}[X])^2 \right] = \mathbb{E}[X^2] - \mathbb{E}[X]^2$$

### Discrete random variable
$$\text{Var}(X) = \sum_{i=1}^n {p_i \cdot (x_i - \mu)^2}$$
, where $\mu$ is the expected value. $\mu = \sum_{i=1}^n {p_ix_i}$

### Absolutely continuous random variable
If the random variable $X$ has a probability density function (PDF) $f(x)$ and $F(x)$ is the corresponding cumulative distribution function
$$\text{Var}(X) = \sigma^2 = \int_\mathbb{R} (x-\mu)^2 f(x) dx = \int_\mathbb{R}x^2dF(x) - \mu^2$$
