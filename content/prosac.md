---
type: Algorithm
aliases:
  - PROSAC
tags:
  - Study/ComputerVision
status: Done

---
### Reference
- [Matching with PROSAC - Progressive Sample Consensus](https://cmp.felk.cvut.cz/~matas/papers/chum-prosac-cvpr05.pdf)

> [!abstract] 
> PROgressive SAmple Consensus
대표적인 [[ransac|RANSAC]] 개선안 중 하나.
모든 데이터를 무작위로 뽑는 대신, 데이터의 ==품질== (quality) 이 높은 것부터 우선적으로 샘플링.
PROSAC의 ==장점==: 압도적인 속도 향상 (수십 ~ 수백배), 효율성
SLAM 에서 필수적으로 고려되는 알고리즘

> [!quote] 
> In fact, PROSAC is designed to draw the same samples as RANSAC, only in a ==different order==.
>RANSAC: Treats all correspondences equally
>PROSAC: only computes the random samples (a subset of data with ==the highest quality==)

##### Notation
The set of $N$  data points, $\mathcal{U}_N$
The data points in $\mathcal{U}_N$ are sorted in descending order with respect to the quality function $q$
$$\mathbf{u}_i, \mathbf{u}_j \in \mathcal{U}_N :i<j \Rightarrow q(\mathbf{u}_i) \geq q(\mathbf{u}_j) \ .$$

#### Quality-based Sampling


$$i<j \Rightarrow q\left(\mathcal{M}_{(i)} \geq q\mathcal{M}_{(j)}\right)$$
, where ${\mathcal{M}_{(i)}}_{i=1}^{T_N}$ is the sequence of the same samples sorted in descending order according to the sample quality

$T_n$: an average number of samples from contain data points
The recurrent relation for $T_{n+1}$ is, 
$$T_{n+1}=\frac{n+1}{n+1-m}T_n$$
> [!quote] 
> $T_N$ defines after how many samples the behavior of PROSAC and RANSAC becomes identical.
> In our experiment, the parameter was set to $T_N=200000$.

처음에는 가장 신뢰도가 높은 상위 $n$개의 데이터에서만 샘플을 뽑음. 시간이 지남에 따라 (반복 횟수가 늘어남에 따라) 고려하는 데이터의 범위 $n$을 점진적으로 확장하여 최종적으로는 전체 데이터셋 $N$에 도달.

![[attachments/outline-of-prosac-algorithm.png|Figure 1. Outline of PROSAC algorithm|400]]
1. 초기화: $n=m$ (최소 샘플 수), $t=1$.
2. 조건 확인: 만약 현재 반복 횟수 $t$가 $T_n$에 도달하고 $n<N$이면, $n$ 을 1 증가 ($n=n+1$)
3. 샘플링 전략
	1. 항상 최신으로 포함된 데이터 $x_n$은 반드시 포함시킴.
	2. 나머지 $m-1$ 개의 샘플은 상위 $n-1$ 개의 데이터 $\{x_1,\dots,x_n-1\}$ 중에서 무작위로 뽑음.
	   이는 새로 확장된 범위의 데이터가 모델 후보에 즉시 반영되도록 하기 위함.

##### The Growth Function
$$g(t)=\min{\{n:T_n' \geq t\}}$$
In PROSAC, the $t$-th sample consists of
$$\mathcal{M}_t=\{\mathbf{u}_{g(t)}\} \cup \mathcal{M}_t'$$
PROSAC 의 핵심은 반복 횟수 $t$에 따라 샘플링 범위 $n$을 결정하는 함수 $g(t)$를 설계하는 것.
여기서 $T_n'$는 상위 $n$개의 데이터 내에서 적어도 하나의 유효한 샘플을 뽑기 위해 필요한 평균 시도 횟수.

#### Stopping Criterion
- non-randomness
- maximality
은 아직 제대로 이해하지 못하겠다. 나중에 이해하면 마저 작성하겠음.
##### Non-randomness
