import { HourglassOutlined } from "@ant-design/icons";
import { Alert, Card, Col, Collapse, Descriptions, Statistic } from "antd";
import BarChart from "../../../components/charts/BarChart";
import { SimulationData, SimulationResponse } from "../../../utils/types";
import { formatNumber, formatSimulationTime } from "../../../utils/calculations";
import { pretifyAlgorithmName } from "../../../utils/pretifyStrings";
import DetailsTable from "./DetailsTable";

export interface ResultCardProps {
  result: SimulationResponse,
  simulationData: SimulationData
}

export default function ResultCard(props: ResultCardProps) {
  const { result, simulationData } = props
  const axis = ['Algoritmo', 'Faltas de página']
  const chartData = result?.algorithmResult?.map(cur => { return { name: pretifyAlgorithmName(cur.name), cont: cur.cont } })
  const { simulationTime, suffix } = formatSimulationTime(result?.simulationTime || 0)

  return <>
    <Col span={20}>
      <Card bordered={false}>
        <Statistic
          title="Tempo de simulação"
          value={formatNumber(simulationTime)}
          prefix={<HourglassOutlined />}
          suffix={suffix}
        />
      </Card>
    </Col>
    <Col span={20}>
      <Card bordered={false} title="Total de faltas de página por algoritmo">
        <BarChart axis={axis} data={chartData || []} />
      </Card>
    </Col>
    <Col span={20}>
      <Card bordered={false} title="Dados usados na simulação">
        <Descriptions size='small' labelStyle={{ fontWeight: 'bold' }}>
          <Descriptions.Item label="Tamanho da memória">{simulationData.memorySize}</Descriptions.Item>
          <Descriptions.Item label="Tamanho da fila de páginas">{simulationData.pagesQueueSize}</Descriptions.Item>
          <Descriptions.Item label="Quantidade de páginas">{simulationData.numberOfPages}</Descriptions.Item>
          <Descriptions.Item label="Páginas">{simulationData.pages?.join('|')}</Descriptions.Item>
          <Descriptions.Item label="Fila de páginas">{simulationData.pagesQueue}</Descriptions.Item>
          <Descriptions.Item label="Fila de ações">{simulationData.actionsQueue}</Descriptions.Item>
          <Descriptions.Item label="Estado inicial da memória">{simulationData.memoryInitalState}</Descriptions.Item>
          <Descriptions.Item label="Interrupção do relógio">{simulationData.clockInterruption}</Descriptions.Item>
          <Descriptions.Item label="τ (tau)">{simulationData.tau}</Descriptions.Item>
          <Descriptions.Item label="Algoritmos">{simulationData.algorithms?.map(cur => pretifyAlgorithmName(cur)).join(', ')}</Descriptions.Item>
        </Descriptions>
      </Card>
      {result?.shouldShowDetails ? <Card bordered={false} title="Detalhamento da execução dos algoritmos">
        <Collapse accordion ghost >
          {result?.algorithmResult?.map((cur, i) => <Collapse.Panel header={pretifyAlgorithmName(cur.name)} key={i} >
            <DetailsTable simulationExecution={cur.simulationExecution} />
          </Collapse.Panel>
          )}
        </Collapse>
      </Card> : null}
    </Col>

  </>
}