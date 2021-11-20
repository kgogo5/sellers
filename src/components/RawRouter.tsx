import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About isMobile={isMobile} />} />
            <Route path="/login" element={<Login isMobile={isMobile} />} />
            <Route path="/signup" element={<SignUp isMobile={isMobile} />} />
            <Route path="/findid" element={<Findid />} />
            <Route path="/findpassword" element={<Findpassword />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default _;
