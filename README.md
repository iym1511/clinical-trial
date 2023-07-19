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
</br>

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

</br>
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
</br>
> value와 delay를 인자로 받습니다. value는 입력된 값이고 delay는 지연 시간입니다. 기본값으로 300ms으로 설정합니다. </br>
> setTimeout 함수를 사용하여 주어진 지연 시간(delay) 이후에 setDebouncedValue를 호출하여 debouncedValue를 업데이트합니다. </br>
> 반환되는 함수는 이전에 설정된 타이머를 취소하기위해 'clearTimeout' 함수를 사용해서 이전타이머를 초기화 시켜줍니다. 값이 변경될때마다 이전타이머를 취소하고 다시 타이머를 작동시킵니다. </br>
