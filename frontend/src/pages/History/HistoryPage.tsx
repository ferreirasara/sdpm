import { HourglassOutlined, MonitorOutlined } from "@ant-design/icons";
import { Card, Col, PageHeader, Row, Statistic, Table } from "antd";
import BarChart from "../../components/charts/BarChart";
import { formatDate } from "../../utils/pretifyStrings";

function GeneralStatistics() {
  return <>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title="Total de simulações realizadas"
          value={152}
          prefix={<MonitorOutlined />}
          suffix={'simulações'}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title="Total de tempo gasto nas simulações realizadas"
          value={3.5}
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
    { name: 'Algoritmo Ótimo', cont: 15 },
    { name: 'FIFO', cont: 35 },
    { name: 'Segunda Chance', cont: 17 },
    { name: 'LRU', cont: 19 },
    { name: 'NRU', cont: 17 },
    { name: 'WS-Clock', cont: 16 },
  ]

  return <Col span={12}>
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
      input: 'teste input',
      optimalAlgorithm: Math.floor(Math.random() * 10),
      fifoAlgorithm: Math.floor(Math.random() * 10),
      secondChanceAlgorithm: Math.floor(Math.random() * 10),
      lruAlgorithm: Math.floor(Math.random() * 10),
      nruAlgorithm: Math.floor(Math.random() * 10),
      wsClockAlgorithm: Math.floor(Math.random() * 10),
    });
  }

  const columns = [
    { title: 'Data', dataIndex: 'date', key: 'date', render: (date: Date) => formatDate(date) },
    { title: 'Input', dataIndex: 'input', key: 'input', },
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

  return <Col span={12}>
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