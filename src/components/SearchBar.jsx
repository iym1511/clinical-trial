import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { setSession } from "../utils/sessionStorage";
import useDebounce from "../Hooks/useDebounce";
import { searchAPI } from "../service/search";
import AutocompleteBox from "./AutoComplenteBox";
import useHandlekey from "../Hooks/useHandlekey";

const SearchBar = () => {
  
  const {
    setAutocompleteArray,
    setIsFocused,
    setSelectedIndex,
    selectedIndex,
    isFocused,
    autocompleteArray,
  } = useHandlekey();

  const [word, setWord] = useState("");
  const debouncedText = useDebounce(word);

  useEffect(() => {
    // 즉시 실행 함수
    (async () => {
      const newAutocompleteArray = await searchAPI(
        debouncedText.trim().toLowerCase()
      );
      setAutocompleteArray(newAutocompleteArray.slice(0, 7));
    })();
    setSelectedIndex(0);
  }, [debouncedText]);

  const changeWord = (e) => {
    setWord(e.target.value);
  };

  const AutoBox = () => {
    setIsFocused((prev) => !prev);
  };

  const searchWord = () => {
    setSession(word);
  };

  const resetInput = () => {
    setWord("");
  };

  return (
    <div>
      <SearchBarContainer
        onFocus={AutoBox}
        onBlur={AutoBox}
        isFocused={isFocused}
      >
        <SearchInput
          type="text"
          onChange={changeWord}
          value={word}
          placeholder="질환명을 입력해 주세요."
        />
        <SearchBarCancleBtn isFocused={isFocused} onClick={resetInput}>
          X
        </SearchBarCancleBtn>
        <SearchInputBox></SearchInputBox>
        <SearchBarButton>
          <svg
            onClick={searchWord}
            viewBox="0 0 16 16"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          <path
            d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"
            fill="#ffffff"
          ></path>
          </svg>
        </SearchBarButton>
      </SearchBarContainer>
      <AutocompleteBox
        word={word}
        autocompleteArray={autocompleteArray}
        isFocused={isFocused}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" fill="#bababa"></path></svg>`;

const SearchInputBox = styled.div`
  font-size: 30x;
`;

const SearchInput = styled.input`
  font-size: 17px;
  outline: none;
  width: 390px;
  height: 30px;
  margin-left: 10px;
  border: none;
  padding-left: 10px;
  ::placeholder {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    padding-left: 35px;
    background-image: url("data:image/svg+xml,${encodeURIComponent(svgCode)}");
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 5px center;
    color: #bababa;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center; /* 추가 */
  margin: auto;
  width: 500px;
  height: 70px;
  border-radius: 42px;
  background-color: white;
  border: ${(props) =>
    props.isFocused ? "2px solid #54a7ff" : "2px solid white"};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  svg {
    cursor: pointer;
    margin: auto;
    width: 20px;
    height: 20px;
  }
`;

const SearchBarCancleBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: ${(props) => (props.isFocused ? "pointer" : "none")};
  color: white;
  margin-right: 10px;
  background-color: ${(props) => (props.isFocused ? "#c9c9c9" : "none")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
`;

const SearchBarButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: #007be9 !important;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

export default SearchBar;
