---
type: Paper
aliases:
  - DROID SLAM
tags:
  - Study/Robotics/SLAM
status: Done

---
### Reference
- [DROID-SLAM: Deep Visual SLAM for Monocular, Stereo, and RGB-D Cameras](https://arxiv.org/pdf/2108.10869)

### Related works
- Visual SLAM
- Deep Learning

### DROID
> [!abstract] 
> Estimate the trajectory of the camera and build a 3D map
> Differentiable Recurrent Optimization Inspired Design
> it consists of recurrent iterative update
> - high accuracy
> - high robustness
> - strong generalization (Zero-shot, can directly use stereo or RGB-D input)

RAFT
- iteratively updates optical flow
- operates on two frames

DROID-SLAM
- iteratively update camera poses and depth
- updates are applied to an arbitrary number of frames, enabling joint global refinement of all camera poses and depth maps, essential for minimizing drift for long trajectories and loop closures.

Dense Bundle Adjustment (DBA) layer
- differentiable
- computes a Gauss-Newton update to camera poses and dense per-pixel depth so as to maximize their compatibility with the current estimate of optical flow
- leverages geometric constraints, improves accuracy and robustness, and enables a monocular system to handle stereo or RGB-D input without retraining

### Approach
> [!info]  Figure 1. Illustration of the update operator
> ![[attachments/droid-slam-1772507207439.webp|500]]
#### Feature Extraction and Correlation
6 residual blocks and 3 downsampling layers
producing dense feature maps at 1/8 the input image resolution

two separate networks to extract features (similar to RAFT)
1. a feature network: to build the set of correlation volumes
2. a context network: are injected into the network during each application of the update operator

#### Frame Graph
adapt a frame-graph $\left( \mathcal{V}, \mathcal{E} \right)$ to represent co-visibility between frames
An edge $\left( i, j \right) \subset \mathcal{E}$ means image $\text{image} \ \mathbf{I}_i$ and $\text{image} \ \mathbf{I}_j$ have overlapping fields of view which shared points.
The frame graph is built dynamically during training and inference.
After each pose or depth update, can recompute ==visibility== to update the frame graph.
If the camera returns to a previously mapped region, add long range connections in the graph to perform ==loop closure==.

#### Correlation Pyramid & Lookup
For each edge in the frame graph, compute a ==4D correlation volume== by taking the dot product between all pairs of feature vectors.
Then perform ==average pooling== of the last two dimensions of the correlation volume following RAFT to form a 4-level correlation pyramid.
$$\mathbb{R}^{H \times W \times H \times W} \times \mathbb{R}^{H \times W \times 2} \mapsto \mathbb{R}^{H \times W \times (r+1)^2}$$
The lookup operator takes an $H \times W$ grid of coordinates as input.

쉽게 말해, 첫 번째 이미지의 특정 픽셀이 두 번째 이미지의 어느 위치로 이동했는지 (매칭 확률) 를 3차원 데이터로 매핑해두는 과정입니다. 카메라의 위치가 변함에 따라 픽셀이 이동하는 궤적을 추적하는 핵심 단서가 됩니다. 

#### Update Operator
**Core Component**
The update operator = $3 \times 3$ convolutional GRU with hidden state $\mathbf{h}$ 
operator updates the hidden state $\rightarrow$ a pose update, depth update
Pose and depth updates are applied to the current depth and pose estimates.
Iterative applications of the update operator produce a sequence of poses and depths.

###### Inputs
Correspondence field to index the correlation volumes
To derive ==optical flow==
- use correspondence field induced by camera motion as the difference $\mathbf{p}_{ij} - \mathbf{p}_{i}$. 
- the residuals from the previous BA solution is concatenated with the flow field, allowing the network to use feedback from the previous iteration.

use $\mathbf{p}_{ij}$ to perform lookup from the correlation volume $\mathbf{C}_{ij}$ to retrieve correlation features.
The correlation features provide information about visual similarity in the neighborhood of $\mathbf{p}_{ij}$ allowing the network to learn to align visually similar image regions.
The flow provides an complementary source of information allowing the network to exploit smoothness in the motion fields to gain robustness.

###### Update
Context Network $\rightarrow$ Context features $\rightarrow$ GRU
averaging the hidden state across the spatial dimensions of the image $\rightarrow$ Global Context $\rightarrow$ additional input to the GRU
Incorrect correspondences can degrade the accuracy of the system.
It is important for the network to recognize and reject erroneous correspondences.
The GRU produces an updated hidden state $\mathbf{h}^{(k+1)}$
- [c] predict updates to the depth or pose directly (X)
- [p] predict updates in the space of dense flow fields (O)

###### Output
- A revision flow field $\mathbf{r}_{ij} \in \mathbb{R}^{H \times W \times 2}$, a correction term predicted by the network to correct errors in the dense correspondence field $\mathbf{p}^*_{ij} = \mathbf{r}_{ij} + \mathbf{p}_{ij}$
- Associated confidence map $\mathbf{w}_{ij} \in \mathbb{R}_+^{H \times W \times 2}$

###### DBA (Dense Bundle Adjustment)
DBA maps the set of flow revisions into a set of pose and pixelwise depth updates
$$\mathbf{E}(\mathbf{G}', \mathbf{d}') = \Sigma_{(i,j) \in \mathcal{E}} \ || \mathbf{p}^*_{ij} - \Pi_c\left(\mathbf{G}'_{ij} \circ \Pi^{-1}_c (\mathbf{p}_i, \mathbf{d}'_i) \right) ||^2_{\Sigma_{ij}} \quad \Sigma_{ij} = \operatorname{diag} \mathbf{w}_{ij}$$
- $||\circ||_\Sigma$: Mahalanobis distance, weights the error terms based on the confidence weights $\mathbf{w}_{ij}$ an updated pose $\mathbf{G}'$ and depth $\mathbf{d}'$ (reprojected points match the revised correspondence $\mathbf{p}^*_{ij}$ as predicted by the update operator.)
- Gauss-Newton Algorithm: $\Pi$ (Non-linear) $\rightarrow$ Taylor expansion (Linear) $\rightarrow$ solve for updates $\Delta \xi, \Delta d$
- Hessian matrix: block diagonal structure, 근사행렬
- Schur Complement: 고속 연산을 위한 수학적 트릭
