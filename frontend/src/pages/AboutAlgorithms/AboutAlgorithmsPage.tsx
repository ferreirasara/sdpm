import { PageHeader, Row } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = 'Sobre os algoritmos'

  return <>
    <PageHeader
      title={'Sobre os algoritmos'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row style={{ marginBottom: '2px', marginTop: '2px' }}>

    </Row>
  </>
}