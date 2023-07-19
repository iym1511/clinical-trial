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
