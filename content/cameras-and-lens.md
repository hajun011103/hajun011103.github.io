---
type: Fundamental
aliases:
  - Cameras and Lens
  - 카메라와 랜즈
tags:
  - Study/ComputerVision/3DReconstruction
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)

[[pinhole-cameras|Pinhole Cameras]] 의 문제 conflict between crispness and brightness 는 렌즈를 사용하며 완화되었다.
> [!info] Figure 1. A setup of a simple lens model.
> ![[attachments/cameras-and-lens-1772608901773.webp]]

이것이 simple lens model 의 setup 이다.
위의 빨간점은 nicely 하게 film plane 에 한 점으로 모이자만 렌즈와의 거리가 다른 점 (예를 들어, 파란 점) 은 완벽하게 모여들지 못한다.
이것은 blur 나 out of focus 를 유도한다.
> [!quote]
> Thus, lens have a specific distance for which objects are "in focus".

이 특징은 ==depth of field== 라고 photography 나 computer graphics 분야에서 불린다.
Depth of field = effective range at which cameras can take clear photos

> [!info] Figure 2. A setup of the paraxial refraction model.
> ![[attachments/cameras-and-lens-1772608958719.webp]]

이상적인 렌즈 모델, paraxial refraction model 이다.
> [!quote] 
> They focus all right rays travelling parallel to the optical axis to one point known as the focal point.

빛이 렌즈로 들어올 때에 렌즈의 중심축과 이루는 각도, $\theta$가 아주 작다고 가정
paraxial (근축) $\Rightarrow sin(\theta) \approx \theta$ 해도 오차가 거의 없다. 그리고 핀홀 모델과 수학식이 거의 유사하다.
$$P' = \begin{bmatrix} x' \\ y' \end{bmatrix} = \begin{bmatrix} f\frac{x}{z} \\ f'\frac{y}{z} \end{bmatrix}$$
하지만 핀홀 카메라에서의 focal length 는 $f=z'$ 이었지만 
lens-based model 에서는 $z'=f+z_0$ 이다.
핀홀 카메라는 거리에 상관없이 초점이 맞지만, 렌즈 카메라는 물체의 거리에 따라 상이 맺히는 위치($z'$)가 달라집니다. 즉, **초점을 맞추기 위해 렌즈와 센서 사이의 거리를 조절해야 한다**는 물리적 현실을 반영한 것이다.


#### Limitations
이 모델도 완벽하듯 보이지만, 현실 세계에서의 물리 렌즈는 완벽하지 않아서 Aberration (수차) 가 발생한다.
> [!info] Figure 3. Demonstrating how pincushion and barrel distortions affect images.
> ![[attachments/cameras-and-lens-1772609052253.webp]]

가장 흔하게 발생하는 것이 optical axis 의 거리에 비례해서 이미지가 확대되거나 축소되는 Radial distortion 이 있다.
멀어질수록 확대되면 pincushion, 축소되면 barrel
> [!quote] 
> Radial distortion is caused by the fact that different portions of the lens have differing focal lengths.

