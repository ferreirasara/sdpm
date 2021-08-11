import { FileTextOutlined, GithubOutlined } from "@ant-design/icons";
import { Col, Descriptions, PageHeader, Row, Tag, Typography } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = 'Sobre o simulador'

  const developmentTools = [
    <li><b>Versionamento</b>: GitHub <Typography.Text code>v2.31.0</Typography.Text></li>,
    <li><b>Banco de dados</b>: MongoDB <Typography.Text code>v4.2</Typography.Text></li>,
    <li><b>Backend</b>: Node.js <Typography.Text code>v14.15.0</Typography.Text></li>,
    <li><b>Frontend</b>: React.js <Typography.Text code>v16</Typography.Text></li>,
    <li><b>IDE</b>: VSCode <Typography.Text code>v1.57.1</Typography.Text></li>,
    <li><b>Biblioteca gráfica</b>: Bizcharts <Typography.Text code>v4.0.17</Typography.Text></li>,
    <li><b>Biblioteca de UI</b>: Antd <Typography.Text code>v4.10.2</Typography.Text></li>,
  ]

  return <>
    <PageHeader
      title={'Sobre o simulador'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <Col style={{ marginTop: '10px' }}>
        <Descriptions
          title="SDPM - Simulador Didático de Paginação de Memória"
          column={1}
          style={{ textAlign: 'center', maxWidth: '60vh' }}
        >
          <Descriptions.Item>Simulador desenvolvido como Trabalho de Conclusão de Curso,
            apresentado ao curso de Bacharelado em Ciência da Computação da Faculdade de Ciências Exatas e de Tecnologia da Universidade Tuiuti do Paraná,
            como requisito à obtenção ao grau de Bacharel.</Descriptions.Item>
          <Descriptions.Item label="Desenvolvido por" labelStyle={{ fontWeight: 'bold' }}>Sara Cristina Ferreira</Descriptions.Item>
          <Descriptions.Item label="Orientador" labelStyle={{ fontWeight: 'bold' }}>Darci Luiz Tomazi Junior</Descriptions.Item>
          <Descriptions.Item label="Versão" labelStyle={{ fontWeight: 'bold' }}><Typography.Text code>v{process.env.REACT_APP_VERSION}</Typography.Text></Descriptions.Item>
          <Descriptions.Item label="Ferramentas utilizadas" labelStyle={{ fontWeight: 'bold' }} contentStyle={{ textAlign: 'justify' }}>
            <ul>
              {developmentTools}
            </ul>
          </Descriptions.Item>
          <Descriptions.Item label="Links" labelStyle={{ fontWeight: 'bold' }}>
            <Typography.Link href='https://github.com/ferreirasara/sdpm' target="_blank"><Tag icon={<GithubOutlined />} color="#333">GitHub</Tag></Typography.Link>
            {' '}
            <Typography.Link href='https://drive.google.com/file/d/18nN5XVq_JEna6NUJPhbl0SHJOSdT1HA_/view?usp=sharing' target="_blank"><Tag icon={<FileTextOutlined />} color="#34a853">Monografia</Tag></Typography.Link>
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  </>
}