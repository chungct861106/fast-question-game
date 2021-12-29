import React, { useEffect, useState } from "react";
import { Row, Form, Input, Button, Card, message, Layout } from "antd";
import useService from "../api";
import { useUser } from "../context/user";
const { Content } = Layout;
function Profile() {
  const { services } = useService();
  const { userInfo, login } = useUser();
  const [changed, setChanged] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(userInfo);
  }, []);
  const handleSubmit = async ({ username }) => {
    const response = await services.user.Update({ username });
    if (response.status === 200) {
      message.success("編輯成功");
      userInfo.username = username;
      login(userInfo);
      setChanged(false);
    }
  };
  return (
    <Content>
      <Row justify="center" align="bottom">
        <Card title="個人資料">
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item label="信箱" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="名稱" name="username">
              <Input
                onChange={(e) => {
                  setChanged(e.target.value !== userInfo.username);
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={() => form.submit()}
              disabled={!changed}
              style={{ width: "100%" }}
            >
              修改
            </Button>
          </Form>
        </Card>
      </Row>
    </Content>
  );
}
export default Profile;
