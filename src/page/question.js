import React, { useEffect } from "react";
import { Form, Row, Breadcrumb, Input, Radio, Button, message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useLocation } from "react-router-dom";
import useService from "../api";

function Question() {
  const { userID } = useParams();
  const { services } = useService();
  const location = useLocation().search;
  const username = new URLSearchParams(location).get("text");
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    form.setFieldsValue({ type: "QA", numbers: 2 });
  }, []);
  const questionType = [
    { label: "快問快答", value: "QA" },
    { label: "殘酷二選一", value: "OP" },
  ];

  const [state, setState] = useState({
    isQA: true,
  });

  const handleSubmit = async (e) => {
    const response = await services.question.Create({ ...e, user_id: userID });
    if (response.status === 200) {
      message.success("提問成功");
      history.push("/dashboard");
    }
  };

  return (
    <Row className="center-vertical">
      <Row className="center-left">
        <Breadcrumb>
          <Breadcrumb.Separator />
          <Breadcrumb.Item onClick={() => history.push("/dashboard")}>
            返回主頁
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="center-vertical">
        <h1 style={{ textAlign: "center" }}>問: {username}</h1>
        <Form form={form} style={{ width: 600 }} onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="題目"
            rules={[{ required: true, message: "輸入題目內容" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" label="選擇">
            <Radio.Group
              optionType="button"
              options={questionType}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  isQA: e.target.value === "QA",
                }))
              }
            />
          </Form.Item>

          {!state.isQA &&
            [1, 2].map((num) => (
              <Form.Item
                label={`選項 ${num}`}
                name={`option${num}`}
                rules={[{ required: true, message: `輸入選項${num}內容` }]}
              >
                <Input />
              </Form.Item>
            ))}
          <Button
            style={{ width: "100%" }}
            type="primary"
            onClick={() => form.submit()}
          >
            提交
          </Button>
        </Form>
      </Row>
    </Row>
  );
}
export default Question;
