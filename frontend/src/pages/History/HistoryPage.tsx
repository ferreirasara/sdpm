import { HistoryOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { PageHeader } from '@ant-design/pro-layout';
import GeneralStatistics from "./components/GeneralStatistics";
import SimulationsRatingTable from "./components/SimulationsRatingTable";
import SimulationsTable from "./components/SimulationsTable";

export default function AboutAlgorithmsPage() {
  document.title = "Histórico"

  return <>
    <PageHeader title={<><HistoryOutlined /> Histórico</>} />
    <Row justify="center" style={{ marginBottom: "8px", marginTop: "8px" }}>
      <GeneralStatistics />
    </Row>
    <Row justify="center" style={{ marginBottom: "8px", marginTop: "8px" }}>
      <SimulationsTable />
    </Row>
    <Row justify="center" style={{ marginBottom: "8px", marginTop: "8px" }}>
      <SimulationsRatingTable />
    </Row>
  </>
}