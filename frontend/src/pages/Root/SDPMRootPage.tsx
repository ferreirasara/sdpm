import { Layout, Menu } from 'antd';
import { BuildOutlined, BulbOutlined, QuestionCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import SimulatorPage from '../Simulator/SimulatorPage';
import HistoryPage from '../History/HistoryPage';
import AboutAlgorithmsPage from '../AboutAlgorithms/AboutAlgorithmsPage';
import AboutSimulatorPage from '../AboutSimulator/AboutSimulatorPage';

export default function SDPMRootPage() {

  const allLinks = [
    <Menu.Item key={'simulator'}>
      <NavLink to="/simulator"><BuildOutlined /> Simulador</NavLink>
    </Menu.Item>,
    <Menu.Item key={'history'}>
      <NavLink to="/history"><HistoryOutlined /> Histórico</NavLink>
    </Menu.Item>,
    <Menu.Item key={'aboutAlgorithms'}>
      <NavLink to="/aboutAlgorithms"><BulbOutlined /> Sobre os algoritmos</NavLink>
    </Menu.Item>,
    <Menu.Item key={'aboutSimulator'}>
      <NavLink to="/aboutSimulator"><QuestionCircleOutlined /> Sobre o simulador</NavLink>
    </Menu.Item>,
  ]

  const allRoutes = [
    <Route key="root" path="/" exact component={SimulatorPage} />,
    <Route key="simulator" path="/simulator" component={SimulatorPage} />,
    <Route key="history" path="/history" component={HistoryPage} />,
    <Route key="aboutAlgorithms" path="/aboutAlgorithms" component={AboutAlgorithmsPage} />,
    <Route key="aboutSimulator" path="/aboutSimulator" component={AboutSimulatorPage} />,
    <Route key={"404"} render={() => "404: Page Not Found"} />,
  ]

  return <>
    <BrowserRouter>
      <Layout style={{ height: '100vh', overflow: 'auto' }}>
        <Header>
          <div style={{ float: 'left', color: "#ddd", fontSize: '20px', fontFamily: 'cursive' }}>SDPM - Simulador Didático de Paginação de Memória</div>
          <Menu theme="dark" mode="horizontal" style={{ float: 'right' }} defaultSelectedKeys={['simulator']}>
            {allLinks}
          </Menu>
        </Header>
        <Content>
          <Switch>
            {allRoutes}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <span style={{ color: "#aaa" }}>Developed by Sara Ferreira</span>
          <span style={{ marginLeft: 15, color: "#aaa" }}>Versão {process.env.REACT_APP_VERSION}</span>
        </Footer>
      </Layout>
    </BrowserRouter>
  </>
}