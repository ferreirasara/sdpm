import { BuildOutlined, QuestionOutlined, StarOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Card, Form, notification, PageHeader, Result, Row } from "antd";
import { useState } from "react";
import api from "../../api";
import { getRandomInt } from "../../utils/calculations";
import { SimulationResponse, SimulationData } from "../../utils/types";
import { getMessageFromError } from "../../utils/utils";
import HelpModal from "./components/HelpModal";
import RatingModal from "./components/RatingModal";
import ResultCard from "./components/ResultCard";
import SimulationForm from "./components/SimulationForm";
import SimulationSteps from "./components/SimulationSteps";

export default function AboutAlgorithmsPage() {
  document.title = "SDPM - Simulador Didático de Paginação de Memória"
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [simulationResponse, setSimulationResponse] = useState<SimulationResponse>({})
  const [simulationData, setSimulationData] = useState<SimulationData>({})
  const [helpModalVisible, setHelpModalVisible] = useState<boolean>(localStorage.getItem('@sdpm/helpModalOccult') ? false : true);
  const [ratingModalVisible, setRatingModalVisible] = useState<boolean>(false);
  const [rated, setRated] = useState<boolean>(false);

  const handleStartSimulation = async (data: SimulationData) => {
    setCurrentStep(1)
    try {
      const response = await api.post("simulation", data);
      if (response.data.success) {
        setSimulationData(data);
        setSimulationResponse(response.data);
        if (getRandomInt(0,5) === 1 || !localStorage.getItem('@sdpm/ratingModalOccult')) setRatingModalVisible(true);
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
      extra={<>
        <Button icon={<QuestionOutlined />} shape="circle" onClick={() => setHelpModalVisible(!helpModalVisible)} />
        {(!rated && currentStep === 2) ? <Button icon={<StarOutlined />} shape="circle" onClick={() => setRatingModalVisible(!ratingModalVisible)} /> : null}
      </>}
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

    <HelpModal helpModalVisible={helpModalVisible} setHelpModalVisible={setHelpModalVisible} />
    <RatingModal ratingModalVisible={ratingModalVisible} setRatingModalVisible={setRatingModalVisible} setRated={setRated} />
  </>
}