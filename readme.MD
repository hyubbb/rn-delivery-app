
# 소개

---

[클론코딩]

`Expo`, `Zustand`, `Google API` , `Reanimated`를 사용하여 만든 클론코딩앱 입니다.

이 앱을 선택한 이유는 `Reanimated` 를 이용해서 애니메이션을 경험 해 볼 수 있었고, `Zustand` 를 사용 해보기 위해서 클론코딩을 진행하게 되었습니다. 이 어플을 만들면서 `React-native`의 기본적인 형태와 사용 방식에 대해서 조금 더 자세하게 알게 되었습니다.

- GITHUB : [Delivery-app](https://github.com/hyubbb/rn-delivery-app)
- 관련포스팅 : [Bottom-sheet 사용하기](https://velog.io/@hyubbb/bottom-sheet) , [useAnimatedStyle-useSharedValue-withTiming-Animated 사용방법](https://velog.io/@hyubbb/useAnimatedStyle-useSharedValue-withTiming-Animated)

# 스택

---

### React-native, Typescript, Zustand, Expo

![1.webp](https://prod-files-secure.s3.us-west-2.amazonaws.com/71c29658-790c-447e-8748-e4539fd62f66/eea71498-d640-4430-87ee-fd423a52d327/1.webp)

### `Google Api`를 이용한 주소설정 / `Reanimated` 를 이용한 필터기능

![2.webp](https://prod-files-secure.s3.us-west-2.amazonaws.com/71c29658-790c-447e-8748-e4539fd62f66/951684ab-17b8-44ed-8677-4e06b839c116/2.webp)

### `ParallaxScrollView`, `SwipeListView` 를 이용한 디테일 페이지와 주문페이지



# 기능

---

- `GooglePlacesAutocomplete` 를 이용해서 주소를 입력해서 검색가능
- `native-geocoding` 을 이용하여 좌표값을 주소화 하여 현재 위치 저장
- 애니메이션 효과를 주기위해서 `Reanimated` 를 사용해서 필터 기능 사용시에 버튼을 동적으로 생성
    - `useSharedValue` , `withTiming`, `useAnimatedStyle` 을 사용.
- 장바구니에 주문을 담을때, `Haptics`기능을 사용.
- `ParallaxScrollView` 을 이용해서 디테일 페이지에서 상단에 이미지표현
- `Zustand` 를 사용해서 상태관리
    - 장바구니와 현재위치 데이터를 관리하기 위해서 사용.