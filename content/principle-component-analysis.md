---
type: Concept
aliases:
  - PCA
  - Principle Component Analysis
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [PCA main ideas by StatQuest](https://www.youtube.com/watch?v=HMOI_lkzW08)
- [PCA clearly explained by StatQuest](https://www.youtube.com/watch?v=_UVHneBUBW0)
- [혁펜하임의 주성분 분석](https://www.youtube.com/watch?v=C21GoH0Y9AE)
- [Data-Drive Science and Engineering by Steve Brunton](https://faculty.washington.edu/sbrunton/databookRL.pdf)

> [!tldr] 
> One of the central applications of the SVD (Singular Value Decomposition)
> A statistical interpretation of the data-driven, hierarchical coordinate system used to represent high-dimensional correlated data

### Introduction
PCA pre-processes the data by mean subtraction and setting the variance to unity before performing the SVD. The geometry of the resulting coordinate system is determined by principle components (PCs) that are uncorrelated (orthogonal) to each other, but have maximal correlation with the measurements.
![[attachments/principle-component-analysis-1779626311597.webp|Clustering of samples that are normal and those that have cancer in the first three principle component coordinates.|400]]

### How does it work
We do not need another line to describe **diagonal** variation. We have already captured the two directions that can have variation.
![[attachments/principle-component-analysis-1779619869708.webp|make new X and Y axes|400]]
These two new axes that describe the variation in the data are ==Principle Components== (PCs).
PC1 (the first principle component) is the axis that spans the most variation.
PC2 is the axis that spans the second most variation.
PC2 has to be orthogonal to PC1.
> [!tip] 
> PC 의 수는 dimension 의 수와 같다.
> 가장 큰 variation 을 갖는 변수가 principle components 에 제일 영향을 많이 끼친다.
> influence score 를 보면 어떤 변수가 제일 중요한지 아니면 type 을 구별하는데 도움을 주는지 알 수 있다.

PC1 이 그러면 어떻게 정해지냐.
PC1 axis 를 찾을 때, 모든 데이터를 그 축에 투영 (projection) 시켜 보았을 때 오차가 제일 작은 축이 PC1 이 된다. (수학적으로 증명이 가능.)
##### Proof
![[attachments/principle-component-analysis-1779625474167.webp|혁펜하임 주성분 분석 강의에서|200]]
$$\min{\frac{1}{N} \sum_i \left( d_i - d_i^Tu \cdot u \right)^T \left(d_i - d_i^Tu \cdot u \right)}$$
Eigen decomposition 과 다른 점은 eigen decomposition 은 데이터의 크기를 줄인것이라면 pca 는 데이터의 분산을 가장 잘 나타내는 축으로 줄인 것.

### Applications
#### Eigenface
PCA is applied to a large library of facial images to extract the most dominant correlations between images. The result of this decomposition is a set of eigenfaces that define a new coordinate system.
Images of the same person tend to cluster in the eigenface space, making this a useful transformation for facial recognition and classification.
![[attachments/principle-component-analysis-1779626598852.webp|Schematic procedure to obtain eigenfaces from library of faces X after subtracting off average face X.|400]]
$$\sum_{k=1}^{10} d_i^Tq_kq_k \approx d_i$$
- $d_i$ : $100 \times 100$ 얼굴 이미지 행렬
- $q_k$ : eigenvector

