import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Breadcrumb,
  Input,
  Radio,
  Spin,
  Button,
  Col,
  message,
} from "antd";
import { useParams, useHistory, useLocation } from "react-router-dom";
import useService from "../api";

function EditQuestion() {
  const { questionID } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();
  const { services } = useService();
  const questionType = [
    { label: "快問快答", value: "QA" },
    { label: "殘酷二選一", value: "OP" },
  ];
  const location = useLocation().search;
  const username = new URLSearchParams(location).get("text");
  const [state, setState] = useState({
    isLoading: true,
    isQA: true,
  });
  useEffect(async () => {
    const response = await services.question.GetQuestions({
      question_id: questionID,
    });
    if (response.status === 200) {
      form.setFieldsValue(response.data.data);
      setState({ isLoading: false, isQA: response.data.data.type === "QA" });
    }
  }, []);

  const handleUpdate = async (e) => {
    const response = await services.question.Update({
      ...e,
      question_id: questionID,
    });
    if (response.status === 200) {
      message.success("編輯成功");
      history.push("/dashboard");
    }
  };
  const handleDelete = async (e) => {
    const response = await services.question.Delete({
      question_id: questionID,
    });
    if (response.status === 200) {
      message.info("提問已刪除");
      history.push("/dashboard");
    }
  };

  return (
    <Row className="center-vertical">
      <Spin spinning={state.isLoading}>
        <Row className="center-left">
          <Breadcrumb>
            <Breadcrumb.Separator />
            <Breadcrumb.Item onClick={() => history.push("/")}>
              返回主頁
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="center-vertical">
          <h1 style={{ textAlign: "center" }}>問: {username}</h1>
          <Form form={form} style={{ width: 600 }} onFinish={handleUpdate}>
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
            <Row>
              <Col span={11}>
                <Button
                  type="primary"
                  onClick={() => form.submit()}
                  style={{ width: "100%" }}
                >
                  提交
                </Button>
              </Col>
              <Col offset={2} span={11}>
                <Button
                  type="primary"
                  onClick={handleDelete}
                  style={{ width: "100%" }}
                  danger
                >
                  刪除
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Spin>
    </Row>
  );
}
export default EditQuestion;
