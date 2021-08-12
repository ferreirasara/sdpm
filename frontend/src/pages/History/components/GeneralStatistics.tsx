import { MonitorOutlined, HourglassOutlined } from "@ant-design/icons";
import { Col, Card, Statistic } from "antd";
import { getRandomInt } from "../../../utils/calculations";

export default function GeneralStatistics() {
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