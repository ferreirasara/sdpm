import { Col, Card } from "antd"
import BarChart from "../../../components/charts/BarChart"
import { algorithmList } from "../../../utils/algorithmList"
import { getRandomInt } from "../../../utils/calculations"

export default function PageFaultsTotalGraph() {
  const axis = ["Algoritmo", "Faltas de página"]
  const data = algorithmList.map(cur => { return { name: cur.label, cont: getRandomInt(100, 1000) } })

  return <Col span={20}>
    <Card bordered={false} title="Total de faltas de página por algoritmo">
      <BarChart axis={axis} data={data} />
    </Card>
  </Col>
}