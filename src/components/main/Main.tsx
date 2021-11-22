import styled from "styled-components";
import { Typography, Box, Container } from "@mui/material";

const Wrap = styled(Container)`
  margin: 0 auto;
  padding: 2rem;
  text-align: left;
  max-height: 100vh;
  overflow-y: auto;

  // 스크롤바
  &::-webkit-scrollbar {
    width: 6px;
  } /* 스크롤 바 */
  &::-webkit-scrollbar-track {
    background-color: "transparent";
  } /* 스크롤 바 밑의 배경 */

  &:hover {
    // 스크롤바
    &::-webkit-scrollbar {
      width: 6px;
    } /* 스크롤 바 */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    } /* 스크롤 바 밑의 배경 */
    &::-webkit-scrollbar-thumb {
      background-color: #e6e6e6;
    } /* 실질적 스크롤 바 */
    &::-webkit-scrollbar-thumb:hover {
      background: #e6e6e6;
    } /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */
    &::-webkit-scrollbar-thumb:active {
      background: #e6e6e6;
    } /* 실질적 스크롤 바를 클릭할 때 */
    &::-webkit-scrollbar-button {
      display: none;
    } /* 스크롤 바 상 하단 버튼 */
  }

  & img {
    max-width: 100%;
  }
`;

const GridBox = styled(Box)`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  grid-template-rows: repeat(5, minmax(50px, auto));
  grid-auto-flow: dense; */
`;
const _ = () => {
  return (
    <>
      <Wrap>
        <GridBox>
          <Box>
            <Typography variant="h4">제목1</Typography>
          </Box>
          <Box>
            <Typography variant="h6">제목3</Typography>
            <Typography>본문</Typography>
          </Box>
          <Box>
            <Typography variant="h5">제목2</Typography>
          </Box>
          <Box>
            <Typography variant="h6">제목3</Typography>
            <Typography>본문</Typography>
          </Box>
        </GridBox>
      </Wrap>
    </>
  );
};

export default _;
