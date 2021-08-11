import { PageHeader, Row } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = 'Sobre o simulador'

  return <>
    <PageHeader
      title={'Sobre o simulador'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row style={{ marginBottom: '2px', marginTop: '2px' }}>

    </Row>
  </>
}