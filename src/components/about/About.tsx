import styled from "styled-components";
import { Box, Container } from "@mui/material";

const Wrap = styled(Container)`
  && {
    margin: 0 auto;
    padding: 2rem;
    max-width: none;
    max-height: 100vh;
    text-align: left;
    overflow-y: auto;
    text-align: center;
  }

  &.mobile {
    padding: 1rem;
  }

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

const MainBox = styled(Box)`
  position: relative;
  height: 100%;
  z-index: 2;
`;

const ParallaxArea = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

interface ContainerInterface {
  isMobile: string;
}

const _ = ({ isMobile }: ContainerInterface) => {
  return (
    <>
      <Wrap className={isMobile}>
        <MainBox></MainBox>
        <ParallaxArea></ParallaxArea>
      </Wrap>
    </>
  );
};

export default _;
