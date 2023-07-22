export const setSession = (keyWord) => {
  if (keyWord === "") return;

  const sessionRecentBox = sessionStorage.getItem("recentlyKeywords");
  const parsedSessionRecentBox = JSON.parse(sessionRecentBox);

  if (!sessionRecentBox) {
    sessionStorage.setItem("recentlyKeywords", JSON.stringify([keyWord]));
  } else {
      parsedSessionRecentBox.unshift(keyWord);
      sessionStorage.setItem("recentlyKeywords", JSON.stringify(parsedSessionRecentBox));
  }
};

export const getSession = () => {
  const recentBox = sessionStorage.getItem("recentlyKeywords");
  return JSON.parse(recentBox); 
};


// JSON.stringfy
// javascript 객체나 배열을 JSON형태로 변환

// JSON.parse
// JSON 문자열을 javascript객체나 배열로 변환
