---
type: Algorithm
aliases:
  - RANSAC
tags:
  - Study/Math/Statistics
status: Done

---
### Reference
- [RANSAC의 이해와 영상처리 활용](https://darkpgmr.tistory.com/61)
- [RANSAC 알고리즘 원리](https://gnaseel.tistory.com/33#google_vignette)
- [RANSAC에 관한 전반적인 내용 (Outlier, PROSAC 등 다양한 정보가 포함되어 있음)](https://cvlearnblog.notion.site/Outlier-Robust-Estimation-1-RANSAC-82e8aefaa56e493cb324ad752f9242f6)
- [Performance Evaluation of RANSAC Family 논문](https://ksp.etri.re.kr/ksp/article/file/47187.pdf)

> [!abstract] 
> ![[attachments/pasted-image-20260104182054.png|Figure1. 최소제곱법 결과1|300]]![[attachments/pasted-image-20260104182138.png|Figure2. 최소제곱법 결과2|300]]
> 기존의 ==최소제곱법 (Least Square)== 는 모든 데이터를 고려하여 오차를 줄이려 함.
하지만 데이터에 엉뚱한 값 (노이즈나 이상치, outlier) 이 하나만 섞여 있어도 모델이 크게 왜곡됨.
포인트 클라우드에는 센서 노이즈나 잘못 매칭된 특징점들이 매우 많은데 모든 매칭 결과를 다 믿고 계산하면 잘못된 매칭 하나 때문에 합쳐진 결과가 엉뚱한 곳으로 날라가 버림.
하지만 ==RANSAC(Random Sample Consensus)== 는 데이터셋 중에서 이상치 (outlier) 가 포함되어 있어도, 이를 무시하고 정상치 (inlier) 만을 이용해서 모델의 parameter 를 예측하는 강력한 알고리즘입니다

#### Advantages
- Robust Estimation: outlier 가 약 50% 가 넘는 상황이어도 최소한의 샘플 (inliers) 만 잘 뽑히면 완벽한 모델을 찾을 수 있음.
- 알고리즘 구조가 단순하여 구현하기 쉬움: 여러곳에서 사용됨.
![[attachments/pasted-image-20260104200604.png|Figure3. RANSAC 결과|400]]
#### Algorithm
1. 무작위 샘플링: 데이터 중 모델을 정의하는 데 필요한 최소한의 개수만 무작위로 뽑습니다.
2. 모델 생성: 선택한 샘플들을 바탕으로 가설 모델을 만듭니다.
3. 데이터 검증: 전체 데이터 중 이 가설 모델에 부합하는 데이터 (정상치) 가 몇 개인지 계산합니다. 이때 모델과 점 사이의 거리가 임계값 (Threshold) 이내면 정상치로 간주합니다.
4. 반복: 1~3 과정을 정해진 횟수만큼 반복합니다.
5. 최종 모델 선책: 정상치의 개수가 가장 많았던 모델을 최종 모델로 선택합니다.

##### Major Parameters
- Threshold ($t$): 어떤 데이터를 정상치로 볼 것인지 결정하는 거리 기준 (임계치).
- Iteration ($N$): 몇번이나 무작위로 뽑아볼 것인가입니다. 반복 횟수.
- Minimum Inliers ($d$): 모델이 유효하다고 판단하기 위한 최소한의 정상치 개수

#### Mathematical Expression
$$N=\frac{log(1-P)}{log(1-w^s)}$$
$$P=1-(1-w^s)^N$$

- $P$: 성공 확률 (보통 99.99% 이상)
- $w$: 전체 데이터 중 정상치의 비율
- $s$: 모델을 만드는 데 필요한 샘플의 수

#### Limitations
- Non-deterministic: RANSAC 은 무작위로 샘플을 뽑기 때문에, 매번 실행할 때마다 결과가 조금씩 달라질 수 있음. 항상 같은 결과를 보장하지 못함.
- 계산 비용의 기하급수적 증가: 만약 outlier 의 비율이 inlier 보다 높다면 운좋게 inlier 만 뽑을 확률이 낮아지고 이 경우에는 원하는 확률적 신뢰도에 도달하기 위해서는 반복 횟수를 엄청나게 늘려야 함.
- Threshold 설정의 어려움: 어디까지를 inlier 로 볼것인가 를 결정하는 임계값이 매우 민감.
- Structured Outliers: RANSAC 은 outlier 가 아무런 규칙이 없는 노이즈라고 가정.
- 데이터가 밀집되어 있는 경우 반응이 미흡 ![[attachments/pasted-image-20260107161821.png|Figure 5. Loss Functions]]RANSAC 의 경우는 에러가 Threshold 이하일 때 loss 가 0 임.
  RANSAC 은 inlier 아니면 outlier 이라는 이분법적인 논리를 사용 (0 or 1).
  만약 데이터가 특정 구역에 아주 빽빽하게 밀집되어 있다면, 실제 inlier 가 아닌 것도 inlier 에 포함시킬 수 있음.
  알고리즘이 전체적인 구조를 보지 못하고, 점들이 몰려 있는 특정 구역의 잘못된 논리에 빠지기 쉬움.
  결과적으로 "오차가 0인 모델" 이나 "겨우 문 닫고 들어온 모델" 이나 정상치 개수가 같으므로 어느 것이 더 좋은 모델인지 구분하지 못하고 아무거나 선택하게 됨.
  이것을 해결하기 위해 다양한 기법 (Bucketing, Guided Sampling) 과 [[mlesac]] 등 이 나옴.

![[attachments/pasted-image-20260112094108.png|Figure 6. Flowchart of RANSAC|500]]
![[attachments/pasted-image-20260112094219.png|Figure 7. RANSAC Family]]
##### Modern RANSAC
- [[prosac|PROSAC]]
- [[mlesac|MLESAC]]
- MAGSAC
- LO-RANSAC
- DEGENSAC

