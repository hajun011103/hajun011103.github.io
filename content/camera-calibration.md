---
type: Concept
aliases:
  - Camera Calibration
  - 카메라 캘리브레이션
tags:
  - Study/ComputerVision/3DReconstruction
status: Done

---
### Reference
- [Stanford CS231A](https://web.stanford.edu/class/cs231a/)

정확하게 transformation 을 계산하기 위해서는 [[camera-matrix-model#Complete Camera Matrix Model|intrinsic parameters]]를 정확하게 알아야 하고 이것을 구하기 위해 camera calibration 을 시행한다.
![[attachments/camera-calibration-1772518470399.webp]]

$$p_i = \begin{bmatrix} u_i \\ v_i \end{bmatrix} = MP_i = \begin{bmatrix} \frac{m_1P_i}{m_3P_i} \\ \frac{m_2P_i}{m_3P_i} \end{bmatrix}$$
, where $p$ = 2D pixel, $P$ = 3D 좌표, $M$ = Projection Matrix

잘 이해는 하지 못했지만, 행렬 $M$ 에는 미지수 11개가 있고, 최소 6개의 점 (미지수 12개) 만 있다면, $M$ 을 찾을 수 있다.
현실에서는 noise 가 있기 때문에, $M$ 으로 딱 떨어지지 않고 SVD 를 활용해 오차가 가장 적은 $M$ 을 찾아낸다.

- intrinsics
	- $\rho = \pm \frac{1}{\|a_3\|}$, scaling factor
	- $c_x = \rho^2 (a_1 \cdot a_3) \quad c_y = \rho^2 (a_2 \cdot a_3)$
	- $\theta = \cos^{-1} \left( -\frac{(a_1 \times a_3) \cdot (a_2 \times a_3)}{\|a_1 \times a_3\| \cdot \|a_2 \times a_3\|} \right)$
	- $\alpha = \rho^2 \|a_1 \times a_3\| \sin \theta$
	- $\beta = \rho^2 \|a_2 \times a_3\| \sin \theta$
- extrinsics
		- $r_1 = \frac{a_2 \times a_3}{\|a_2 \times a_3\|}$
		- $r_2 = r_3 \times r_1$
		- $r_3 = \rho a_3$
		- $T=\rho K^{-1} b$

