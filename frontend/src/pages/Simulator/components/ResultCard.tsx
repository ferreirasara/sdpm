import { HourglassOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Descriptions, Divider, Statistic } from "antd";
import BarChart from "../../../components/charts/BarChart";
import { SimulationData, SimulationResponse } from "../../../utils/types";
import { formatNumber, formatSimulationTime } from "../../../utils/calculations";
import { pretifyAlgorithmName } from "../../../utils/pretifyStrings";
import DetailsTable from "./DetailsTable";
import PizzaChart from "../../../components/charts/PizzaChart";

export interface ResultCardProps {
  result: SimulationResponse,
  simulationData: SimulationData
}

export default function ResultCard(props: ResultCardProps) {
  const { result, simulationData } = props
  const faultAxis = ["Algoritmo", "Faltas de página"]
  const faultData = result?.algorithmResult?.map(cur => { return { name: pretifyAlgorithmName(cur.name), cont: cur.cont } })
  const timeData = result?.algorithmResult?.map(cur => { return { name: pretifyAlgorithmName(cur.name), cont: cur.simulationTime } }).filter(cur => cur.cont > 0)
  const { simulationTime, suffix } = formatSimulationTime(result?.simulationTotalTime || 0)

  return <>
    <Col span={20}>
      <Card bordered={false}>
        <Statistic
          title="Tempo de simulação"
          value={formatNumber(simulationTime)}
          prefix={<HourglassOutlined />}
          suffix={suffix}
          decimalSeparator=","
          groupSeparator="."
        />
      </Card>
    </Col>
    <Col span={20}>
      <Card bordered={false} title="Total de faltas de página por algoritmo">
        <Descriptions size="small">
          {result?.algorithmResult?.map(cur => <Descriptions.Item label={pretifyAlgorithmName(cur.name)}>{cur.cont}</Descriptions.Item>)}
        </Descriptions>
        <Divider />
        <BarChart suffix={"faltas"} axis={faultAxis} data={faultData || []} />
      </Card>
    </Col>
    {timeData?.length ? <Col span={20}>
      <Card bordered={false} title="Tempo de execução de cada algoritmo (em milisegundos)">
        <Descriptions size="small">
          {result?.algorithmResult?.map(cur => <Descriptions.Item label={pretifyAlgorithmName(cur.name)}>{cur.simulationTime}</Descriptions.Item>)}
        </Descriptions>
        <Divider />
        <PizzaChart suffix={"milisegundos"} data={timeData || []} />
      </Card>
    </Col> : null}
    <Col span={20}>
      <Card bordered={false} title="Dados usados na simulação">
        <Descriptions size="small" labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item label="Tamanho da memória">{simulationData.memorySize}</Descriptions.Item>
          <Descriptions.Item label="Tamanho da fila de páginas">{simulationData.pagesQueueSize}</Descriptions.Item>
          <Descriptions.Item label="Quantidade de páginas">{simulationData.numberOfPages}</Descriptions.Item>
          <Descriptions.Item label="Páginas">{simulationData.pages?.join("|")}</Descriptions.Item>
          <Descriptions.Item label="Fila de páginas">{simulationData.pagesQueue}</Descriptions.Item>
          <Descriptions.Item label="Fila de ações">{simulationData.actionsQueue}</Descriptions.Item>
          <Descriptions.Item label="Estado inicial da memória">{simulationData.memoryInitalState}</Descriptions.Item>
          <Descriptions.Item label="Interrupção do relógio">{simulationData.clockInterruption}</Descriptions.Item>
          <Descriptions.Item label="τ (tau)">{simulationData.tau}</Descriptions.Item>
          <Descriptions.Item label="Algoritmos">{simulationData.algorithms?.map(cur => pretifyAlgorithmName(cur)).join(", ")}</Descriptions.Item>
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