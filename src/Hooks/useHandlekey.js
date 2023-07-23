import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { setSession } from "../utils/sessionStorage";

export default function useHandlekey(value) {
  const [word, setWord] = useState("");
  const [defaultValue, setDefaultValue] = useState();
  const [autocompleteArray, setAutocompleteArray] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  });

  const handleKeyEvent = (e) => {
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
  

  return {
    isFocused,
    selectedIndex,
    autocompleteArray,
    word,
    defaultValue,
    setAutocompleteArray,
    setIsFocused,
    setSelectedIndex,
    setWord,
  };
}
