---
type: Algorithm
aliases:
  - MLESAC
tags:
  - Study/ComputerVision
status: Done

---
### Reference
- [MLESAC: A new robust estimator with application to estimating image geometry](https://www.robots.ox.ac.uk/~vgg/publications/2000/Torr00/torr00.pdf)

### Definition
Maximum Likelihood Estimation SAmple Consensus
대표적인 [[ransac|RANSAC]] 개선안 중 하나.
기존 RANSAC 은 Threshold 안에 들어오면 inlier 아니면 outlier 로 구분하는 이분법적 사고를 이용하여 모델과의 거리에 상관없이 동일한 가중치를 부여하므로, 수학적으로 최적의 해를 보장하지 못함.
MLESAC 은 단순히 inlier 의 개수를 세는 것 대신, 데이터가 관촬될 확률 ([[likelihood|Likelihood]]) 을 최대화하는 모델을 찾음.

#### Likelihood Function
데이터가 오직 inlier 로만 구성되어 있다는 가정하에 작성된 우도 함수 ([[maximum-likelihood-estimation#Likelihood Function|Likelihood Function]])
==True Correspondence the Probability Density Function of the Noise Perturbed Data==
$$\Pr(\mathbf{D}|\mathbf{M}) = \prod_{i=1 \dots n} \left( \frac{1}{\sqrt{2\pi}\sigma} \right)^n e^{-\left(\sum_{j=1,2} (\underline{x}_i^j - x_i^j)^2 + (\underline{y}_i^j - y_i^j)^2 \right) / (2\underline{\sigma}^2)}$$
, where $n$ is the number of correspondences, $\mathbf{M}$ is the appropriate 2 view relation (the fundamental matrix or projectivity), and $\mathbf{D}$ is the set of matches.

이 식은 측정 오차가 평균이 0이고 표준편차가 $\sigma$ 인 Gaussian Distribution (Normal Distribution) 를 따른다고 가정.
위의 식에서 $\sum(x-\underline{x})^2+(y-\underline{y})^2$ 는 Squared Euclidean Distance, 즉 Residual 을 의미.
잔차가 작아질수록, $\Pr(\mathbf{D}|\mathbf{M})$ 값은 더 커짐. $$r \ \downarrow \ \Rightarrow \ \Pr(\mathbf{D}|\mathbf{M}) \ \uparrow$$
그러므로 Residual 을 최소한한다는 것은 최적의 모델을 찾는 것과 수학적으로 동일.
==The negative log likelihood of all the correspondences==
$$-\sum_{i=1\dots n} \log (\Pr(\mathbf{x}_i^{1,2}|\mathbf{M},\sigma))=\sum_{i=1 \dots n}\sum_{j=1,2}\left((\underline{x}_i^j-x_i^j)^2+(\underline{y}_i^j-y_i^j)^2\right)$$
> [!quote] 
>==**The true relation, $\mathbf{M}$, minimizes this log likelihood**== $\rightarrow$ [[maximum-likelihood-estimation|Maximum Likelihood Estimation]]

==The MLE error== ($e_i^2$) for the $i$-th point
$$e_i^2=\sum_{j=1,2} \left(\hat{x}_i^j-x_i^j\right)^2 + \left(\hat{y}_i^j-y_i^j\right)^2$$
위의 식은 에러가 Gaussian 의 형태를 띄고 있다고 가정을 하고 derivation 이 된 식임.
> [!quote] 
>often however features are mismatched and the error on $\mathbf{m}$ is not Gaussian.
>Thus the error is modeled as a mixture model of Gaussian and uniform distribution.

#### Mixture Model of Gaussian and Uniform Distribution
데이터가 inlier 일 확률과 outlier 일 확률을 혼합한 모델 (Mixture Model) 을 사용하여 모델에 아주 가까운 데이터에는 더 높은 점수를 주어 통계적으로 훨씬 타당한 최적의 모델을 찾음.

##### Assumption
- Inlier distribution = Gaussian
- Outlier distribution = Uniform

$$\Pr(e)=\left(\gamma \frac{1}{\sqrt{2\pi}\sigma^2}\exp{-\frac{e^2}{2\sigma^2}}+(1-\gamma)\frac{1}{v}\right)$$
, where $\gamma$ is the mixing parameter (inlier 비율), $v$ is just a constant (the diameter of the search window), and $\sigma$ is the standard deviation of the error on each coordinate.

##### Determining $\gamma$ and $v$
because the outlier distribution is uniform, being the pixel range within which outliers are expected to fall, the error minimized is the negative log-likelihood
$$-\mathcal{L} = -\sum_{i} \log \left( \gamma \left( \frac{1}{\sqrt{2\pi}\sigma} \right)^n \exp \left( -\left( \sum_{j=1,2} (\underline{x}_i^j - x_i^j)^2 + (\underline{y}_i^j - y_i^j)^2 \right) / (2\sigma^2) \right) + (1 - \gamma) \frac{1}{v} \right)$$

There are several ways to estimate the parameters of the mixture model
- EM Algorithm
- Gradient descent methods
- [[ransac]]
- least squares ==cant be used== (because of the presence of outliers in the data)
