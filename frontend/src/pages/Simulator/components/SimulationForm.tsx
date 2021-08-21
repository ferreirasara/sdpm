import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
import { algorithmList, algorithmNamesList } from "../../../utils/algorithmList";

export interface SimulationFormProps {
  form: FormInstance<any>,
  setRandomValues: () => void,
  setMemoryInitialState: () => void,
  setPagesQueue: () => void,
  setTau: () => void,
  setClockInterruption: () => void,
  onFinish: () => void,
}

export default function SimulationForm(props: SimulationFormProps) {
  const { form, setRandomValues, setMemoryInitialState, setPagesQueue, setTau, setClockInterruption, onFinish } = props

  const algorithmsOptions = algorithmList.map(cur => { return <Select.Option value={cur.name} key={cur.name}>{cur.label}</Select.Option> })

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(algorithmNamesList)
  const [useTau, setUseTau] = useState<boolean>(selectedAlgorithms.includes('wsClockAlgorithm'))
  const [useClockInterruption, setUseClockInterruption] = useState<boolean>(selectedAlgorithms.includes('wsClockAlgorithm'))

  useEffect(() => {
    setUseTau(selectedAlgorithms.includes('wsClockAlgorithm'))
    setUseClockInterruption(selectedAlgorithms.includes('nruAlgorithm'))
  }, [selectedAlgorithms])

  const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, }

  const onReset = () => {
    form.resetFields();
  };

  return <Form {...formItemLayout} form={form} onFinish={onFinish}>

    <Form.Item label="Tamanho da memória" key="memorySize" name="memorySize" tooltip="Quantos processos cabem na memória." rules={[{ required: true, message: 'Informe o tamanho da memória' }]}>
      <InputNumber style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Tamanho da fila de páginas" key="pagesQueueSize" name="pagesQueueSize" tooltip="Tamanho da fila de páginas a serem referenciadas." rules={[{ required: true, message: 'Informe o tamanho da fila de páginas' }]}>
      <InputNumber style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Quantidade de páginas" key="numberOfPages" name="numberOfPages" tooltip="Número de páginas únicas. Se deixado em branco, será gerado automaticamente">
      <InputNumber style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Páginas" key="pages" name="pages" tooltip="Nomes das páginas. Se deixado em branco, será gerado automaticamente">
      <Select mode="tags" tokenSeparators={[',']} allowClear style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Fila de páginas" key="pagesQueue" name="pagesQueue" tooltip="Fila de páginas para serem referenciadas. Se deixado em branco, será gerado automaticamente">
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={setPagesQueue} /></Tooltip>} style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Estado inicial da memória" key="memoryInitalState" name="memoryInitalState" tooltip="Páginas que já estão na memória. Se deixado em branco, será gerado automaticamente">
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={setMemoryInitialState} /></Tooltip>} style={{ width: '100%' }} />
    </Form.Item>

    {useTau && <Form.Item label="τ (tau)" key="tau" name="tau" tooltip="Idade máxima para considerar uma página dentro do conjunto de trabalho. Se deixado em branco, será gerado automaticamente">
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={setTau} /></Tooltip>} style={{ width: '100%' }} type="number" />
    </Form.Item>}

    {useClockInterruption && <Form.Item label="Tempo de interrupção do relógio" key="clockInterruption" name="clockInterruption" tooltip="A cada quantas páginas haverá uma interrupção do relógio. Se deixado em branco, será gerado automaticamente">
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={setClockInterruption} /></Tooltip>} style={{ width: '100%' }} type="number" />
    </Form.Item>}

    <Form.Item label="Algoritmos" key="algorithms" name="algorithms" tooltip="Algoritmos a serem executados." rules={[{ required: true, message: 'Selecione os algoritmos' }]} >
      <Select mode="multiple" style={{ width: '100%' }} defaultValue={selectedAlgorithms} onChange={(value: string[]) => setSelectedAlgorithms(value)}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: '5px' }}>Simular</Button>
      <Button type="dashed" htmlType="button" style={{ marginRight: '5px' }} icon={<SettingOutlined />} onClick={setRandomValues}>Gerar dados aleatórios</Button>
      <Button type="dashed" htmlType="button" style={{ marginRight: '5px' }} icon={<ReloadOutlined />} onClick={onReset}>Limpar</Button>
    </Form.Item>

  </Form>
}