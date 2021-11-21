import { useState, useCallback } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ExpandMore } from "@mui/icons-material";
import { isEmpty } from "../commons";

const navItems = {
  menuList: [
    { title: "홈", address: "/" },
    {
      title: "상품관리",
      address: "/product",
      sub: [
        { title: "상품 메뉴1", address: "/product/menu1" },
        { title: "상품 메뉴2", address: "/product/menu2" },
        { title: "상품 메뉴3", address: "/product/menu3" },
      ],
    },
    {
      title: "주문관리",
      address: "/order",
      sub: [
        { title: "주문 메뉴1", address: "/order/menu1" },
        { title: "주문 메뉴2", address: "/order/menu2" },
      ],
    },
    { title: "정산관리", address: "/settlement" },
    { title: "판매자 정보", address: "/seller" },
    { title: "문의", address: "/question" },
    { title: "애널리틱스", address: "/analytics" },
    { title: "관리", address: "/setting" },
    { title: "로그인", address: "/login" },
  ],
};

const HeaderWrap = styled(Box)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #999;
  width: 300px;

  & .inner {
    padding: 1em 0.5em;
    background: #fff;
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
    width: 100%;
    text-align: left;
    color: #000;
    justify-content: initial;
    background: #fff;
    border-radius: 0;
  }
`;

const LinkList = styled(Button)`
  && {
    width: 100%;
    text-align: left;
    color: #000;
    justify-content: initial;
    background: #fff;
    border-radius: 0;
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
                  {navItems.menuList.map((props, i) => (
                    <Box component="li" key={i}>
                      <ListItem
                        button
                        onClick={() => {
                          mobileLinkClick(props.address);
                          setMobileMenu(false);
                        }}
                      >
                        <ListItemText primary={props.title} />
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box>
            <Box component="ul">
              {navItems.menuList.map((props, i) => (
                <Box key={i}>
                  {props.sub && !isEmpty(props.sub) ? (
                    <Accordion>
                      <MenuList expandIcon={<ExpandMore />}>
                        <Typography>{props.title}</Typography>
                      </MenuList>
                      {props.sub.map((a) => (
                        <LinkList
                          key={a.address}
                          onClick={() => {
                            mobileLinkClick(a.address);
                            setMobileMenu(false);
                          }}
                        >
                          {a.title}
                        </LinkList>
                      ))}
                    </Accordion>
                  ) : (
                    <LinkList
                      onClick={() => {
                        mobileLinkClick(props.address);
                        setMobileMenu(false);
                      }}
                    >
                      {props.title}
                    </LinkList>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          /* <Box>
            <Box* component="ul">
              {navItems.menuList.map((props, i) => (
                <Box component="li" key={i}>
                  <LinkList to={props.address}>{props.title}</LinkList>
                </Box>
              ))}
            </Box*/
        )}
      </HeaderWrap>
    </>
  );
};

export default _;
