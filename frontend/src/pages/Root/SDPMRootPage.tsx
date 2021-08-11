import { Layout, Menu } from 'antd';
import { BuildOutlined, BulbOutlined, QuestionCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";

export default function SDPMRootPage() {

  return <>
    <Layout style={{ height: '100vh', overflow: 'auto' }}>
      <Header>
        <div style={{ float: 'left', color: "#ddd", fontSize: '20px', fontFamily: 'cursive' }}>SDPM - Simulador Didático de Paginação de Memória</div>
        <Menu theme="dark" mode="horizontal" style={{ float: 'right', overflow: 'auto' }}>
          <Menu.Item key={'home'}><BuildOutlined /> Simulador</Menu.Item>
          <Menu.Item key={'history'}><HistoryOutlined /> Histórico</Menu.Item>
          <Menu.Item key={'algorithms'}><BulbOutlined /> Sobre os algoritmos</Menu.Item>
          <Menu.Item key={'about'}><QuestionCircleOutlined /> Sobre o simulador</Menu.Item>
        </Menu>
      </Header>
      <Content>

      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <span style={{ color: "#aaa" }}>Developed by Sara Ferreira</span>
        <span style={{ marginLeft: 15, color: "#aaa" }}>Versão {process.env.REACT_APP_VERSION}</span>
      </Footer>
    </Layout>
  </>
}