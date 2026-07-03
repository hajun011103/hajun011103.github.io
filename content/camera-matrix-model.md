---
type: Fundamental
aliases:
  - Camera Matrix Model
tags:
  - Study/ComputerVision/3DReconstruction
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)

intrinsic & extrinsic camera parameters, homogenous transformation

3차원에 있는 한 점을 image plane 위에 있는 $P'$ 으로 매핑하는 것을 projective transformation 이라고 한다.
하지만 우리가 3D 포인트들을 image plane 위에 투영한 것들은 우리가 보는 디지털 이미지와 직접적으로 일치하지 않는다.
그 이유는,
	1. 디지털 이미지 위의 점들과 image plane 위의 점들은 in a different reference system
	2. 디지털 이미지는 discrete pixels 들로 나뉘어져 있다. 하지만 image plane 위의 점들은 continuous 하다.
	3. physical lens 들은 distortion 과 같은 non-linearity 를 야기할 수 있다.

이러한 다름을 additional transformations 를 가지고 해소할 수 있다.

> [!abstract] 
> The camera matrix model describes a set of important parameters that affect how a world point P is mapped to image coordinates P 0 . As the name suggests, these parameters will be represented in matrix form. First, let’s introduce some of those parameters.

#### Camera Center, $C_x, C_y$
image plane origin ($C'$) at the center of the image
digital image origin 은 주로 좌상단 혹은 좌하단에 위치한다.
그러므로 이 차이를 translation vector $\begin{bmatrix} c_x \\ c_y \end{bmatrix}$ 로 상쇄한다.
$$P'= \begin{bmatrix} x' \\ y' \end{bmatrix} = \begin{bmatrix} f\frac{x}{z}+c_x \\ f\frac{y}{z}+c_y \end{bmatrix}$$

#### Scale ratio, $k, l$
digital image 는 연속적이지 않은 pixel 단위로 표현되고 image plane 은 physical measurement (cm) 로 표현된다.
이 차이를 $k, l$ 를 사용하여 상쇄한다.
$k, l$ 의 유닛은 $\frac{pixels}{cm}$ 이다.
카메라가 정사각형이 아닐수도 있으므로 $k$ (가로) 와 $l$ (세로) 를 따로 두었다.
이것을 위의 식에 적용하면,
$$P'= \begin{bmatrix} x' \\ y' \end{bmatrix} = \begin{bmatrix} fk\frac{x}{z}+c_x \\ fl\frac{y}{z}+c_y \end{bmatrix} = \begin{bmatrix} \alpha\frac{x}{z}+c_x \\ \beta\frac{y}{z}+c_y \end{bmatrix}$$
하지만 operation 이  input parameters 중 하나, $z$ 가 $\frac{1}{z}$ 로 들어가기 때문에, linear 하지 못하게 된다.

##### [[homogeneous-coordinate]]
$$P'=(x',y') \rightarrow (x',y',1)$$
$$P=(x,y,z) \rightarrow (x,y,z,1)$$
위의 projection 을 linear 하게 만들기 위해서 하나의 차원을 추가한다.
그리고 이것을 homogeneous coordinate system 이라고 부른다.

예를 들어, 
Euclidean vector $(v_1, \dots, v_n) \rightarrow$ Homogeneous coordinates $(v_1, \dots, v_n,1)$
Homogeneous coordinates $(v_1, \dots, v_n,w) \rightarrow$ Euclidean coordinates $(\frac{v_1}{w}, \dots, \frac{v_n}{w})$

이것을 적용하면,
$$P' = \begin{bmatrix} x' \\ y' \\ z \end{bmatrix} = \begin{bmatrix} \alpha x' + c_xz \\ \beta y' + c_yz \\ z \end{bmatrix} = \begin{bmatrix} \alpha & 0 & c_x & 0 \\ 0 & \beta & c_y & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix} \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix} = \begin{bmatrix} \alpha & 0 & c_x & 0 \\ 0 & \beta & c_y & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix}P = MP$$
$$P' = MP = \begin{bmatrix} \alpha & 0 & c_x \\ 0 & \beta & c_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} I & 0\end{bmatrix} \ P = K \begin{bmatrix} I & 0\end{bmatrix} \ P$$
$K$ = camera matrix

#### Complete Camera Matrix Model 
위의 식은 skewness 와 distortion 을 무시하고 있다.
원래는 대부분의 카메라는 zero-skew 이지만, sensor manufacturing 단계에서 some degree of skewness 가 발생할 수 있다. 
Skewness 를 반영한 camera matrix 는,
$$K = \begin{bmatrix} x' \\ y' \\ z \end{bmatrix} = \begin{bmatrix} \alpha & -\alpha\cot{\theta} & c_x \\ 0 & \frac{\beta}{\sin{\theta}} & c_y \\ 0 & 0 & 1 \end{bmatrix}$$
그리고 이 camera matrix $K$ 는 5DoF 를 가지고 있다.
- 2 for focal length
- 2 for offset
- 1 for skewness
그리고 이 parameters 들을 ==intrinsic parameters== 라고 부른다.

#### Extrinsic Parameters
> [!quote]
> What if the information about the 3D world is available in a different coordinate system? Then, we need to include an additional transformation that relates points from the world reference system to the camera reference system. This transformation is captured by a rotation matrix $R$ and translation vector $T$.

$$P = \begin{bmatrix} R & T \\ 0 & 1\end{bmatrix} \ P_w $$
, where $P_w$ = a point in a world reference system

원래는 $P' = RP+T$ 이지만 이러면 식이 복잡해지므로 여기서도 homogeneous coordinate 을 사용한다.
저 식을 다시 camera matrix 에 적용하면,
$$P'=K \begin{bmatrix} R & T\end{bmatrix} \ P_w = MP_w$$

$\begin{bmatrix} R & T\end{bmatrix}$ 는 ==extrinsic parameters== 이다.

#### Projection Matrix, $M$
Overall, we find $3 \times 4$ projection matrix $M$ has 11 DoF.
- 5 from intrinsic camera matrix
- 3 from extrinsic rotation
- 3 from extrinsic translation
