import { HourglassOutlined, MonitorOutlined } from "@ant-design/icons";
import { Card, Col, PageHeader, Row, Statistic, Table } from "antd";
import BarChart from "../../components/charts/BarChart";
import { formatDateHour } from "../../utils/pretifyStrings";

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * max + min)
}

function GeneralStatistics() {
  return <>
    <Col span={10}>
      <Card bordered={false}>
        <Statistic
          title="Total de simulações realizadas"
          value={getRandomInt(50, 100)}
          prefix={<MonitorOutlined />}
          suffix={'simulações'}
        />
      </Card>
    </Col>
    <Col span={10}>
      <Card bordered={false}>
        <Statistic
          title="Total de tempo gasto nas simulações realizadas"
          value={getRandomInt(0, 10)}
          prefix={<HourglassOutlined />}
          suffix={'horas'}
        />
      </Card>
    </Col>
  </>
}

function PageFaultsTotalGraph() {
  const axis = ['Algoritmo', 'Faltas de página']
  const data = [
    { name: 'Algoritmo Ótimo', cont: getRandomInt(100, 1000) },
    { name: 'FIFO', cont: getRandomInt(100, 1000) },
    { name: 'Segunda Chance', cont: getRandomInt(100, 1000) },
    { name: 'LRU', cont: getRandomInt(100, 1000) },
    { name: 'NRU', cont: getRandomInt(100, 1000) },
    { name: 'WS-Clock', cont: getRandomInt(100, 1000) },
  ]

  return <Col span={20}>
    <Card bordered={false} title="Total de faltas de página por algoritmo">
      <BarChart axis={axis} data={data} />
    </Card>
  </Col>
}

function SimulationsTable() {
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
    { title: 'Data', dataIndex: 'date', key: 'date', render: (date: Date) => formatDateHour(date) },
    { title: 'Input',
      children: [
        { title: 'Tamanho da memória', dataIndex: 'memoryLenght', key: 'memoryLenght', },
        { title: 'Tamanho da fila de processos', dataIndex: 'proccessQueueLenght', key: 'proccessQueueLenght', },
      ]
    },
    {
      title: 'Resultado',
      children: [
        { title: 'Algoritmo Ótimo', dataIndex: 'optimalAlgorithm', key: 'optimalAlgorithm', },
        { title: 'FIFO', dataIndex: 'fifoAlgorithm', key: 'fifoAlgorithm', },
        { title: 'Segunda Chance', dataIndex: 'secondChanceAlgorithm', key: 'secondChanceAlgorithm', },
        { title: 'LRU', dataIndex: 'lruAlgorithm', key: 'lruAlgorithm', },
        { title: 'NRU', dataIndex: 'nruAlgorithm', key: 'nruAlgorithm', },
        { title: 'WS-Clock', dataIndex: 'wsClockAlgorithm', key: 'wsClockAlgorithm', },
      ]
    },
  ];

  return <Col span={20}>
    <Card bordered={false} title="30 últimas simulações">
      <Table dataSource={data} columns={columns} size="small" />
    </Card>
  </Col>
}

export default function AboutAlgorithmsPage() {
  document.title = 'Histórico'

  return <>
    <PageHeader
      title={'Histórico'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <GeneralStatistics />
    </Row>
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <SimulationsTable />
    </Row>
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <PageFaultsTotalGraph />
    </Row>
  </>
}