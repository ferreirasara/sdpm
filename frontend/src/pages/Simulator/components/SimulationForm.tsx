import { ClearOutlined, SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
import { SimulationData } from "../../../utils/types";
import { algorithmList, algorithmNamesList } from "../../../utils/algorithmList";
import { setPagesQueue, setMemoryInitialState, setTau, setRandomValues } from "../../../utils/generateRandomData";

export interface SimulationFormProps {
  form: FormInstance<any>,
  onSubmit?: (data: SimulationData) => void,
}

export default function SimulationForm(props: SimulationFormProps) {
  const { form, onSubmit } = props

  const algorithmsOptions = algorithmList.map(cur => { return <Select.Option value={cur.name} key={cur.name}>{cur.label}</Select.Option> })

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(algorithmNamesList)
  const [useTau, setUseTau] = useState<boolean>(selectedAlgorithms.includes('wsClockAlgorithm'))
  // const [useClockInterruption, setUseClockInterruption] = useState<boolean>(selectedAlgorithms.includes('wsClockAlgorithm'))
  const [formSubmitLoading, setFormSubmitLoading] = useState(false)

  useEffect(() => {
    setUseTau(selectedAlgorithms.includes('wsClockAlgorithm'))
    // setUseClockInterruption(selectedAlgorithms.includes('nruAlgorithm'))
  }, [selectedAlgorithms])

  const initialValues = { algorithms: selectedAlgorithms }
  const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, }

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = async () => {
    if (formSubmitLoading) return
    setFormSubmitLoading(true)
    form.validateFields().then(values => {
      onSubmit && onSubmit({
        algorithms: values.algorithms,
        // clockInterruption: values.clockInterruption,
        memoryInitalState: values.memoryInitalState,
        memorySize: values.memorySize,
        numberOfPages: values.numberOfPages,
        pages: values.pages,
        pagesQueue: values.pagesQueue,
        pagesQueueSize: values.pagesQueueSize,
        tau: values.tau,
      })
      setFormSubmitLoading(false)
    })
  }

  return <Form {...formItemLayout} form={form} onFinish={handleSubmit} initialValues={initialValues}>

    <Form.Item label="Tamanho da memória" key="memorySize" name="memorySize" tooltip="Quantos processos cabem na memória." rules={[{ required: true, message: 'Informe o tamanho da memória' }]}>
      <InputNumber style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Tamanho da fila de páginas" key="pagesQueueSize" name="pagesQueueSize" tooltip="Tamanho da fila de páginas a serem referenciadas." rules={[{ required: true, message: 'Informe o tamanho da fila de páginas' }]}>
      <InputNumber style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Quantidade de páginas" key="numberOfPages" name="numberOfPages" tooltip="Número de páginas únicas." rules={[{ required: true, message: 'Informe o número de páginas únicas' }]}>
      <InputNumber style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Páginas" key="pages" name="pages" tooltip="Nomes das páginas." rules={[{ required: true, message: 'Informe os nomes das páginas' }]}>
      <Select mode="tags" tokenSeparators={[',']} allowClear style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Fila de páginas" key="pagesQueue" name="pagesQueue" tooltip="Fila de páginas para serem referenciadas." rules={[{ required: true, message: 'Informe a fila de páginas para serem referenciadas' }]}>
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={() => setPagesQueue(form)} /></Tooltip>} style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Estado inicial da memória" key="memoryInitalState" name="memoryInitalState" tooltip="Páginas que já estão na memória." rules={[{ required: true, message: 'Informe as páginas que já estão na memória' }]}>
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={() => setMemoryInitialState(form)} /></Tooltip>} style={{ width: '100%' }} />
    </Form.Item>

    {useTau && <Form.Item label="τ (tau)" key="tau" name="tau" tooltip="Idade máxima para considerar uma página dentro do conjunto de trabalho." rules={[{ required: true, message: 'Informe a idade máxima para considerar uma página dentro do conjunto de trabalho' }]}>
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={() => setTau(form)} /></Tooltip>} style={{ width: '100%' }} type="number" />
    </Form.Item>}

    {/* {useClockInterruption && <Form.Item label="Tempo de interrupção do relógio" key="clockInterruption" name="clockInterruption" tooltip="A cada quantas páginas haverá uma interrupção do relógio." rules={[{ required: true, message: 'Informe a cada quantas páginas haverá uma interrupção do relógio' }]}>
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={() => setClockInterruption(form)} /></Tooltip>} style={{ width: '100%' }} type="number" />
    </Form.Item>} */}

    <Form.Item label="Algoritmos" key="algorithms" name="algorithms" tooltip="Algoritmos a serem executados." rules={[{ required: true, message: 'Selecione os algoritmos' }]} >
      <Select mode="multiple" style={{ width: '100%' }} onChange={(value: string[]) => setSelectedAlgorithms(value)}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: '5px' }} icon={<ThunderboltOutlined />}>Simular</Button>
      <Button type="dashed" htmlType="button" style={{ marginRight: '5px' }} icon={<SettingOutlined />} onClick={() => setRandomValues(form)}>Gerar dados aleatórios</Button>
      <Button type="dashed" htmlType="button" style={{ marginRight: '5px' }} icon={<ClearOutlined />} onClick={onReset}>Limpar</Button>
    </Form.Item>

  </Form>
}