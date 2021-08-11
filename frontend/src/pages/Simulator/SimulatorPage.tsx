import { PageHeader, Row } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = 'SDPM - Simulador Didático de Paginação de Memória'

  return <>
    <PageHeader
      title={'Simulador'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row style={{ marginBottom: '2px', marginTop: '2px' }}>

    </Row>
  </>
}