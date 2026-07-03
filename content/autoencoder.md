---
type: Concept
aliases:
  - Autoencoder
tags:
  - Study/MachineDeepLearning
status: Done

---
### Reference
- [Steve-Lee's tistory](https://deepinsight.tistory.com/1250)
- [귀퉁이 서재](https://bkshin.tistory.com/entry/%EC%BB%B4%ED%93%A8%ED%84%B0-%EB%B9%84%EC%A0%84-7-%EC%98%A4%ED%86%A0%EC%9D%B8%EC%BD%94%EB%8D%94AutoEncoder%EC%99%80-%EB%A7%A4%EB%8B%88%ED%8F%B4%EB%93%9C-%ED%95%99%EC%8A%B5Manifold-Learning)
- [오토인코더의 모든 것](https://www.youtube.com/watch?v=o_peo6U7IRM)
- [Data-Drive Science and Engineering by Steve Brunton](https://faculty.washington.edu/sbrunton/databookRL.pdf)
- [Reducing the Dimensionality of Data with Neural Networks by G. E. Hinton](https://www.cs.toronto.edu/~hinton/absps/science.pdf))
- [Stacked Denoising Autoencoders by Pascal Vincent](https://www.jmlr.org/papers/volume11/vincent10a/vincent10a.pdf)

> [!tldr] 
> Goal: map the output back to itself
> Original high-dimensional input vector $\mathbf{X}$ -> low-dimensional latent variables (latent spaces, bottleneck) $\mathbf{Z}$ -> high-dimensional space (output) $\tilde{\mathbf{X}}$
> 학습 방법은 비교사 학습 방법을 따르며, Loss 는 negative ML 로 해석된다.
> 인코더는 차원축소 역학을 수행하며, 디코더는 생성 모델의 역할을 수행한다.
> Keywords
> - unsupervised learning
> - Nonlinear Dimensionality reduction
> - Maximum Likelihood density estimation

### Introduction
Autoencoder neural networks are a flexible and advantageous structure for exploiting low-dimensional features in high-dimensional data.
High-dimensional data can be converted to low-dimensional codes by training a multilayer neural network with a small central layer to reconstruct high-dimensional input vectors.
#### Overview of Autoencoder

![[attachments/autoencoder-1779450447508.webp|Overview of autoencoder|400]]
- input: $\mathbf{X}$
- Bottleneck hidden layer (latent variable, Feature, Hidden representation) $\mathbf{Z}$
- Output: $\tilde{\mathbf{X}}$
#### Features
- input size = output size
- Loss encourages output to be close to input (입출력이 동일한 네트워크)
Decoder 가 최소한 학습 데이터는 생성해 낼 수 있다. -> 생성된 데이터가 학습 데이터를 좀 닮아있다.
Encoder 가 최소한 학습 데이터느 잘 latent vector 로 표현할 수 있게 된다.
### Unsupervised learning
Because it takes the input vectors and compress these with bottleneck hidden layer and reconstruct the compressed input vectors as close as possible to input vectors what it takes at first, we can call this structure is unsupervised learning.
### Nonlinear Dimensionality reduction
(= Representation learning, Efficient coding learning, Feature extraction, ==Manifold== learning)
![[attachments/autoencoder-1779452239608.webp|기술분류표|400]]
Transformation of data from a high-dimensional space into a low-dimensional space so that the low-dimensional representation retains some meaningful properties of the original data ideally close to its intrinsic dimension.
데이터의 정보의 손실을 최소화하면서 훨씬 낮은 차원으로 줄임.
[[principle-component-analysis|PCA]] 는 데이터의 축을 선형 변환 Linear Transformation 으로만 줄임. (projection, manifold learning X)
#### Manifold Learning
![[attachments/autoencoder-1779633017187.webp|mapping to another dimesion|400]]
A $d$ dimensional manifold $\mathcal{M}$ is embedded in an $m$ dimensional space, and there is an explicit mapping $f:\mathcal{R}^d \rightarrow \mathcal{R}^m, \text{where} \ d \leq m$
##### How is it useful
- Data compression (Autoencoder > JPEG)
- Data visualization (t-SNE)
- Curse of dimensionality
- Discovering most important features
Manifold follows naturally from continuous underlying factors ($\approx$ intrinsic manifold coordinate)
Such continuous factors are part of a ==meaningful representation==.
### [[maximum-likelihood-estimation|Maximum Likelihood]] density estimation
![[attachments/autoencoder-1779452323188.webp|VAE 가 어디에 속해있는지|391]]
### Linear autoencoder
General autoencoder without activation function = Linear autoencoder
$$\begin{align}
h(x) &= Wx + b \\
g(h(x)) &= Wz + b
\end{align}$$
Hidden layer 가 1개이고, 레이어간 fully-connected 로 연결된 구조.
#### Linear autoencoder 는 [[principle-component-analysis|PCA]] 와 같은 subspace 를 배운다?
- For bottleneck structure: $d_z < d$
- With linear neurons and squared loss, autoencoder learns ==same subspace== as PCA
- Also true with a single sigmoidal hidden layer, if using linear output neurons with squared loss and united weights.
- Won't learn the exact same basis as PCA, but $W$ will span the same subspace.
- Prove: [Neural networks and Principle Component Analysis](http://www.vision.jhu.edu/teaching/learning/deeplearning19/assets/Baldi_Hornik-89.pdf)

### Applications
#### Pre-training
In the early deep learning era, there wasn't ReLU, Xaiver, Batch-nore, and etc.
Therefore, Autoencoder was widely utilized to pretrain for big models.
![[attachments/autoencoder-1779789505048.webp|Pretraining example|400]]
For example, train $W^1$ and fix this weight ($W^1$' $= W^T$ in the figure)
Fine tune with backpropagation.
#### Variational Autoencoder
기존의 autoencoder 에서는 encoder 가 입력 데이터를 latent vector $z$ 라는 하나의 점으로 고정해버리기 때문에 그 점들 사이의 빈 공간에는 어떤 데이터가 들어있는지 알 수 없다. 그래서 빈 공간에서 무작위로 $z$ 를 뽑아 decoder 에 넣으면 이상한 이미지가 생성된다.
반면, VAE 는 latent space 를 연속적인 확률분포 Probability Distribution 로 학습한다.