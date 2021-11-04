import { BuildOutlined, QuestionOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Card, Form, Modal, notification, PageHeader, Result, Row, Space, Timeline, Typography } from "antd";
import { useState } from "react";
import api from "../../api";
import { SimulationResponse, SimulationData } from "../../utils/types";
import { getMessageFromError } from "../../utils/utils";
import ResultCard from "./components/ResultCard";
import SimulationForm from "./components/SimulationForm";
import SimulationSteps from "./components/SimulationSteps";

export default function AboutAlgorithmsPage() {
  document.title = "SDPM - Simulador Didático de Paginação de Memória"
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [simulationResponse, setSimulationResponse] = useState<SimulationResponse>({})
  const [simulationData, setSimulationData] = useState<SimulationData>({})
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const handleStartSimulation = async (data: SimulationData) => {
    setCurrentStep(1)
    try {
      const response = await api.post("simulation", data);
      if (response.data.success) {
        setSimulationData(data);
        setSimulationResponse(response.data);
        setCurrentStep(2)
      } else {
        notification.open({
          message: "Ocorreu um erro durante a simulação.",
          description: response.data.message,
          type: "error"
        });
        setCurrentStep(0)
      }
    } catch (error) {
      console.log(error)
      notification.open({
        message: "Ocorreu um erro durante a simulação.",
        description: `Erro: ${getMessageFromError(error)}`,
        type: "error"
      });
      setCurrentStep(0)
    }
  }

  return <>
    <PageHeader
      title={<><BuildOutlined /> Simulador</>}
      style={{ background: "white" }}
      extra={<Button icon={<QuestionOutlined />} shape="circle" onClick={() => setModalVisible(!modalVisible)} />}
    />
    <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <SimulationSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Row>

    {currentStep === 0 && <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <Card bordered={false} style={{ width: "100vh", overflow: "auto" }}>
        <SimulationForm
          form={form}
          onSubmit={handleStartSimulation}
        />
      </Card>
    </Row>}

    {currentStep === 1 && <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <Result
        status="info"
        icon={<SyncOutlined spin />}
        title="Simulando... Por favor aguarde"
        subTitle="Isso pode levar algum tempo."
      />
    </Row>}

    {currentStep === 2 && <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <ResultCard result={simulationResponse} simulationData={simulationData} />
    </Row>}

    <Modal
      title="Ajuda com o simulador"
      visible={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <Timeline>
        <Timeline.Item color="#ffe58f">
          <Space direction="vertical">
            <Typography.Text strong mark>Primeiro, preencha os dados para a simulação</Typography.Text>
            <span>Os campos "Fila de páginas", "Fila de ações", "Estado inicial da memória", "Interrupção do relógio" e "τ (tau)" podem ser gerados automaticamente.</span>
            <span>O campo "Interrupção do relógio" é utilizado somente quando os algoritmos "NRU", "Segunda Chance" ou "WS-Clock" são selecionados</span>
            <span>O Campo "τ (tau)" é utilizado somente quando o algoritmo "WS-Clock" é selecionado.</span>
          </Space>
        </Timeline.Item>
        <Timeline.Item color="#ffe58f">
          <Space direction="vertical">
            <Typography.Text strong mark>Botões extras.</Typography.Text>
            <span>Gerar dados aleratórios: Caso queira, você pode gerar dados aleatorios para a simulação</span>
            <span>Limpar: limpa todos os dados do formulário.</span>
          </Space>
        </Timeline.Item>
        <Timeline.Item color="#ffe58f">
          <Space direction="vertical">
            <Typography.Text strong mark>Após clicar em "Simular", aguarde alguns instantes.</Typography.Text>
            <span>Dependendo da quantidade de dados, a simulação pode demorar um pouco.</span>
            <span>Devido ao site de hospedagem utilizado, a API de simulação "dorme" após 30 minutos sem uso. Nesse caso, é comum que o processo de simulação demore um pouco mais, pois precisa esperar a API iniciar novamente.</span>
          </Space>
        </Timeline.Item>
        <Timeline.Item color="#ffe58f">
          <Space direction="vertical">
            <Typography.Text strong mark>Resultados</Typography.Text>
            <span>Caso o tamanho da memória seja menor ou igual a 5, o número de páginas seja menor ou igual a 10 e o tamanho da fila de páginas seja menor ou igual a 15, serão mostrados os detalhes da simulação, disponíveis ao final da página.</span>
          </Space>
        </Timeline.Item>
      </Timeline>
    </Modal>
  </>
}