import { HistoryOutlined } from "@ant-design/icons";
import { PageHeader, Row } from "antd";
import GeneralStatistics from "./components/GeneralStatistics";
import SimulationsRatingTable from "./components/SimulationsRatingTable";
import SimulationsTable from "./components/SimulationsTable";

export default function AboutAlgorithmsPage() {
  document.title = "Histórico"

  return <>
    <PageHeader
      title={<><HistoryOutlined /> Histórico</>}
      style={{ background: "white" }}
    />
    <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <GeneralStatistics />
    </Row>
    <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <SimulationsTable />
    </Row>
    <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <SimulationsRatingTable />
    </Row>
  </>
}