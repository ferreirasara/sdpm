import { Card, Form, PageHeader, Row, Spin } from "antd";
import { useState } from "react";
import api from "../../api";
import { SimuationResponse, SimulationData } from "../../utils/types";
import { algorithmNamesList } from "../../utils/algorithmList";
import { getRandomInt } from "../../utils/calculations";
import { getRandomString } from "../../utils/pretifyStrings";
import ResultCard from "./components/ResultCard";
import SimulationForm from "./components/SimulationForm";
import SimulationSteps from "./components/SimulationSteps";

export const generateNumberOfPages = (memorySize: number, pagesQueueSize: number): number => {
  return memorySize + (memorySize % pagesQueueSize)
}

export const generatePages = (numberOfPages: number): string[] => {
  const pages = []
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(getRandomString(5))
  }
  return pages
}

export const generateMemoryInitialState = (memorySize: number, pages: string[]) => {
  const memoryInitalState: string[] = []
  for (let i = 0; i < memorySize; i++) {
    const randomNumber = getRandomInt(1, 3)
    if (randomNumber === 1) {
      memoryInitalState.push('0')
    } else {
      const page = pages[Math.floor(Math.random() * pages.length)]
      if (!memoryInitalState.includes(page)) {
        memoryInitalState.push(page)
      } else {
        i--
      }
    }
  }
  return memoryInitalState
}

export const generatePagesQueue = (pagesQueueSize: number, pages: string[]) => {
  const pagesQueue = []
  for (let i = 0; i < pagesQueueSize; i++) {
    pagesQueue.push(pages[Math.floor(Math.random() * pages.length)])
  }
  return pagesQueue
}

export const generateTau = () => {
  // This is temporary. TODO: calculate the best value
  return getRandomInt(1, 10)
}

export const generateClockInterruption = () => {
  // This is temporary. TODO: calculate the best value
  return getRandomInt(5, 15)
}

export default function AboutAlgorithmsPage() {
  document.title = 'SDPM - Simulador Didático de Paginação de Memória'
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [simulationResponse, setSimulationResponse] = useState<SimuationResponse>({success: false, simulationTime: 0, faultsPerAlgorithm: []})

  const setMemoryInitialState = () => {
    const memorySize = form.getFieldValue('memorySize')
    const pages = form.getFieldValue('pages')
    const memoryInitalState = generateMemoryInitialState(memorySize, pages).join('|')
    form.setFieldsValue({ memoryInitalState })
  }

  const setPagesQueue = () => {
    const pagesQueueSize = form.getFieldValue('pagesQueueSize')
    const pages = form.getFieldValue('pages')
    const pagesQueue = generatePagesQueue(pagesQueueSize, pages).join('|')
    form.setFieldsValue({ pagesQueue })
  }

  const setTau = () => {
    const tau = generateTau()
    form.setFieldsValue({ tau })
  }

  const setClockInterruption = () => {
    const clockInterruption = generateClockInterruption()
    form.setFieldsValue({ clockInterruption })
  }

  const setRandomValues = () => {
    const memorySize = getRandomInt(1, 100)
    const pagesQueueSize = getRandomInt(100, 1000)
    const numberOfPages = generateNumberOfPages(memorySize, pagesQueueSize)
    const pages = generatePages(numberOfPages)
    const pagesQueue = generatePagesQueue(pagesQueueSize, pages).join('|')
    const memoryInitalState = generateMemoryInitialState(memorySize, pages).join('|')
    const tau = generateTau()
    const clockInterruption = generateClockInterruption()

    form.setFieldsValue({
      memorySize,
      pagesQueueSize,
      numberOfPages,
      pages,
      pagesQueue,
      memoryInitalState,
      tau,
      clockInterruption,
      algorithms: algorithmNamesList,
    })
  }

  const handleStartSimulation = async (data: SimulationData) => {
    setCurrentStep(1)
    try {
      const response = await api.post('simulate', data);
      setSimulationResponse(response.data)
    } catch (error) {
      console.log(error)    
    }
    setCurrentStep(2)
  }

  return <>
    <PageHeader
      title={'Simulador'}
      style={{ background: 'white' }}
      onBack={() => window.history.back()}
    />
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <SimulationSteps currentStep={currentStep} />
    </Row>

    {currentStep === 0 && <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <Card bordered={false} style={{ width: '90vh' }}>
        <SimulationForm
          form={form}
          setRandomValues={setRandomValues}
          setMemoryInitialState={setMemoryInitialState}
          setPagesQueue={setPagesQueue}
          setTau={setTau}
          setClockInterruption={setClockInterruption}
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