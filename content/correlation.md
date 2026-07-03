---
type: Fundamental
aliases:
  - Correlation
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [위키피디아](https://en.wikipedia.org/wiki/Correlation)

### Introduction
상관계수는 공분산을 각 변수의 표준편차로 나누어 정규화 (Normalization) 한 값.
In statistics, correlation is a kind of statistical relationship between tow random variables or bivariate data. More general relationships between variables are called an association.

Correlation 은 야기 (causation) 을 뜻하지 않는다. Correlation 의 개념은 dependence 와는 사뭇 다르기 때문이다. 
예를 들어, 만약 두 변수가 독립적이라면, 그들은 uncorrelated 하다. 하지만 그 반대는 아니다. 두 변수가 uncorrelated 하더라도, 그 두개는 dependent 할 수 있다.

> [!quote] 
> Correlation are useful because they can indicate a predictive relationship that can be exploited in practice.

예를 들어, 만약 전기가 온화한 날씨에 더 쓰인다고 해보자. 그 이유에는 전기의 수요와 날씨의 영향이 있을 것이다. 이 경우에는 causal relationship 이 있다고 할 수 있다. 왜냐하면 extreme weather 는 사람들이 heating 과 cooling 에 전기를 더 많이 쓰기 때문이다.

여러가지의 correlation coefficients 가 있지만, 제일 많이 쓰이는 것들은
- Pearson correlation coefficient (선형 관계에 민감)
- Spearman's rank correlation coefficient (순서에 민감)

### Pearson correlation coefficient
measures linear correlation between two sets of data
$$\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X\sigma_Y}$$
- range: $-1 \leq \rho_{X,Y} \geq 1$
- unitless
- 두 변수간의 방향성 + 강도
