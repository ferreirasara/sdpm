import { DashboardOutlined, SyncOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Steps } from "antd";

export interface SimulationStepsProps {
  currentStep: number
  setCurrentStep: (value: React.SetStateAction<number>) => void
}

export default function SimulationSteps(props: SimulationStepsProps) {
  const { currentStep, setCurrentStep } = props

  return <Steps current={currentStep} style={{ width: "100vh", overflow: "auto" }} >
    <Steps.Step title="Fornecer dados" icon={<ThunderboltOutlined />} onStepClick={(index) => setCurrentStep(index)} />
    <Steps.Step title="Simulando" icon={<SyncOutlined spin={currentStep === 1} />} active={currentStep === 1} />
    <Steps.Step title="Resultado da simulação" icon={<DashboardOutlined />} active={currentStep === 2} />
  </Steps>
}