import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import platform from "platform";

import Container from "./Container";
import Main from "./main/Main";
import About from "./about/About";
import Login from "./auth/Login";
import SignUp from "./auth/signup/0";
import Findid from "./auth/findid/0";
import Findpassword from "./auth/findpassword/0";

const _ = () => {
  const platformProp = platform && platform.os && platform.os.family;
  const [isMobile, setIsMobile] = useState<string>("");

  useEffect(() => {
    if (platformProp === "iOS" || platformProp === "Android") {
      setIsMobile("mobile");
    }
  }, [platformProp]);

  return (
    <>
      <Router>
        <Container isMobile={isMobile}>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/about" exact>
              <About isMobile={isMobile} />
            </Route>
            <Route path="/login" exact>
              <Login isMobile={isMobile} />
            </Route>
            <Route path="/signup" exact>
              <SignUp isMobile={isMobile} />
            </Route>
            <Route path="/findid" exact>
              <Findid />
            </Route>
            <Route path="/findpassword" exact>
              <Findpassword />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default _;
