import { Col, Card, Table } from "antd";
import { algorithmList } from "../../../utils/algorithmList";
import { getRandomInt } from "../../../utils/calculations";
import { formatDateHour } from "../../../utils/pretifyStrings";

export default function SimulationsTable() {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i,
      date: new Date(),
      memoryLenght: getRandomInt(10, 1000),
      proccessQueueLenght: getRandomInt(1000, 10000),
      optimalAlgorithm: getRandomInt(10, 1000),
      fifoAlgorithm: getRandomInt(10, 1000),
      secondChanceAlgorithm: getRandomInt(10, 1000),
      lruAlgorithm: getRandomInt(10, 1000),
      nruAlgorithm: getRandomInt(10, 1000),
      wsClockAlgorithm: getRandomInt(10, 1000),
    });
  }

  const columns = [
    { title: "Data", dataIndex: "date", key: "date", render: (date: Date) => formatDateHour(date) },
    {
      title: "Input",
      children: [
        { title: "Tamanho da memória", dataIndex: "memoryLenght", key: "memoryLenght", },
        { title: "Tamanho da fila de processos", dataIndex: "proccessQueueLenght", key: "proccessQueueLenght", },
      ]
    },
    {
      title: "Resultado",
      children: algorithmList.map(cur => { return { title: cur.label, dataIndex: cur.name, key: cur.name, } })
    },
  ];

  return <Col span={20}>
    <Card bordered={false} title="30 últimas simulações">
      <Table dataSource={data} columns={columns} size="small" />
    </Card>
  </Col>
}