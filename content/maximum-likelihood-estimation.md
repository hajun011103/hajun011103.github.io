---
type: Concept
aliases:
  - MLE
  - Maximum Likelihood Estimation
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [Steve Brunton 교수의 강좌](https://www.youtube.com/watch?v=rCdxlN6Ph14)
- [최대우도법 정리 by 공돌이의 수학정리노트](https://angeloyeo.github.io/2020/07/17/MLE.html)

### Definition
Maximum Likelihood Estimation
한국말로, 최대우도법 (MLE) 은 모수적인 데이터 밀도 추정 방법으로써 파라미터 $\theta=\theta_1, \cdots,\theta_m$ 으로 구성된 어떤 확률밀도함수 $P(x|\theta)$ 에서 관측된 표본 데이터 집합을 $x=(x_1,x_2, \cdots, x_n)$ 이라 할 때, 이 표본들에서 파라미터 $\theta=(\theta_1,\cdots,\theta_m)$ 를 추정하는 방법.

> [!example] 
> ![[attachments/maximum-likelihood-estimation-1779626937609.webp|example|364x208]]
> $$x={1,4,5,6,9}$$
위의 그림에서 데이터 $x$ 는 주황색 곡선과 파랑색 곡선 중 어느 곡선으로부터 추출되었을 확률이 높을까?
눈으로 보기에는 주황색이 확률이 높아보인다 $\rightarrow$ 데이터를 관찰함으로써 이 데이터가 추출되었을 것으로 생각되는 ==분포의 특성을 추정할 수 있음==을 알 수 있다.

#### Likelihood Function
$$\mathcal{L}(\theta)=f(\underline{x_1},\underline{x_2},\cdots,\underline{x_n}|\theta)=\prod_{i=1}^nf(\underline{x_i}|\theta)$$
전체 표본집합의 결합확률밀도 함수를 [[likelihood|Likelihood]] function 이라고 함.

#### Maximum Likelihood Estimation
$$\hat{\theta}=\underset{\theta}{\operatorname{arg\,max}}\,\mathcal{L}(\theta)$$
$\mathcal{L}(\theta)$ 함수의 최댓값을 갖는 $\hat{\theta}$ 를 찾는 것이 MLE 이라고 할 수 있음.
우도를 최대한 값이 데이터에 제일 잘 맞는 distribution 이라고 할 수 있음 위의 example 1 처럼.

##### Log-likelihood
$\hat{\theta}$ 를 찾기 위해서는 likelihood function 을 $\log$화 해서 찾는 것이 일반적임. 
- 계산을 수월하게 하기 위해서
- 곱셈 연산은 미분하기 까다롭고 값이 너무 작아질 수 있음
- 로그함수는 단조 증가 함수이므로 $\mathcal{L}$ 를 최대화하는 것과 $\log \mathcal{L}$ 을 최대화하는 것은 같은 정의역의 함수 입력값을 찾게 해주는 결과를 가져옴

$$\ell(\theta)=\sum_{i=1}^n\log f(x_i|\theta)$$
##### Partial-differential
$$\frac{\partial}{\partial \theta} \log \ell(\theta)=0$$
