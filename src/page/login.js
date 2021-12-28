import React from "react";
import { Layout, Input, Form, Row, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/user";
import useService from "../api";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const { Content } = Layout;
function LoginPage() {
  const [form] = Form.useForm();
  const { services } = useService();
  const { login } = useUser();
  const handleSubmit = async ({ email, password }) => {
    const response = await services.user.Login({ email, password });
    if (response.status === 200) {
      login(response.data.data);
      history.push("/dashboard");
      return;
    }
    message.error(response.data.data);
  };
  const history = useHistory();
  return (
    <Content>
      <Row className="center-vertical">
        <h1 style={{ textAlign: "center" }}>說說 Lab</h1>
        <img
          src="https://solab-ntu.github.io/rw_common/images/rwsitelogo.png"
          style={{ height: "100px", width: "200px" }}
          alt=""
        />
      </Row>
      <Row className="center-vertical">
        <Form
          form={form}
          layout="vertical"
          style={{ width: 350 }}
          title="說說 Lab"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="信箱"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密碼"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => form.submit()}
          >
            登入
          </Button>

          <Button
            type="primary"
            style={{ width: "100%", marginTop: 15, marginBottom: 15 }}
            onClick={() => history.push("/signup")}
          >
            註冊帳號
          </Button>
          <NavLink to="/remind">我是北七我忘記密碼</NavLink>
        </Form>
      </Row>
    </Content>
  );
}

export default LoginPage;
