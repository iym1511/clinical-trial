# 추천 검색창 구현

참고사이트 [한국임상정보](https://clinicaltrialskorea.com/).

</br>

## 구현 목표

 - 질환명 검색시 API호출을 통해 검색어 추천기능 구현
 - API 호출 로컬 캐싱 구현
 - 입력시 마다 API호출이 되지않도록 API호출 수를 줄일수있게 로컬 캐싱
 - 키보드 keyDown,up을 이용해 추천검색어 목록 컨트롤 구현

</br>

## 실행방법

> 1. [서버](https://github.com/walking-sunset/assignment-api) 실행
> 2. npm install
> 3. npm start

</br>

## 의존성
- API : ![Axios](https://img.shields.io/badge/Axios-yellow)
- Style : ![Emotion](https://img.shields.io/badge/Emotion-green)
- Language: ![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white)

## 기능 구현 설명

```jsx
///service/search.js
import { API_STRING, ERROR_MESSAGE } from "../constants/config";
import { getCache, setCache } from "../utils/casheStorage";

import apiClient from "./apiClient";


export const searchAPI = async (q) => {
  const config = {
    params: {
      q,
    },
  };

  const requestUrl = new URLSearchParams(config.params).toString();
  const cachedData = await getCache(requestUrl);

  // 검색을위해 받아온 인자값이 없으면 빈배열 반환
  if (config.params.q === "") return [];

  // 캐싱된 데이터가 있으면 데이터 json화
  if (cachedData) return cachedData.json();

  try {
    const { data } = await apiClient.get(API_STRING, config);
    console.info("calling api");
    // API 호출에 사용된 검색어를 식별후 캐시 저장
    setCache(requestUrl, data);
    return data;
  } catch (err) {
    alert(ERROR_MESSAGE);
  }
};
```

> params로 받아온 인자값이 없으면 빈배열을 반환해주고 <br/>
> cachedData(캐싱데이터) 가 있으면 캐싱되어있는 데이터를 반환한다. <br/>
> 둘중 어떠한것도 속하지 않는다면 api에서 호출한 데이터를 반환하고, <br/>
> setCache에 검색된 데이터를 저장한다. <br/>

</br>

```jsx
///utils/casheStorage.js
export const setCache = async (url, data) => {
  const cache = await caches.open("cacheStorage");
  const responseData = new Response(JSON.stringify(data));
  cache.put(url, responseData);
};

export const getCache = async (url) => {
  const cache = await caches.open("cacheStorage");
  const cachedData = await cache.match(url);
  return cachedData;
};
```

#### setCache
> setCache에서 인자로 받아온 값들을 저장할 'cacheStorage'라는 캐시 스토리지를 엽니다. <br/>
> new Response(JSON.stringify(data))를 사용하여 데이터를 JSON 형식으로 변환한 후, <br/>
> Response 객체로 감싸서 responseData를 생성합니다. <br/>
> cache.put(url, responseData)를 호출하여 주어진 URL과 responseData를 캐시에 저장합니다. <br/>

</br>

#### getCache
> 먼저 caches.open("cacheStorage")를 사용하여 cacheStorage라는 캐시 스토리지를 엽니다. <br/>
> cache.match(url)을 호출하여 주어진 URL과 일치하는 캐시 데이터를 찾습니다. <br/>
> 찾은 캐시 데이터를 반환합니다. <br/>

</br>

## useDebounce 를 사용하여 함수 지연시키기
Debounce 는 입력 주기가 끝나면, 즉 사용자의 입력이 끝난 후 api 값을 가져오는 것입니다.

</br>

```jsx
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

> value와 delay를 인자로 받습니다. value는 입력된 값이고 delay는 지연 시간입니다. 기본값으로 300ms으로 설정합니다. </br>
> setTimeout 함수를 사용하여 주어진 지연 시간(delay) 이후에 setDebouncedValue를 호출하여 debouncedValue를 업데이트합니다. </br>
> 반환되는 함수는 이전에 설정된 타이머를 취소하기위해 'clearTimeout' 함수를 사용해서 이전타이머를 초기화 시켜줍니다. 값이 변경될때마다 이전타이머를 취소하고 다시 타이머를 작동시킵니다. </br>

</br>

## KeyboardEvent.key 로 추천검색어 이동
```jsx
  ///components/AutoComplenteBox.jsx

    useEffect(() => {
      window.addEventListener("keydown", handleKeyEvent);
      return () => {
        window.removeEventListener("keydown", handleKeyEvent);
      };
    });

    const handleKeyEvent = (e) => {
      // api 에서 받아온 검색결과 길이
    const autoLength = autocompleteArray?.length;
    if (!isFocused) return;
    if (e.isComposing) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const nextIndex = Math.min(prev + 1, autoLength - 1);
        // index값을 비교하여 중복되면 현재값 아니면 다음값 반환
        return prev === nextIndex ? prev : nextIndex;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const nextIndex = Math.max(prev - 1, 0);
        return prev === nextIndex ? prev : nextIndex;
      });
    }
    if (e.key === "Enter") {
      autocompleteArray?.forEach((a, i) => {
        if (i === selectedIndex) {
          return setSession(a.sickNm);
        }
      });
    }
  };
```
#### e.key값이 ArrowDown이거나 ArrowUp일때.
> e.preventDefault()를 호출하여 기본 동작을 막습니다. 예를 들어, 화살표 키를 눌렀을 때 페이지 스크롤 등의 기본 동작을 방지합니다. </br>
> setSelectedIndex를 사용하여 이전 selectedIndex 값을 기반으로 새로운 인덱스 값을 설정합니다. </br>
> 중복되는 인덱스 값을 방지하기 위해 prev와 nextIndex 값을 비교하여 같은 경우에는 이전 값을 반환하고, 다른 경우에는 다음 값을 반환합니다.

</br>
![화면 기록 2023-07-19 오후 9 47 26](https://github.com/iym1511/clinical-trial/assets/102650332/fe451165-1586-4e2f-abee-a43df15fe493)