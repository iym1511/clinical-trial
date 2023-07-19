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
  console.log(JSON.parse(recentBox));
  return JSON.parse(recentBox);
};
