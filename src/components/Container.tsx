import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Box, IconButton, Drawer } from "@mui/material";
import GlobalStyle from "../styles/common";
import { ThemeProvider } from "@mui/material/styles";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import clsx from "clsx";

import theme from "../theme";
import Header from "./Header";
import Footer from "./Footer";

const ContainerWrap = styled(Box)`
  && {
    position: relative;
    max-width: none;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background: #aeaeae;
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
    height: 100%;
    display: flex;
    align-items: stretch;
    text-align: left;
  }

  .drawer.active {
    width: 0;
  }
`;

const HeaderHideButton = styled(IconButton)`
  && {
    position: absolute;
    top: 10px;
    left: 240px;
    margin: 0;
    padding: 0;
    width: 12px;
    height: 160px;
    background: #fff;
    transition: 0.2s;
    border-radius: 0 5px 5px 0;

    svg {
      width: 12px;
      height: auto;
    }
  }
  &.active {
    left: 0;
  }
`;

const Cotents = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: 1s;
`;

interface ContainerInterface {
  children: JSX.Element;
  isMobile: string;
}

const drawerWidth = 240;

const _ = ({ children, isMobile }: ContainerInterface) => {
  const location = useLocation();
  const [mainAction, setMainAction] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerActive = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

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
          <HeaderHideButton
            aria-label="open drawer"
            onClick={handleDrawerActive}
            edge="start"
            className={open ? "" : "active"}
          >
            {open ? <ArrowBackIosNew /> : <ArrowForwardIos />}
          </HeaderHideButton>
          <Drawer
            className={clsx("drawer", open ? "" : "active")}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <Header isMobile={isMobile} />
          </Drawer>
          <Cotents>
            <Box component="main">{children}</Box>
            <Footer isMobile={isMobile} />
          </Cotents>
        </ContainerWrap>
      </ThemeProvider>
    </>
  );
};

export default _;
