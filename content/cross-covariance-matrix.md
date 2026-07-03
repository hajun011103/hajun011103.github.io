---
type: Fundamental
aliases:
  - Cross-Covariance Matrix
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [위키피디아](https://en.wikipedia.org/wiki/Cross-covariance_matrix)
- [PCA 와 공분산 행렬의 관계](https://angeloyeo.github.io/2019/07/27/PCA.html)

### Introduction
Cross covariance matrix (상호 공분산 행렬) 은 [[covariance-matrix]] 와 유사하나 이 개념을 두 변수 사이로 확장한 것이다. 
두 개의 서로 다른 다변량 random vectors 사이의 선형적 상관관계.
$$\Sigma_{XY} = \text{Cov}(X,Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)^T]$$

예를 들어 $d$개의 변수가 있을 때, 공분산 행렬 $\Sigma$는 $d \times d$ 크기의 정사각 행렬이 됩니다.
$$\Sigma = \begin{bmatrix} \text{Var}(X) & \text{Cov}(X, Y) & \text{Cov}(X, Z) \\ \text{Cov}(Y, X) & \text{Var}(Y) & \text{Cov}(Y, Z) \\ \text{Cov}(Z, X) & \text{Cov}(Z, Y) & \text{Var}(Z) \end{bmatrix}$$

1. 대각 성분 (Diagonal): 자기 자신과의 공분산인 $cov(X,X)$는 곧 $var(X)$, ==분산==을 의미.
2. 비대각 성분 (Off-diagonal): 서로 다른 두 변수 간의 공분산을 의미.
3. 대칭 행렬 (Symmetric): $cov(X,Y)=cov(Y,X)$ 이므로, 대각선을 기준으로 대칭인 구조를 가짐.

좀 더 그림으로 쉽게 풀어서 보면, 
![[attachments/pasted-image-20260105200512.png|400]]![[attachments/pasted-image-20260105200558.png|400]]
Eigenvector(고유 벡터) 의 의미를 잘 생각해보면, 고유 벡터는 그 행렬이 벡터에 작용하는 주축 (principal axis) 의 방향을 나타내므로 공분산 행렬의 고유 벡터는 데이터가 어느 방향으로 분산되어 있는지를 나태내준다고 할 수 있음.