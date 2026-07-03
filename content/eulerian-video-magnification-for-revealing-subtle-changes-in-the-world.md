---
type: Paper
aliases:
  - Eulerian Video Magnification for Revealing Subtle Changes in the World
tags:
  - Study/ComputerVision/MotionAmplification
status: Incomplete

---
### Reference
- [Eulerian Video Magnification for Revealing Subtle Changes in the World](https://people.csail.mit.edu/mrub/papers/vidmag.pdf)

> [!tldr] 
> Goal: to reveal temporal variations in videos
> Input: a standard video sequence
> Methodology: apply spatial decomposition, followed by temporal filtering to fix frames
> Result: The resulting signal is amplified to reveal hidden information
> Pros: able to visualize the flow of blood as it fills the face and also to amplify and reveal small motions / can run in real time

### Introduction
In the paper, they show that a combination of spatial and temporal processing of videos can amplify subtle variations that reveal important aspects of the world around us.

#### previous attempts
unveil imperceptible motions in videos
- analyze and amplify subtle motions and visualize deformations that would otherwise be invisible
- propose using the Cartoon Animation Filter to create perceptually appealing motion exaggeration
These approaches follow a Lagrangian perspective (accurate motion estimation, computationally expensive, difficult to make artifact-free)

##### Lagrangian perspective (in fluid dynamics)
The trajectory of particles is tracked overtime
##### Eulerian perspective (in fluid dynamics)
Properties of a voxel of fluid, such as pressure and velocity evolve in time
In their case, they study and amplify the variation of pixel values over time, in a spatially -multiscale manner.
In their Eulerian approach to motion magnification, they do not explicitly estimate motion, but rather exaggerate motion ==by amplifying temporal color changes at fixed positions==.

#### Several contributions
1. demonstrate that nearly invisible changes in a dynamic environment can be revealed through Eulerian spatio-temporal processing of standard monocular video sequences. (suitable for various applications, not required to amplify motion in natural videos, robust and runs in real time)
2. provide an analysis of the link between temporal filtering and spatial motion  (best suited to small displacements and lower spatial frequencies)
3. present a single framework that can be used to amplify both spatial motion and purely temporal changes
4. analytically and empirically compare Eulerian and Lagrangian motion magnification approaches under different noisy conditions
5. 
### How
![[attachments/eulerian-video-magnification-for-revealing-subtle-changes-in-the-world-1778559254861.webp|Overview of the Eulerian video magnification framework]]
1. decomposes the input video sequence into different spatial frequency bands.
2. applies some temporal filter to all bands.
3. The filtered spatial bands are then amplified by a given factor $\alpha$, added back to the original signal, and collapsed to generate the output video.

#### Spatial Decomposition
입력 비디오의 각 프레임을 가우시안 피라미드(Gaussian Pyramid) 또는 라플라시안 피라미드(Laplacian Pyramid)로 분해하여 여러 공간 주파수(Spatial frequency) 대역으로 나눕니다. 미세한 색상 변화를 증폭할 때는 공간적으로 흐리게 만드는 가우시안 피라미드를 활용하고, 외곽선의 움직임을 증폭할 때는 라플라시안 피라미드를 주로 사용합니다.

#### Temporal filtering
Temporal filtering needs to be applied to lower spatial frequencies (spatial pooling) to allow such a subtle input signal to rise above the camera sensor and quantization noise.
Their temporal filtering approach not only amplifies color variation, but can also reveal low-amplitude motion. (brightness constancy, without feature tracking or motion estimation)

분해된 각 픽셀 위치에서 시간 축을 기준으로 대역통과 필터(Bandpass Filter)를 적용합니다. 예를 들어 심박수를 보고 싶다면 인간의 맥박 범위에 해당하는 주파수 대역(약 $0.4 \sim 4 \text{Hz}$)만을 통과시킵니다.

### Space-time video processing
Their approach combines spatial and temporal processing to emphasize subtle temporal changes in video.
#### decompose
decompose the video sequence into different spatial frequency bands.
These bands might be magnified differently because
- they might exhibit different signal-to-noise ratios
- they might contain spatial frequencies for which the linear approximation used in our motion magnification does not hold
In the latter case, they reduce the amplification for these bands to suppress artifacts.
When ==the goal of spatial processing== is simply to increase temporal signal-to-noise ratio by pooling multiple pixels, we spatially low-pass filter the frames of the video and downsample them for computational efficiency. (In general, they compute a full ==Laplacian pyramid==.)

#### temporal processing
They then perform temporal processing on each spatial band. They consider the time series corresponding to the value of a pixel in a frequency band and apply a bandpass filter to extract the frequency bands of interest.
The temporal processing is uniform for all spatial levels, and for all pixels within each level. They then multiply the extracted bandpassed signal by a magnification factor $\alpha$. (can be specified by the user)

#### Reconstruction
They  add the magnified signal to the original and collapse the spatial pyramid to obtain the final output. Since natural videos are spatially and temporally smooth, and since their filtering is performed uniformly over the pixels, their method implicitly maintains spatiotemporal coherency of the results.

### Eulerian motion magnification
How temporal processing produces motion magnification using an analysis that relies on the first-order Taylor series expansions common in optical flow analyses.
#### First-order motion
To explain the relationship between temporal processing and motion magnification, they consider the simple case of a 1D signal undergoing translational motion. This analysis generalizes directly to locally-translational motion in 2D.
$$I(x,t) = f(x+ \delta (t) )$$
- $I(x,t)$ : the image intensity
- $\delta (t)$ : a displacement function

$$\hat{I}(x,t) = f(x + (1 + \alpha) \delta(t))$$
- $\alpha$ : amplification factor

Assuming the image can be approximated by ==a first-order Taylor series expansion==, they write the image at time $t$, $f(x + \delta (t))$ in a first-order Taylor expansion about $x$, as
$$I(x,t) \approx f(x) + \delta \frac{\partial f(x)}{\partial x}$$

$$B(x,t) = \delta (t) \frac{\partial f(x)}{\partial x}$$
- $B(x,t)$ : the result of applying a broadband temporal band-pass filter to $I(x,t)$ at every position $x$
- $\delta (t)$ : the motion signal (is within the passband of the temporal bandpass filter)

They then amplify that bandpass signal by $\alpha$ and add it back to $I(x,t)$, resulting in the processed signal
$$\tilde{I}(x,t) = I(x,t) + \alpha B(x,t)$$

Combining Eqs above,
$$\tilde{I}(x,t) \approx f(x) + (1 + \alpha) \delta (t) \frac{\partial f(x)}{\partial x}$$
$$\tilde{I}(x,t) \approx f(x + (1 + \alpha) \delta(t))$$
This shows that the processing magnifies motions-the spatial displacement $\delta(t)$ of the local image $f(x)$ at time $t$, has been amplified to a magnitude of $(1 + \alpha)$.

For a low frequency cosine wave and a relatively small displacement, $\delta (t)$, the first-order Taylor series expansion serves as a good approximation for the translated signal at time $t+1$. When boosting the temporal signal by $\alpha$ and adding it back to $I(x,t)$, they approximate that wave translated by $(1+\alpha)\delta$.

$$B(x,t) = \sum_{k} \gamma_{k} \delta_{k}(t) \frac{\partial f(x)}{\partial x}$$
- $\delta_{k}(t)$ : the different temporal spectral components of $\delta_{k}(t)$
  (each of them will be attenuated by the temporal filtering by a factor $\gamma_{k}$)

This temporal frequency dependent attenuation can equivalently be interpreted as a frequency-dependent motion magnification factor, $\alpha_{k} = \gamma_{k}\alpha$, resulting in a motion magnified output,
$$\tilde{I}(x,t) \approx f(x + \sum_k (1 + \alpha_{k}) \delta_k (t))$$
- $\alpha_k$ : the modulation factor in the motion amplification factor
- $\delta_k$ : for each temporal subband of the motion signal

#### Bounds
For quickly changing image functions (high spatial frequencies), $f(x)$, the first-order Taylor series approximations becomes inaccurate for large values of the perturbation, $1 + \alpha \delta(t)$, which increases both with larger magnification $\alpha$ and motion $\delta(t)$. 
$$\tilde{I}(x,t) \approx \hat{I}(x,t) \Rightarrow f(x) + (1 + \alpha) \delta(t) \frac{\partial f(x)}{\partial x} \approx f(x + (1 + \alpha)\delta(t))$$
- $(1 + \alpha) \delta (t) < \frac{\lambda}{8}$ : the guideline, the largest motion amplification factor $\alpha$, compatible with accurate motion magnification of a given video motion $\delta(t)$ and image structure spatial wavelength $\lambda$. 

#### Multiscale analysis
a scale-varying process
use a specified $\alpha$ magnification factor over some desired band of spatial frequencies, then scale back for the high spatial frequencies where amplification would give undesirable artifacts. 
Although areas of high spatial frequencies will be generally amplified less than lower frequencies, they found the resulting videos to contain perceptually appealing magnified motion.

### Results
#### 4 steps
with an input video
1. select a temporal bandpass filter
2. select an amplification factor $\alpha$
3. select a spatial frequency cutoff (specified by spatial wavelength $\lambda_c$) beyond which an attenuated version of $\alpha$ is used.
4. select the form of the attenuation for $\alpha$ (either force $\alpha$ to zero for all $\lambda < \lambda_c$, or linearly scale $\alpha$ down to zero)

### Discussion
#### Sensitivity to noise
The amplitude variation of the signal of interest is often much smaller than the noise inherent in the video. In such cases direct enhancement of the pixel values will not reveal the desired signal. Spatial filtering can be used to enhance these subtle signals. However, if the spatial filter applied is not large enough, the signal of interest will not be revealed. 
Assuming that the noise is zero-mean white and wide-sense stationary with respect to space, it can be shown that spatial low pass filtering reduces the variance of the noise according to the area of the low pass filter.

#### Eulerian vs. Lagrangian Processing
Lagrangian approaches explicitly track motions / work better to enhance motions of fine point features and support larger amplification factors.
Lagrangian process has additional error terms proportional to the spatial characteristics of the noise, $n_x$, due to the explicit estimation of motion. The Eulerian error grows quadratically with $\alpha$, and is more sensitive to high spatial frequencies ($I_{xx}$).
Eulerian magnification would be preferable over Lagrangian magnification for small amplifications and larger noise levels. 
The Lagrangian method is more sensitive to increases in spatial noise while the Eulerian error is hardly affected by it.
While different regularization schemes used for motion estimation may alleviate the Lagrangian error, they did not change the result significantly. In general, their experiments show that for small amplifications the Eulerian approach strikes a better balance between performance and efficiency.

### Conclusion
takes a video as input and exaggerates subtle color changes and imperceptible motions / magnifies temporal color changes using spatio-temporal processing.
