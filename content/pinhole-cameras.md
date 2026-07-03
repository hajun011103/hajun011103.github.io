---
type: Fundamental
aliases:
  - Pinhole Cameras
tags:
  - Study/ComputerVision/3DReconstruction
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)

> [!info] Figure 1. A simple working camera model: the pinhole camera model
> ![[attachments/pinhole-cameras-1772608540910.webp|659x238]]

> [!quote]
> Without a barrier in place, every point on the film will be influenced by light rays emitted from every point on the 3D object. Due to the barrier, only one (or a few) of these rays of light passes through the aperture (구멍) and hits the film.

이것이 one-to-one mapping between 3D point on the object and the film 을 가능케 하고 이 모델을 pinhole camera model 이라고 함.

> [!info] Figure 2. A formal construction of the pinhole camera model
> ![[attachments/pinhole-cameras-1772608608737.webp]]

film = image or retinal plane
Aperture = pinhole (=point O) or center of the camera
distance between the image plane and the pinhole O = focal length $f$
point $P=[x, y, z]^T$ on some point on the 3D object
point $P'$ (= point P projected on the image) = $P'=[x',y']^T$
point $C'$ = point C projected on the image plane
camera reference system (or camera coordinate system) = $[i \ j \ k]$ 
$\overline{OC}$ = optical axis

triangle $P'C'O$ 는 triangle $P$, $O$, and $(0,0,z)$ 와 유사하다.
그러므로 law of similar triangles 를 적용하면
$$\text{비율}=\frac{\text{높이}}{\text{밑변}} \quad \Rightarrow \quad \frac{x}{z}=\frac{x'}{f}$$
그러므로,
$$P' = \begin{bmatrix} x' \\ y' \end{bmatrix} = \begin{bmatrix} f\frac{x}{z} \\ f'\frac{y}{z} \end{bmatrix}$$
$f$ (= focal length) 는 pinhole camera 에서는 $z'=f$ 이다.

> [!info] Figure 3. The effects of aperture size on the image.
> ![[attachments/pinhole-cameras-1772608695482.webp]]

위의 사진은 Aperture 크기에 따른 image 의 변화이다.
Aperture 가 커질수록 통과시키는 light rays 들의 수가 많아지고 사진에 blur 를 일으키는 모습이다.
Aperture 가 작을때는 선명해지지만 들어오는 빛이 적어 어둡게 나온다.
우리는 선명하고 (crisp) 밝은 (bright) 한 이미지를 원하지만 pinhole camera model 은 이것을 불가능케 한다.
하지만 이 문제를 [[cameras-and-lens|렌즈]]로 해결할 수 있다.

