---
type: Fundamental
aliases:
  - Points and Lines at Infinity
tags:
  - Study/Geometry
  - Study/ComputerVision/3DReconstruction
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)

무한점, 무한선
현실에서는 평행한 두 선은 영원히 만나지 않지만, 기하학적으로는 **무한대**에 있는 한 점에서 만난다고 정의할 수 있다.
이 개념은 2D 이미지 한 장으로 잃어버린 3D 정보를 복구할 수 있는 거의 유일한 단서이다.

homogeneous vector $l = \begin{bmatrix} a \\ b \\ c \end{bmatrix}$, slope of the line $-\frac{a}{b}$ and y-intercept $-\frac{c}{b}$
$$p = \begin{bmatrix} x \\ y \end{bmatrix} \quad \begin{bmatrix} a & b & c \end{bmatrix} \begin{bmatrix} x \\ y  \\ 1 \end{bmatrix} = ax+by+c = 0$$
> [!quote]
> In general, two lines $l$ and $l'$ will intersect at a point $x$. This point is defined as the cross product between $l$ and $l'$.

#### Proof
The intersection point $x$ should lie on both $l$ and $l'$. Therefore,
$$x = \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} \quad l = \begin{bmatrix} a \\ b \\ c \end{bmatrix} \quad l' = \begin{bmatrix} a' \\ b' \\ c' \end{bmatrix}$$
$$x^Tl = \begin{bmatrix} x & y & 1 \end{bmatrix} \begin{bmatrix} a \\ b \\ c \end{bmatrix} = ax + by + c = 0 \quad x^Tl' = \begin{bmatrix} x & y & 1 \end{bmatrix} \begin{bmatrix} a' \\ b'  \\ c' \end{bmatrix} = a'x + b'y + c' = 0$$
Dot product (내적) 이 0이라는 것은 두 vector 가 orthogonal (직교) 한다는 것이다.
$x$ 는 $l$ 과 $l'$ 과 동시에 수직이어야 한다. 그러므로,
$$x = l \times l'$$
> [!example] 
> $x =1 \quad y = 1 \quad \Rightarrow \quad -x + 1 = 0 \quad -y + 1 = 0$
$$x = l \times l' = \left| \begin{matrix} i & j & k \\ -1 & 0 & 1 \\ 0 & -1 & 1 \end{matrix} \right| = \begin{pmatrix} 1 \\ 1\\ 1 \end{pmatrix}$$
$\begin{pmatrix} 1 \\ 1\\ 1 \end{pmatrix}$ 는 Intersection point in homogeneous coordinate $\rightarrow \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ in inhomogeneous coordinate

#### What about Parallel lines?
$$l = \begin{bmatrix} a \\ b \\ c \end{bmatrix} \quad l' = \begin{bmatrix} a \\ b \\ c' \end{bmatrix}$$
$$x = l \times l' = \begin{bmatrix} a \\ b \\ c \end{bmatrix} \times \begin{bmatrix} a \\ b \\ c' \end{bmatrix} = \begin{bmatrix} bc' - cb \\ ca - ac' \\ ab - ba \end{bmatrix} = (c' - c)\begin{bmatrix} b \\ -a \\ 0 \end{bmatrix}$$
> [!quote] 
> Everybody knowledge expects these lines to never intersect. However, this definition could be rewritten to say that these lines intersect at ==infinity==.

#### Points at infinity
동차좌표계 ([[homogeneous-coordinate]]) 에서는 무한에 위치하는 점을 표현하고 싶을 때, 마지막 차원을 0으로 한다. 
예를 들어, 
$$\text{homogeneous coordinate} \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} \rightarrow \text{inhomogeneous coordinate} \ (1, 1)$$ $$\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} \rightarrow \left(\frac{1}{0},\frac{1}{0}\right)\rightarrow (\infty, \infty)$$
위의 계산에 따르면, $l \times l' \propto \begin{bmatrix} b \\ -a \\ 0 \end{bmatrix} = x_\infty$ . 그리고 이 점을 The point at infinity 혹은 **ideal point**라고 부른다.

> [!quote] 
> One interesting property of a point at infinity is that all parallel lines with the same slope $-\frac{a}{b}$ pass through the ideal point as shown below:
> $$l^Tx_\infty = \begin{bmatrix} a & b & c \end{bmatrix} \begin{bmatrix} b \\ -a \\ 0 \end{bmatrix} = ab - ba + 0 = 0$$

> [!example] 
> two lines $x =1, x = 2 \Rightarrow -x + 1 = 0, -x + 2 =0$
> $$l = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix} \quad l' = \begin{pmatrix} -1 \\ 0 \\ 2 \end{pmatrix}$$
> $$x = l \times l' = \left| \begin{matrix} i & j & k \\ -1 & 0 & 1 \\ -1 & 0 & 2 \end{matrix} \right| = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$$

#### Lines at infinity
The concept of points of infinity can be extended to define lines at infinity.
> [!quote]
> Consider two or more pairs of parallel lines. Each pair of parallel lines intersect at a point at infinity. The line $l_\infty$ that passes through all these points at infinity must satisfy $l_\infty^Tx_\infty=0$. This means that $l_\infty = \begin{bmatrix} 0 \\ 0 \\ c \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$. Since $c$ is an arbitrary value (just simplified version).

#### Projective transformation $H$
Apply [[transformations-in-2d#Projective transformations (or homographies)|projective transformation]] $H$ to a point at infinity $p_\infty$
$$p' = Hp_\infty = \begin{bmatrix} A & t \\ v & b \end{bmatrix} \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} = \begin{bmatrix} p_x' \\ p_y' \\ p'_z \end{bmatrix}$$
The last element of $p'$ may become non-zero. 
A projective transformation generally maps points at infinity to points not infinity.

Let's apply a [[transformations-in-2d#Projective transformations (or homographies)|projective transformation]] $H$ to a line $l$ to get a new line $l'$.
$$\begin{flalign} 
&x^Tl = 0 \quad x'^Tl' = 0 & \\
&x' = Hx \quad H^{-1}x' = x & \\
\\
&x^TIl = x^TH^TH^{-T}l = 0 & \\
&(H^{-1}x')^TIl = x'^TH^{-T}H^TH^{-T}l = x'^TH^{-T}l = 0 = x'^Tl' & \\
&l' = H^{-T}l &
\end{flalign}$$
Similar to points at infinity, the projective transformation of a line at infinity does not map to another line at infinity.

#### Affine transformation
$$p' = Hp_\infty = \begin{bmatrix} A & t \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} = \begin{bmatrix} p_x' \\ p_y' \\ 0 \end{bmatrix}$$
[[transformations-in-2d#Affine transformations|Affine transformation]] maps points at infinity to points at infinity. (lines same)
