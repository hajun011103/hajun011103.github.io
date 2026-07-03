---
type: Fundamental
aliases:
  - Covariance Matrix
tags:
  - Study/Math/LinearAlgebra
status: Done

---
### Reference
- [위키피디아](https://en.wikipedia.org/wiki/Covariance_matrix)
- [PCA 와 공분산 행렬의 관계](https://angeloyeo.github.io/2019/07/27/PCA.html)

### Introduction
Covariance matrix (공분산 행렬) is a square matrix giving the [[covariance]] between each pair of elements of a given random vector.
변수가 3개 이상일 때, 모든 변수 쌍 간의 공분산을 한눈에 보기 위해 행렬 형태로 표현.
### Definition
If the entries in the scalar, covariance matrix = variance
$$\Sigma = \text{Var}(X) = \mathbb{E}[(X-\mathbb{E}(X))^2]$$

If the entries in the random vector (column vector) $\mathbf{X} = (X_1, X_2, \dots , X_n)^T$
the covariance matrix $K_{XX} \ (=\Sigma)$ 
$$\begin{align}
K_{X_iX_j} &= \text{Cov}[X_i,X_j] = \mathbb{E}[(X_i-\mathbb{E}(X_i)(X_j-\mathbb{E}(X_j)] \\[5mm]
&= \begin{bmatrix} \text{Cov}(X_1,X_1) & \text{Cov}(X_1,X_2) & \dots & \text{Cov}(X_1,X_n) \\ \text{Cov}(X_2,X_1) & \text{Cov}(X_2,X_2) & \dots & \text{Cov}(X_2,X_n) \\ \vdots & \vdots & \ddots & \vdots \\ \text{Cov}(X_n,X_1) & \text{Cov}(X_n,X_2) & \dots & \text{Cov}(X_n,X_n)\end{bmatrix} \\[5mm]
&= \begin{bmatrix} \text{Var}(X_1) & \text{Cov}(X_1,X_2) & \dots & \text{Cov}(X_1,X_n) \\ 
\text{Cov}(X_2,X_1) & \text{Var}(X_2) & \dots & \text{Cov}(X_2,X_n) \\ 
\vdots & \vdots & \ddots & \vdots \\ 
\text{Cov}(X_n,X_1) & \text{Cov}(X_n,X_2) & \dots & \text{Var}(X_n) \end{bmatrix}
\end{align}$$
#### Meaning of Elements
- Diagonal Elements (대각성분) $\text{Cov}(X_i,X_i) = \text{Var}(X_i) = \sigma_i^2$ (각 축의 불확실성 크기)
  해당 axis 방향으로 데이터가 얼마나 퍼져있는지.
  값이 클수록 불확실성이 크고 데이터의 정보량이 많다는 뜻.
  타원의 축 방향 크기와 관련이 있음.
  
- Off-diagonal Elements (비대각 성분) $\text{Cov}(X_i,X_j), \text{where } i \neq j$ (축 간의 기울기)
  두 변수 사이의 [[covariance|공분산]] $\sigma_{ij}$.
  $i$ 번째 변수가 변할 때, $j$ 번째 변수는 어떻게 반응하는가? Correlation
  데이터의 회전 (rotation) 이나 기울기 (skew) 를 담당.
  0이라면 두 변수는 independent.

#### Properties
- Symmetric Matrix (대칭 행렬) $\Sigma = \Sigma^T$
- Positive Semi-Definite (양의 준정부호) $\mathbf{v}^T\Sigma \mathbf{v} \geq 0$ [Basic properties #2 (proof)](https://en.wikipedia.org/wiki/Covariance_matrix)
- if $m \times n$ matrix $A$ and constant $m \times 1$ vector $a$,
  $\text{Var}(A \mathbf{X} + a) = A \text{Var}(\mathbf{X})A^T$

