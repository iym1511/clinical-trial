import styled from "@emotion/styled";
import SearchBar from "../components/SearchBar";

const Main = () => {
  return (
    <MainSection>
      <MainTitle>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </MainTitle>
      <SearchBar />
    </MainSection>
  );
};

const MainSection = styled.section`
  background-color: #cae9ff;
  height: 543px;
`;

const MainTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding: 80px;
  font-size: 2.2em;
  line-height: 1.6;
  font-weight: 700;
`;

export default Main;
