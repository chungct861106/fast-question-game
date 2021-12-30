import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "antd";
import useService from "../api";
import { useHistory } from "react-router-dom";
function Dashboard() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [questions, setQuestion] = useState([]);
  const { services } = useService();
  const fetchUser = async () => {
    const response = await services.user.GetUsers();
    if (response.status === 200) setUsers(response.data.data);
  };
  const fetchQuestion = async () => {
    const response = await services.question.GetQuestions();
    if (response.status === 200) setQuestion(response.data.data);
  };
  useEffect(async () => {
    fetchUser();
    fetchQuestion();
  }, []);
  const columns = [
    {
      dataIndex: "username",
      title: "使用者名稱",
    },

    {
      title: "新增題目",
      render: ({ _id, username }) => (
        <Button onClick={() => history.push(`/new/${_id}?text=${username}`)}>
          新增題目
        </Button>
      ),
    },
  ];

  const QAcolumns = [
    {
      title: "使用者名稱",
      width: 180,
      render: ({ user_id }) => user_id.username,
    },
    {
      title: "題目",
      width: 300,
      dataIndex: "title",
    },
    {
      title: "題型",
      width: 300,
      dataIndex: "type",
      render: (type) => (type === "QA" ? "快問快答" : "殘酷二選一"),
    },
    {
      title: "創建時間",
      width: 180,
      render: ({ create_time }) => new Date(create_time).toLocaleString(),
    },

    {
      title: "編輯題目",
      width: 180,
      render: ({ _id, user_id }) => (
        <Button
          onClick={() => history.push(`/edit/${_id}?text=${user_id.username}`)}
        >
          編輯題目
        </Button>
      ),
    },
  ];

  return (
    <Row style={{ height: "100%" }}>
      <Col span={6}>
        <Table
          title={() => <h3>說說仔s</h3>}
          dataSource={users}
          columns={columns}
          scroll={{ y: 700 }}
        />
      </Col>
      <Col offset={1} span={16}>
        <Table
          title={() => <h3>你的說說 List</h3>}
          dataSource={questions}
          columns={QAcolumns}
          scroll={{ y: 700 }}
        />
      </Col>
    </Row>
  );
}
export default Dashboard;
