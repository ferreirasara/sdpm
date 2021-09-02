import { HourglassOutlined } from "@ant-design/icons";
import { Card, Col, Statistic } from "antd";
import BarChart from "../../../components/charts/BarChart";
import { SimuationResponse } from "../../../utils/types";
import { formatNumber } from "../../../utils/calculations";

export interface ResultCardProps {
  result: SimuationResponse,
}

export default function ResultCard(props: ResultCardProps) {
  const { result } = props
  const axis = ['Algoritmo', 'Faltas de página']
  const data = result?.faultsPerAlgorithm?.map(cur => { return { name: cur.name, cont: cur.cont } })
  console.log({result, data})

  return <>
    <Col span={20}>
      <Card bordered={false}>
        <Statistic
          title="Tempo de simulação"
          value={formatNumber(result.simulationTime / 60000)}
          prefix={<HourglassOutlined />}
          suffix={'minutos'}
        />
      </Card>
    </Col>
    <Col span={20}>
      <Card bordered={false} title="Total de faltas de página por algoritmo">
        <BarChart axis={axis} data={data} />
      </Card>
    </Col>

  </>
}