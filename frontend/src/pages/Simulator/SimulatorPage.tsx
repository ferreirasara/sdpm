import { BuildOutlined, QuestionOutlined, StarOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Card, Form, notification, Result, Row } from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import React from "react";
import { useState } from "react";
import api from "../../api";
import FallbackSpin from "../../components/FallbackSpin";
import { PageHeader } from '@ant-design/pro-layout';
import { SimulationResponse, SimulationData } from "../../utils/types";
import { getMessageFromError } from "../../utils/utils";
import HelpModal from "./components/HelpModal";
import RatingModal from "./components/RatingModal";
import ResultCard from "./components/ResultCard";
import SimulationSteps from "./components/SimulationSteps";

const SimulationForm = React.lazy(() => import("./components/SimulationForm"));

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
      extra={<>
        <Button icon={<QuestionOutlined />} shape="circle" onClick={() => setHelpModalVisible(!helpModalVisible)} />
        {(!rated && currentStep === 2) ? <Button icon={<StarOutlined />} shape="circle" onClick={() => setRatingModalVisible(!ratingModalVisible)} /> : null}
      </>}
    />
    <Row justify="center">
      <SimulationSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Row>

    {currentStep === 0 && <Row justify="center">
      <Card bordered={false} style={{ width: "100vh", overflow: "auto" }}>
        <ErrorBoundary>
          <React.Suspense fallback={<FallbackSpin tip='Carregando formulário...' />}>
            <SimulationForm
              form={form}
              onSubmit={handleStartSimulation}
            />
          </React.Suspense>
        </ErrorBoundary>
      </Card>
    </Row>}

    {currentStep === 1 && <Row justify="center">
      <Result
        status="info"
        icon={<SyncOutlined spin />}
        title="Simulando... Por favor aguarde"
        subTitle="Isso pode levar algum tempo."
      />
    </Row>}

    {currentStep === 2 && <Row justify="center">
      <ResultCard result={simulationResponse} simulationData={simulationData} />
    </Row>}

    <HelpModal helpModalVisible={helpModalVisible} setHelpModalVisible={setHelpModalVisible} />
    <RatingModal ratingModalVisible={ratingModalVisible} setRatingModalVisible={setRatingModalVisible} setRated={setRated} />
  </>
}