import { Alert, Button, Layout, Menu, Result, Typography } from "antd";
import { BuildOutlined, BulbOutlined, QuestionCircleOutlined, HistoryOutlined, MenuOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/lib/layout/layout";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import React from "react";

export default function SDPMRootPage() {
  const urlSplit = document.URL.split("/")
  const actualRoute = urlSplit[urlSplit?.length - 1]
  const showHerokuAlert = document.URL.includes('herokuapp')

  const allLinks = [
    <Menu.Item key={"simulator"}>
      <NavLink to="/simulator"><BuildOutlined /> Simulador</NavLink>
    </Menu.Item>,
    <Menu.Item key={"history"}>
      <NavLink to="/history"><HistoryOutlined /> Histórico</NavLink>
    </Menu.Item>,
    <Menu.Item key={"aboutAlgorithms"}>
      <NavLink to="/aboutAlgorithms"><BulbOutlined /> Sobre os algoritmos</NavLink>
    </Menu.Item>,
    <Menu.Item key={"aboutSimulator"}>
      <NavLink to="/aboutSimulator"><QuestionCircleOutlined /> Sobre o simulador</NavLink>
    </Menu.Item>,
  ]

  const allRoutes = [
    <Route key="root" path="/" exact component={React.lazy(() => import("../Simulator/SimulatorPage"))} />,
    <Route key="simulator" path="/simulator" component={React.lazy(() => import("../Simulator/SimulatorPage"))} />,
    <Route key="history" path="/history" component={React.lazy(() => import("../History/HistoryPage"))} />,
    <Route key="aboutAlgorithms" path="/aboutAlgorithms" component={React.lazy(() => import("../AboutAlgorithms/AboutAlgorithmsPage"))} />,
    <Route key="aboutSimulator" path="/aboutSimulator" component={React.lazy(() => import("../AboutSimulator/AboutSimulatorPage"))} />,
    <Route
      key={"404"}
      render={() => <Result
        status="404"
        title="404"
        subTitle="Desculpe, essa página não existe."
        extra={<Button type="primary"><NavLink to="/" >Voltar para a página inicial</NavLink></Button>}
      />}
    />,
  ]

  return <>
    <BrowserRouter>
      <Layout style={{ height: "100vh", overflow: "auto", backgroundColor: "white" }}>
        {showHerokuAlert && <Alert
          closable
          type="error"
          showIcon
          message={<>
            <Typography.Text>Atenção: a partir de 28 de novembro de 2022, esse link não estará mais disponível. Por favor, acesse a aplicação pelo link: </Typography.Text>
            <Typography.Link>https://sdpm-simulator.netlify.app/</Typography.Link>
          </>}
        />}
        <Header>
          <div style={{ float: "left", fontSize: "20px", marginRight: "10px" }}><NavLink to="/" style={{ color: "#DDD" }}>SDPM</NavLink></div>
          <Menu theme="dark" mode="horizontal" overflowedIndicator={<MenuOutlined />} defaultSelectedKeys={[actualRoute || "simulator"]}>
            {allLinks}
          </Menu>
        </Header>
        <Content>
          <Switch>
            {allRoutes}
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  </>
}