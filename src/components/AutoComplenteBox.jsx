import styled from "@emotion/styled";
import { useEffect } from "react";
import { getSession, setSession } from "../utils/sessionStorage";
import useHandlekey from "../Hooks/useHandlekey";

const AutocompleteBox = (props) => {
  const {
    word,
    autocompleteArray,
    isFocused,
    selectedIndex,
  } = props;


  return (
    <AutoCompleteContainer isFocused={isFocused}>
      <ResentWordContainer>
        {/* /세션 스토리지 이용해서 최근 검색어 넣기 ! */}
        {word ? (
          <svg
            viewBox="0 0 16 16"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
          </svg>
        ) : null}
        <p>{word}</p>
      </ResentWordContainer>
      {!word && <SearchState>최근 검색어</SearchState>}
      {word
        ? null
        : getSession()
        ? getSession()
            .slice(0, 5)
            .map((deta, i) => (
              <RecentWordList key={i}>
                <svg
                  viewBox="0 0 16 16"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
                </svg>
                <p>{deta}</p>
              </RecentWordList>
            ))
        : "최근 검색어 없음"}
      {word ? (
        autocompleteArray ? (
          <SearchState>추천 검색어</SearchState>
        ) : (
          ""
        )
      ) : null}
      <div>
        {autocompleteArray?.map((w, i) => (
          <AutoWordBox key={i} selection={i === selectedIndex}>
            <svg
              viewBox="0 0 16 16"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
            </svg>
            <p>{w.sickNm}</p>
          </AutoWordBox>
        ))}
      </div>
    </AutoCompleteContainer>
  );
};

const ResentWordContainer = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  font-size: 13px;
  /* display : ${(props) => (props.isFact ? "" : "none")}; */
  p {
    color: black;
    font-size: 16px;
    font-weight: bolder;
    margin-left: 10px;
  }
  svg {
    margin-left: 10px;
  }
`;

const SearchState = styled.p`
  margin-left: 10px;
  color: gray;
  font-size: 15px;
`;

const AutoCompleteContainer = styled.div`
  opacity: ${(props) => (props.isFocused ? "100" : "0")};
  background-color: white;
  width: 500px;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const AutoWordBox = styled.div`
  background-color: ${(props) => (props.selection ? "#ebebeb" : "transparent")};
  display: flex;
  align-items: center;
  height: 10;
  border-radius: 10px;
  font-weight: bolder;
  svg {
    margin-right: 10px;
    padding-left: 10px;
  }
`;

const RecentWordList = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
  svg {
    margin-right: 10px;
    padding-left: 10px;
  }
`;

export default AutocompleteBox;
