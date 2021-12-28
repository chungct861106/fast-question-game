import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Input,
  Layout,
  Row,
  Form,
  message,
  Spin,
  Breadcrumb,
} from "antd";
import useService from "../api";

const { Content } = Layout;

function Verify() {
  const { token } = useParams();
  const { services } = useService();
  const [form] = Form.useForm();
  const history = useHistory();
  const [state, setState] = useState({ status: "verifying", isLoading: true });
  useEffect(async () => {
    const response = await services.user.Active(token);
    if (response.status === 200) {
      message.success("帳戶驗證成功");
      history.push("/");
      return;
    }
    setState({ status: "failed", isLoading: false });
  }, [token]);
  const handleSubmit = async ({ email }) => {
    const response = await services.user.Resend(email);
    if (response.status === 200) {
      message.success("驗證信已寄出");
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
            返回主頁
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="center-vertical">
        <Spin spinning={state.isLoading}>
          {state.status === "failed" && (
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
                寄出驗證信
              </Button>
            </Form>
          )}
        </Spin>
      </Row>
    </Content>
  );
}
export default Verify;
