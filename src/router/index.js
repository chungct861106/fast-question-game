import React from "react";
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Spin } from "antd";
import LoginPage from "../page/login";
import SignUpPage from "../page/signup";
import { useUser } from "../context/user";
import Dashboard from "../page/dashboard";
import Question from "../page/question";
import EditQuestion from "../page/edit";
import Review from "../page/review";
import Verify from "../page/verify";
import Remind from "../page/remider";
const { Content } = Layout;

function LoginRouter() {
  return (
    <>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>
      <Route exact path="/verify/:token">
        <Verify />
      </Route>
      <Route exact path="/remind">
        <Remind />
      </Route>
    </>
  );
}
function GameRouter() {
  return (
    <>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/review">
        <Review />
      </Route>
      <Route exact path="/new/:userID">
        <Question />
      </Route>
      <Route exact path="/edit/:questionID">
        <EditQuestion />
      </Route>
    </>
  );
}
function MyRouter() {
  const { isLogin, logout } = useUser();

  const handleLogout = () => {
    window.location.pathname = "/";
    console.log(window.location);
    logout();
  };
  return (
    <Router>
      <Layout style={{ height: "100%" }}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <NavLink to={isLogin ? "/dashboard" : "/"}>
              <h1 style={{ color: "white" }}>SOLab</h1>
            </NavLink>
          </Menu.Item>
          {isLogin && (
            <>
              <Menu.Item key="2">
                <NavLink to="/dashboard">提問區</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/review">評論區</NavLink>
              </Menu.Item>
              <Menu.Item
                key="4"
                style={{ position: "absolute", right: 0, height: 58 }}
                onClick={handleLogout}
              >
                登出
              </Menu.Item>
            </>
          )}
        </Menu>

        <Content className="center-vertical">
          <Routes>
            {isLogin === false && <LoginRouter />}
            {isLogin === true && <GameRouter />}
            <Route>
              <Spin />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default MyRouter;
