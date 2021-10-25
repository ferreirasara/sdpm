import { MonitorOutlined, HourglassOutlined } from "@ant-design/icons";
import { Col, Card, Statistic, notification } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";
import { formatSimulationTime } from "../../../utils/calculations";
import { SimulationStats } from "../../../utils/types";
import { getMessageFromError } from "../../../utils/utils";

export default function GeneralStatistics() {
  const [response, setResponse] = useState<SimulationStats>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("simulationStats")
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

  return <>
    <Col span={10}>
      <Card bordered={false}>
        <Statistic
          title="Total de simulações realizadas"
          value={response?.totalOfSimulations}
          prefix={<MonitorOutlined />}
          suffix={"simulações"}
          loading={loading}
        />
      </Card>
    </Col>
    <Col span={10}>
      <Card bordered={false}>
        <Statistic
          title="Total de tempo gasto nas simulações realizadas"
          value={formatSimulationTime(response?.totalOfTime || 0).simulationTime}
          prefix={<HourglassOutlined />}
          suffix={formatSimulationTime(response?.totalOfTime || 0).suffix}
          loading={loading}
        />
      </Card>
    </Col>
  </>
}