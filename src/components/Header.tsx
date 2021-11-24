import { useState, useCallback } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemText,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Menu, ExpandMore } from "@mui/icons-material";
import { isEmpty } from "../commons";
import { useTranslation } from "react-i18next";
import { COLOR } from "../commons";

const lngs = {
  en: { nativeName: "en" },
  ko: { nativeName: "ko" },
};

const HeaderWrap = styled(Box)`
  padding-bottom: 50px;
  overflow-y: auto;
  background: #fff;
  height: 100%;

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

  & .inner {
    padding: 1em 0.5em;
    background: #fff;
  }
`;

const Inner = styled(Box)`
  & .MuiAccordion-root {
    box-shadow: none;
  }
`;

const MobileMenuButton = styled(Button)`
  && {
    min-width: auto;
  }
  & svg {
    width: 1.5em;
    height: 1.5em;

    & path {
      fill: #fff;
    }
  }
`;

const MenuList = styled(AccordionSummary)`
  && {
    padding: 12px 16px;
    width: 100%;
    text-align: left;
    color: ${COLOR.dark};
    justify-content: initial;
    background: inherit;
    border-radius: 0;
  }
  & .MuiAccordionSummary-content {
    margin: 0;
  }
  & .MuiAccordionSummary-content > .MuiTypography-root {
    font-size: 14px;
  }
`;

const LinkList = styled(NavLink)`
  && {
    padding: 12px 16px;
    width: 100%;
    display: block;
    text-align: left;
    color: ${COLOR.dark};
    justify-content: initial;
    background: inherit;
    border-radius: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 14px;
  }
`;

interface Iplatform {
  isMobile: string;
}
interface ToggleTypeInterface {
  type: string;
  key: string;
}

const _ = ({ isMobile }: Iplatform) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  // variable
  const toggleDrawer = useCallback(
    (open: boolean) => (event: ToggleTypeInterface) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setMobileMenu(open);
    },
    []
  );

  const mobileLinkClick = useCallback(
    (address: string) => {
      navigate(address);
      toggleDrawer(false);
    },
    [navigate, toggleDrawer]
  );

  // const menuLists: any = [];
  const menuLists: any = t("header", { returnObjects: true });

  return (
    <>
      <HeaderWrap className={isMobile}>
        <Box className={isMobile}>
          <Box className="inner">
            <Link to="/">NUJACKPOT</Link>
          </Box>
        </Box>

        {isMobile === "mobile" ? (
          <>
            <Box>
              <MobileMenuButton onClick={toggleDrawer(true)}>
                <Menu />
              </MobileMenuButton>
            </Box>

            <Drawer
              anchor="right"
              open={mobileMenu}
              onClose={toggleDrawer(false)}
            >
              <Box>
                <List>
                  {!isEmpty(menuLists) &&
                    menuLists.map((props: any, i: number) => (
                      <Box component="li" key={i}>
                        <NavLink
                          to={props.address}
                          onClick={() => {
                            mobileLinkClick(props.address);
                            setMobileMenu(false);
                          }}
                        >
                          <ListItemText primary={props.title} />
                        </NavLink>
                      </Box>
                    ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box>
            <Box component="ul">
              {!isEmpty(menuLists) &&
                menuLists.map((props: any, i: number) => (
                  <Inner key={i}>
                    {props.sub && !isEmpty(props.sub) ? (
                      <Accordion>
                        <MenuList expandIcon={<ExpandMore />}>
                          <Typography>{t(`header.${i}.title`)}</Typography>
                        </MenuList>
                        {props.sub.map((item: any) => (
                          <>
                            <LinkList
                              to={item.address}
                              key={item.address}
                              onClick={() => {
                                mobileLinkClick(item.address);
                                setMobileMenu(false);
                              }}
                            >
                              {item.title}
                            </LinkList>
                          </>
                        ))}
                      </Accordion>
                    ) : (
                      <LinkList
                        to={props.address}
                        onClick={() => {
                          mobileLinkClick(t(`header.${i}.address`));
                          setMobileMenu(false);
                        }}
                      >
                        {t(`header.${i}.title`)}
                      </LinkList>
                    )}
                  </Inner>
                ))}
            </Box>
          </Box>
        )}
        {Object.keys(lngs).map((lng) => (
          <Button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            onClick={() => i18n.changeLanguage(lng)}
            variant="container"
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </HeaderWrap>
    </>
  );
};

export default _;
