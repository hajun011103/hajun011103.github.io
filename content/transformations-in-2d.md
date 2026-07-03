---
type: Fundamental
aliases:
  - Transformations in 2D
tags:
  - Study/ComputerVision/3DReconstruction
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)
- [Jinsol Kim's blog](https://gaussian37.github.io/vision-concept-image_transformation/)

### 2차원 공간에서의 변환 종류
이미지에 있는 정보를 알아내기 위해서는 2D 공간에서의 다양한 변환을 알아야 한다.

#### Isometric transformations
- preserve distances
- described as a rotation $R$ and translation $t$
$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} R & t \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$

#### Similarity transformations
- preserve shape (= isometric transformations + scaling)
- preserve ratio of lengths and angles
- every isometric transformations = similarity transformations when $s=1$
$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} SR & t \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}, \quad S = \begin{bmatrix} s & 0 \\ 0 & s \end{bmatrix}$$

#### Affine transformations
> [!info] Figure 1. Affine transformation
> ![[attachments/transformations-in-2d-1772609492939.webp|660x189]]


- preserve points, straight lines, and parallelism
For some vector $v$, an affine transformation $T$ is, (where $A$ is a linear transformation)
$$T(v)=Av+t$$

In homogeneous coordinate, affine transformation is
$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} A & t \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$

#### Projective transformations (or homographies)
> [!info] Figure 2. Perspective transformation
> ![[attachments/transformations-in-2d-1772609588067.webp|657x188]]

- any transformations that maps lines to lines
- does note preserve parallelism
- does preserve collinearity of points, as it maps lines to lines
- extra degrees of freedom are added with the addition of $v$
$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} A & t \\ v & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$
==Cross ratio== of four collinear points remains invariant under projective transformations
$$\text{cross ratio} = \frac{\|P_3-P_1\| \ \|P_4-P_2\|}{\|P_3-P_2\| \ \|P_4-P_1\|}$$
한 직선 위에 점 4개를 가지고 계산하면, 그 값을 사진 찍기 전 (3D) 이나 찍은 후 (2D) 나 똑같이 유지한다.