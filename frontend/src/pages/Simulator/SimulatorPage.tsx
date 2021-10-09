import { Card, Form, notification, PageHeader, Row, Spin } from "antd";
import { useState } from "react";
import api from "../../api";
import { SimuationResponse, SimulationData } from "../../utils/types";
import { getMessageFromError } from "../../utils/utils";
import ResultCard from "./components/ResultCard";
import SimulationForm from "./components/SimulationForm";
import SimulationSteps from "./components/SimulationSteps";

export default function AboutAlgorithmsPage() {
  document.title = 'SDPM - Simulador Didático de Paginação de Memória'
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [simulationResponse, setSimulationResponse] = useState<SimuationResponse>({success: false, message: ''})

  const handleStartSimulation = async (data: SimulationData) => {
    setCurrentStep(1)
    try {
      const response = await api.post('simulation', data);
      setSimulationResponse(response.data)
      setCurrentStep(2)
    } catch (error) {
      console.log(error)
      notification.open({
        message: 'Ocorreu um erro durante a simulação.',
        description: `Erro: ${getMessageFromError(error)}`,
        type: 'error'
      });
      setCurrentStep(0)
    }
  }

  return <>
    <PageHeader
      title={'Simulador'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <SimulationSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Row>

    {currentStep === 0 && <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <Card bordered={false} style={{ width: '90vh' }}>
        <SimulationForm
          form={form}
          onSubmit={handleStartSimulation}
        />
      </Card>
    </Row>}

    {currentStep === 1 && <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <div style={{ margin: '20px 0', marginBottom: '20px', padding: '30px 50px', textAlign: 'center', borderRadius: '4px' }}>
        <Spin tip="Simulando... Por favor aguarde" />
      </div>
    </Row>}

    {currentStep === 2 && <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <ResultCard result={simulationResponse} />
    </Row>}
  </>
}