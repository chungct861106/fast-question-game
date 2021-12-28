import React from "react";

import { Button, Input, Layout, Row, Form, message, Breadcrumb } from "antd";
import useService from "../api";
import { useHistory } from "react-router-dom";

const { Content } = Layout;

function Remind() {
  const { services } = useService();
  const [form] = Form.useForm();
  const history = useHistory();
  const handleSubmit = async ({ email }) => {
    const response = await services.user.Remind(email);
    if (response.status === 200) {
      message.success("密碼信已寄出");
      return;
    }
    message.error(response.data.data);
  };
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
        <Form form={form} style={{ width: 350 }} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            label="信箱"
            rules={[
              { required: true, message: "請輸你的信箱" },
              { type: "email", message: "輸入信箱格式錯誤" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            onClick={() => form.submit()}
          >
            提交
          </Button>
        </Form>
      </Row>
    </Content>
  );
}
export default Remind;
