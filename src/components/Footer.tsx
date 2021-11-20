import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

//import logoImg from "../images/Logo_white.png";
//import SimpleLogoImg from "../images/simple_logo_white.png";

const FooterWrap = styled.footer`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  text-align: center;
  z-index: 1000;
  overflow: hidden;

  & .animationBox {
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: center;
    //clip-path: circle();
    background-color: #2c3e50;

    &.mobile {
      & br {
        display: none;
      }
    }
  }

  &.active {
    position: static;
  }
`;

const GridBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &.mobile {
    margin-top: 0.5rem;
  }
`;

const Inner = styled(Box)`
  & p {
    font-size: 14px;
    color: #fff;
  }
  & a {
    font-size: 14px;
    color: #fff;
  }

  &.mobile {
    P {
      font-size: 11px;
    }
  }
`;

const LinkList = styled(Link)`
  color: #fff;
  text-shadow: 0px 0px 4px black;
  & + & {
    margin-left: 1rem;
  }
`;
interface Iplatform {
  isMobile: string;
}

const _ = ({ isMobile }: Iplatform) => {
  const location = useLocation();
  const [mainAction, setMainAction] = useState<boolean>(false);
  const boxRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (location.pathname === "/about") {
      setMainAction(true);
    } else {
      setMainAction(false);
    }
  }, [location.pathname]);

  return (
    <>
      <FooterWrap className={mainAction ? "active" : ""}>
        <Box className={clsx("animationBox", isMobile)} ref={boxRef}>
          <LinkList className={isMobile} to="/">
            {/* !isMobile ? (
              <img src={logoImg} alt="분다 로고" />
            ) : (
              <img src={SimpleLogoImg} alt="분다 로고" />
            ) */}
          </LinkList>
          <GridBox className={isMobile}>
            <Inner className={isMobile}>
              {/* <Typography>
              <Box mr={2} component="span">
                대표 : Jack Lee
              </Box>
              대표 전화 : <a href="tel:01080336920">010-8033-6920</a>
            </Typography> */}
              <Typography>
                Copyright © 2022 nujackpot. 모든 권리 보유.
              </Typography>
            </Inner>
          </GridBox>
        </Box>
      </FooterWrap>
    </>
  );
};

export default _;
