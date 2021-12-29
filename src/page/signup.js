import React from "react";
import { Layout, Input, Form, Row, Button, message, Breadcrumb } from "antd";
import { useHistory } from "react-router-dom";
import useService from "../api";

const { Content } = Layout;

function SignUpPage() {
  const [form] = Form.useForm();
  const { services } = useService();
  const handleSubmit = async (e) => {
    const response = await services.user.Create(e);

    if (response.status === 200) {
      message.success("驗證信已寄出");
      return;
    }
    form.setFields(response.data.data);
  };
  const history = useHistory();
  return (
    <Content>
      <Row className="center-left">
        <Breadcrumb>
          <Breadcrumb.Separator />
          <Breadcrumb.Item onClick={() => history.push("/")}>
            返回登入頁面
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
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
          layout="vertical"
          form={form}
          title="SOLab Login"
          style={{ width: 350 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            label="信箱"
            rules={[
              {
                type: "email",
                message: "信箱格式有誤",
              },
              {
                required: true,
                message: "請輸入你的信箱",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密碼"
            rules={[
              {
                required: true,
                message: "請輸入你的密碼",
              },
              {
                pattern: RegExp("^[a-zA-Z0-9]{3,30}$"),
                message: "輸入數字或英文字母",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passwordconfirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "請輸入上方相同密碼",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("密碼不相同"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="username"
            label="名稱"
            rules={[
              {
                required: true,
                message: "請輸入名稱",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => form.submit()}
          >
            註冊
          </Button>

          <Button
            type="primary"
            style={{ width: "100%", marginTop: 15 }}
            onClick={() => history.push("/")}
          >
            返回登入頁面
          </Button>
        </Form>
      </Row>
    </Content>
  );
}

export default SignUpPage;
