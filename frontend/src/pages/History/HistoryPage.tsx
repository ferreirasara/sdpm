import { PageHeader, Row } from "antd";
import GeneralStatistics from "./components/GeneralStatistics";
import PageFaultsTotalGraph from "./components/PageFaultsTotalGraph";
import SimulationsTable from "./components/SimulationsTable";

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