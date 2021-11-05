import { Card, Col, notification, Rate, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";
import { formatDateHour } from "../../../utils/pretifyStrings";
import { SimulationsRating } from "../../../utils/types";
import { getMessageFromError } from "../../../utils/utils";

export default function SimulationsRatingTable() {
  const [response, setResponse] = useState<SimulationsRating>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("simulationRatingStats")
      .then(response => {
        setResponse(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        notification.open({
          message: "Ocorreu um erro ao consultar os dados.",
          description: `Erro: ${getMessageFromError(error)}`,
          type: "error"
        })
      });
  }, []);

  const columns = [
    {
      title: "Data",
      dataIndex: "ratingDate",
      key: "ratingDate",
      render: (date: Date) => formatDateHour(date)
    },
    {
      title: "Avaliação",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Comentário",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return <Col span={20}>
    <Card bordered={false} title="30 últimas avaliações">
      <Table dataSource={response?.data} columns={columns} size="small" loading={loading} bordered />
    </Card>
  </Col>
}