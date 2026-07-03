---
type: Concept
aliases:
  - I-JEPA
  - Image-based Joint-Embedding Predictive Architecture
tags:
  - Study/ComputerVision
status: Done

---
### Reference
- [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://arxiv.org/pdf/2301.08243)

> [!tldr] 
> How to improve the semantic level of self-supervised representations without using extra prior knowledge encoded through image transformations.
> Idea
> Predict missing information in an abstract representation space
> Predict the representations of various target blocks in the same image
> where target representations are computed by a learned target-encoder network
> 기존의 방법들의 한계를 깨기 위해서 나온 a non-generative approach for self-supervised learning from images

### Common approaches before
for self-supervised learning from images
#### Invariance-based pretraining methods
optimize an encoder to produce similar embeddings for two or more views of the same image, constructed using data augmentations (random scaling, cropping, color jittering, and etc)
It can produce high semantic representations but they also introduce strong biases that may detrimental for certain downstream tasks or even for pretraining talks with different data distributions.
DiNO, SimCLR, BYOL 같은 방법들의 핵심 아이디어와도 동일.
같은 이미지를 다르게 변형하여 인코더가 같은 표현을 출력하게 한다
어떤 augmentation 을 쓰느냐가 모델이 뭘 학습할지를 결정.
그러므로 이미 어떤 augmentation 을 써서 모델을 학습하고 나서 다른 task 에 적용하려고 하면 문제가 발생할 수 있다.
#### Generative methods
remove or corrupt portions of the input and learn to predict the computed content.
For example, mask-denoising approaches learn representations by reconstructing randomly masked patches from an input.
Masked pretraining tasks require less prior knowledge than view-invariance approaches and easily generalize beyond the image modality.
Typically lower semantic level and underperform invariace-based pretraining methods.
이미지를 부분적으로 가리고 모델이 그 가려진 masked 된 영역을 예측하게 해서 학습하는 방식.
기존에 LLM 에서 주로 쓰이던 방식을 vision 에 적용시켜 mask image modeling 이라고도 불린다. 주로 이미지의 90% 를 가렸을 때 효율이 제일 좋다고 했던 기억이 난다.
하지만 이 방식은 이미지 안의 의미를 해석하기 보다 바로 옆의 픽셀의 특징을 학습할 수 있다. 
예를 들어, 이미지에 고양이가 있고 가려져 있다면, 모델이 고양이를 보고 이해한 다음 이미지의 빈 곳을 채우는 것이 아니라 바로 옆의 픽셀의 색깔, texture 를 보고 픽셀을 예측할 수 있다. 그러므로 주로 저수준 차원의 의미를 학습할 가능성이 크고, invariance-based pretraining method 보다 image classification 문제에서 성능이 떨어질 수 있다.
Generative methods -> predict in pixel/token space
### Architectures
makes use of abstract prediction targets for which unnecessary pixel-level details are potentially eliminated -> leading the model to learn ==more semantic features==
#### Joint-Embedding Architectures
JEA learns to output similar embeddings for compatible inputs, and dissimilar embeddings for incompatible inputs.
Compatible inputs = typically constructed by randomly applying hand-crafted data augmentations to the same input image. invariance-based methods 에서 data augmentation 을 하고 나서의 이미지를 원래의 이미지와 똑같은 출력을 뽑게 할때 그 쌍.
The main challenge with JEA = **Representation collapse**
만약 위의 compatible inputs 혹은 positive pairs 를 모델에게 주고 비슷한 출력을 뽑게 loss function 을 설계했을 때에 모델이 편법으로 모든 데이터를 원점으로 압축하여서 같은 벡터를 뽑아내게 할 수 있다.
Solution = Contrastive (SimCLR), Non-contrastive (ViCReg, Barlow Twins), Clustering/Asymmetric (DINO, BYOL)
#### Generative Architectures
learn to directly reconstruct a signal $y$ from a compatible signal $x$, using a decoder network that is conditioned on an additional latent variable $z$ to facilitate reconstruction.
이 구조 혹은 방법은 representation collapse 가 일어나지 않는다.
픽셀을 정확하게 복원하게 loss function 이 설계되어 있기 때문에, 모든 입력에 같은 벡터를 출력하는 편법이 통하지 않음.
하지만, 픽셀 복원이라는 목표가 너무 저수준이라 인코더가 의미론적 개념보다는 픽셀 패턴을 암기한다.
#### Joint-Embedding Predictive Architecture
similar to Generative Architectures but a key difference is that the loss function is applied in embedding space, not input space.
JEPAs learn to predict the embeddings of a  signal $y$ from a compatible signal $x$ using a predictor network that is conditioned on an additional latent variable $z$ to facilitate ==prediction==
JEPA 가 high-level semantic representation 을 배우는 이유는 정답이 픽셀이 아니라 ==표현==이기 때문에 픽셀 디테일로는 절대 맞출 수 없는 정답을 맞추려다 보니 모델이 자연스럽게 의미론적 추상적인 표현을 더 학습하게 된다.
하지만, 이 구조는 representation collapse 문제가 재기될 수 있다.
### I-JEPA Overview
![[attachments/i-jepa-1780919751224.webp|Joint-Embedding Predictive Architecture|400]]
context-encoder, target-encoder, and predictor = ViT architecture
generative masked autoencoders (MAE) 와 구조가 닮았지만, I-JEPA 는 non-generative 이고 predictions 은 representation space 에서 수행된다.
#### Context encoder
![[attachments/i-jepa-1780919915079.webp|Context block]]
원본 이미지에서 target blocks 를 제외한 이미지를 인풋으로 받는다. (약 이미지의 85% 크기)
goal = predict the target block representations from a single context block.
$$s_x = \{s_x\}$$
context block 을 크게 만드는 이유는 충분히 넓은 context 를 줘야 전체 구조를 이해해서 예측하도록 유도하기 위해서. ablation 에서 테스트 해보았을 때, context 가 작으면 성능이 급격히 떨어진다.
#### Target encoder
![[attachments/i-jepa-1780919947952.webp|Target blocks]]
원본 이미지에서 주로 4개의 target 이미지를 생성한다. (random aspect ratio 0.75 ~ 1.5, random scale 0.15 ~ 0.2)
Target encoder 는 각각의 생성된 이미지를 보고 patch-level representation 을 예측한다
$$s_y=\{s_1,s_2,s_3,s_4\}$$
Target 이 너무 작으면 모델이 주변 patch 랑 비슷하겠지 수준의 local 추론만 하게 된다. 반대로 너무 크면 context 와 겹치는 부분이 많아져서 예측이 너무 쉬워진다. Target 도 single vs Multi (4개) 비교해보았을때 성능 차이가 크다. 여러 위치를 동시에 예측해야 하다 보니 더 풍부한 표현을 학습하게 되는 것 같음.
#### Predictor
Context encoder 의 아웃풋과 mask token 을 인풋으로 받고 Target encoder 의 아웃풋을 예측하도록 학습한다.
mask token = a shared learnable vector with an added positional embedding.
shared learnable vector = 예측해야 할 위치다라는 의미를 담은 공유 벡터
positional embedding = 위치 정보
predictor 의 아웃풋은 $\hat{s}_y$
predictor 는 context encoder 보다 훨씬 작다. 왜냐하면 predictor 가 너무 크고 강력하면, encoder 가 좋은 표현을 만들지 않아도 predictor 가 혼자서 다 해결해버리기 때문. predictor 를 일부러 작게 만들어서 encoder 가 열심히 좋은 표현을 만들도록 강제.
#### Loss
average $L_2$ distance between the predicted patch-level representation $\hat{s}_y$ and the target patch-level representation $s_y$
$$\frac{1}{M} \sum_{i=1}^M D(\hat{s}_y(i), s_y(i)) = \frac{1}{M} \sum_{i=1}^M \sum_{j\in B_i} \| \hat{s}_{y_j} - s_{y_j} \|_2^2$$
$M$ = number of target blocks
The parameters of the predictor and context encoder are learned through gradient-based optimization, while the parameters of the target encoder are updated via an exponential moving average of the context encoder parameters.
#### Conclusion
1. 픽셀이 아닌 표현 공간에서 예측 정확한 픽셀값을 맞출 필요가 없으니, 모델이 의미론적 구조를 이해하는 방향으로 자연스럽게 유도.
2. 넓은 context -> 여러 target 예측 단순히 옆 패치랑 비슷하겠지 수준의 지역적 추론으로는 4개의 target 을 동시에 잘 예측하기 어렵다. 전체 이미지 구조를 이해해야 한다.
3. predictor 가 위치 정보를 처리. 어느 위치의 표현인지를 predictor 가 담당하므로 context encoder 는 위치 정보보다는 의미론적 내용에 집중할 수 있음.
![[attachments/i-jepa-1780922486130.webp|각 이미지에 대한 predictor 의 결과 1|697]]![[attachments/i-jepa-1780922538032.webp|각 이미지에 대한 predictor 의 결과 2|697]]