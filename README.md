# 추천 검색창 구현

참고사이트 [한국임상정보](https://clinicaltrialskorea.com/).

## 구현 목표

 - 질환명 검색시 API호출을 통해 검색어 추천기능 구현
 - API 호출 로컬 캐싱 구현
 - 입력시 마다 API호출이 되지않도록 API호출 수를 줄일수있게 로컬 캐싱
 - 키보드 keyDown,up을 이용해 추천검색어 목록 컨트롤 구현

## 실행방법

> 1. [서버](https://github.com/walking-sunset/assignment-api) 실행
> 2. npm install
> 3. npm start

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

api호출 후 getCache르

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
