import React, { useEffect, useState } from "react";
import { Table, Row, Col, Rate } from "antd";
import useService from "../api";

function Review() {
  const { services } = useService();
  const columns = [
    {
      title: "對象",
      dataIndex: "username",
      width: 150,
    },
    {
      title: "題目",
      width: 300,

      render: (review) => {
        if (review.type === "QA") return review.title;
        else return `${review.title}: 1.${review.option1} 2.${review.option2}`;
      },
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
      title: "評分",
      width: 180,
      render: ({ _id, rate }) => (
        <Rate
          defaultValue={rate}
          onChange={async (rate) => {
            services.question.GiveRate({ question_id: _id, rate });
          }}
        />
      ),
    },
    {
      title: "總評",
      dataIndex: "avarage",
      width: 50,
    },
  ];
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(async () => {
    const response = await services.question.GetReviews();
    if (response.status === 200) {
      setReviews(response.data.data);
      setLoading(false);
    }
  }, []);

  return (
    <Row>
      <Col span={23}>
        <Table
          title={() => <h2>評論區</h2>}
          loading={isLoading}
          dataSource={reviews}
          columns={columns}
          scroll={{ y: 400 }}
        />
      </Col>
    </Row>
  );
}
export default Review;
