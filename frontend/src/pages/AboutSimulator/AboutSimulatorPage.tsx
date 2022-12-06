import { FileTextOutlined, GithubOutlined, LinkedinOutlined, MailOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Row, Space, Tag, Typography } from "antd";
import { PageHeader } from '@ant-design/pro-layout';

export default function AboutAlgorithmsPage() {
  document.title = "Sobre o simulador"

  const developmentTools = [
    <li><b>Versionamento</b>: GitHub <Typography.Text code>v2.31.0</Typography.Text></li>,
    <li><b>Banco de dados</b>: PostgreSQL <Typography.Text code>v13.4</Typography.Text></li>,
    <li><b>Backend</b>: Node.js <Typography.Text code>v14.15.0</Typography.Text></li>,
    <li><b>Frontend</b>: React.js <Typography.Text code>v16</Typography.Text></li>,
    <li><b>IDE</b>: VSCode <Typography.Text code>v1.57.1</Typography.Text></li>,
    <li><b>Biblioteca gráfica</b>: Bizcharts <Typography.Text code>v4.0.17</Typography.Text></li>,
    <li><b>Biblioteca de UI</b>: Antd <Typography.Text code>v5.0.4</Typography.Text></li>,
  ]

  return <>
    <PageHeader title={<><QuestionCircleOutlined /> Sobre o simulador</>} />
    <Row justify="center" style={{ margin: "5px" }}>
      <Col style={{ marginTop: "10px" }}>
        <Card bordered={false}>
          <Descriptions
            title="SDPM - Simulador Didático de Paginação de Memória"
            column={1}
            style={{ textAlign: "center", maxWidth: "100vh" }}
          >
            <Descriptions.Item>
              Simulador desenvolvido como Trabalho de Conclusão de Curso,
              apresentado ao curso de Bacharelado em Ciência da Computação da Faculdade de Ciências Exatas e de Tecnologia da Universidade Tuiuti do Paraná,
              como requisito à obtenção ao grau de Bacharel.
            </Descriptions.Item>
            <Descriptions.Item label="Desenvolvido por" labelStyle={{ fontWeight: "bold" }}>
              <Space>
                Sara Cristina Ferreira
                <Typography.Link href="https://www.linkedin.com/in/ferreirasara1501/" target="_blank">
                  <Tag icon={<LinkedinOutlined />} color="geekblue">LinkedIn</Tag>
                </Typography.Link>
                <Typography.Link href="mailto:ferreirasara1501@hotmail.com" target="_blank">
                  <Tag icon={<MailOutlined />} color="volcano">Email</Tag>
                </Typography.Link>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Orientador" labelStyle={{ fontWeight: "bold" }}>
              Darci Luiz Tomazi Junior
            </Descriptions.Item>
            <Descriptions.Item label="Ferramentas utilizadas" labelStyle={{ fontWeight: "bold" }} contentStyle={{ textAlign: "justify" }}>
              <ul>
                {developmentTools}
              </ul>
            </Descriptions.Item>
            <Descriptions.Item label="Favicon" labelStyle={{ fontWeight: "bold" }}>
              <div>Feito por <a href="https://www.flaticon.com/authors/wichaiwi" title="Wichai.wi">Wichai.wi</a> disponível em <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Descriptions.Item>
            <Descriptions.Item label="Repositório" labelStyle={{ fontWeight: "bold" }}>
              <Space>
                <Typography.Link href="https://github.com/ferreirasara/sdpm" target="_blank">
                  <Tag icon={<GithubOutlined />} color="default">GitHub</Tag>
                </Typography.Link>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Documentos" labelStyle={{ fontWeight: "bold" }}>
              <Space wrap>
                <Typography.Link href="https://drive.google.com/file/d/1d77sW2v3VlDeZe06RZ3VUL_qk2BhJ-On/view?usp=sharing" target="_blank">
                  <Tag icon={<FileTextOutlined />} color="green">Monografia</Tag>
                </Typography.Link>
                <Typography.Link href="https://drive.google.com/file/d/1VZCWvZ_j1yHgLe7noBnWz9Cujss5iaZm/view?usp=sharing" target="_blank">
                  <Tag icon={<FileTextOutlined />} color="green">Manual</Tag>
                </Typography.Link>
                <Typography.Link href="https://drive.google.com/file/d/18XB5A_hJPgOVOF3Ca5vRnerSD-dTxWtG/view?usp=sharing" target="_blank">
                  <Tag icon={<FileTextOutlined />} color="green">Apresentação I</Tag>
                </Typography.Link>
                <Typography.Link href="https://drive.google.com/file/d/1QE0WU-kGmv5ut5Td3w7QBqg4XwoLECOE/view?usp=sharing" target="_blank">
                  <Tag icon={<FileTextOutlined />} color="green">Apresentação II</Tag>
                </Typography.Link>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Doações" labelStyle={{ fontWeight: "bold" }}>
              <Space>
                <Typography.Link href="https://www.buymeacoffee.com/ferreirasara" target="_blank">
                  <Tag color="yellow">☕ Buy Me A Coffe</Tag>
                </Typography.Link>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  </>
}