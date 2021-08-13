import { Steps } from "antd";

export interface SimulationStepsProps {
  currentStep: number
}

export default function SimulationSteps(props: SimulationStepsProps) {
  const { currentStep } = props

  return <Steps current={currentStep} style={{ width: '90vh' }}>
    <Steps.Step title="Fornecer dados" />
    <Steps.Step title="Simulando" />
    <Steps.Step title="Resultado da simulação" />
  </Steps>
}