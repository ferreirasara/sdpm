import { PageHeader, Row } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = 'Histórico'

  return <>
    <PageHeader
      title={'Histórico'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row style={{ marginBottom: '2px', marginTop: '2px' }}>

    </Row>
  </>
}