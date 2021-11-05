import { Col, Card, Table, notification } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";
import { formatSimulationTime } from "../../../utils/calculations";
import { formatDateHour } from "../../../utils/pretifyStrings";
import { SimulationHistory } from "../../../utils/types";
import { getMessageFromError } from "../../../utils/utils";

export default function SimulationsTable() {
  const [response, setResponse] = useState<SimulationHistory>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("simulationHistory")
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
      dataIndex: "simulationDate",
      key: "simulationDate",
      render: (date: Date) => formatDateHour(date)
    },
    {
      title: "Tempo de simulação",
      dataIndex: "simulationTime",
      key: "simulationTime",
      render: (simulationTime: number) => `${formatSimulationTime(simulationTime).simulationTime} ${formatSimulationTime(simulationTime).suffix}`,
    },
    {
      title: "Input",
      children: [
        {
          title: "Tamanho da memória",
          dataIndex: "memorySize",
          key: "memorySize",
        },
        {
          title: "Tamanho da fila de processos",
          dataIndex: "pagesQueueSize",
          key: "pagesQueueSize",
        },
      ]
    },
    {
      title: "Resultado",
      children: [
        {
          title: "Algoritmo Ótimo",
          dataIndex: "optimalAlgorithm",
          key: "optimalAlgorithm",
          render: (faults: number) => faults ? `${faults} faltas` : "",
        },
        {
          title: "Algoritmo FIFO",
          dataIndex: "fifoAlgorithm",
          key: "fifoAlgorithm",
          render: (faults: number) => faults ? `${faults} faltas` : "",
        },
        {
          title: "Algoritmo Segunda Chance",
          dataIndex: "secondChanceAlgorithm",
          key: "secondChanceAlgorithm",
          render: (faults: number) => faults ? `${faults} faltas` : "",
        },
        {
          title: "Algoritmo LRU",
          dataIndex: "lruAlgorithm",
          key: "lruAlgorithm",
          render: (faults: number) => faults ? `${faults} faltas` : "",
        },
        {
          title: "Algoritmo NRU",
          dataIndex: "nruAlgorithm",
          key: "nruAlgorithm",
          render: (faults: number) => faults ? `${faults} faltas` : "",
        },
        {
          title: "Algoritmo WS-Clock",
          dataIndex: "wsClockAlgorithm",
          key: "wsClockAlgorithm",
          render: (faults: number) => faults ? `${faults} faltas` : "",
        },
      ]
    },
  ];

  return <Col span={20}>
    <Card bordered={false} title="30 últimas simulações">
      <Table dataSource={response?.data} columns={columns} size="small" loading={loading} bordered />
    </Card>
  </Col>
}