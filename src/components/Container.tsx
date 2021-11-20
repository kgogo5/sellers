import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import GlobalStyle from "../styles/common";
import { ThemeProvider } from "@mui/material/styles";
import clsx from "clsx";

import theme from "../theme";
import Header from "./Header";
import Footer from "./Footer";

const ContainerWrap = styled(Box)`
  && {
    position: relative;
    padding-left: 200px;
    max-width: none;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background: #aeaeae;
    flex-direction: column;
    height: 100%;

    &.mobile {
      padding: 200px 0;
    }

    &.isAbout {
      padding: 200px 0 0;
      display: block;
    }
  }
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    text-align: center;
  }
`;

interface ContainerInterface {
  children: JSX.Element;
  isMobile: string;
}

const _ = ({ children, isMobile }: ContainerInterface) => {
  const location = useLocation();
  const [mainAction, setMainAction] = useState(false);

  useEffect(() => {
    if (location.pathname === "/about") {
      setMainAction(true);
    } else {
      setMainAction(false);
    }
  }, [location.pathname]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContainerWrap className={clsx(isMobile, mainAction ? "isAbout" : "")}>
          <GlobalStyle />
          <Header isMobile={isMobile} />
          <Box component="main">{children}</Box>
          <Footer isMobile={isMobile} />
        </ContainerWrap>
      </ThemeProvider>
    </>
  );
};

export default _;
