import { ClearOutlined, SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, InputNumber, Menu, Select, Space, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
import { SimulationData } from "../../../utils/types";
import { algorithmList, algorithmNamesList } from "../../../utils/algorithmList";
import { setPagesQueue, setMemoryInitialState, setTau, setRandomValues } from "../../../utils/generateRandomData";
import { setExampleValues } from "../../../utils/examples";

export interface SimulationFormProps {
  form: FormInstance<any>,
  onSubmit?: (data: SimulationData) => void,
}

export default function SimulationForm(props: SimulationFormProps) {
  const { form, onSubmit } = props

  const algorithmsOptions = algorithmList.map(cur => { return <Select.Option value={cur.name} key={cur.name}>{cur.label}</Select.Option> })

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(algorithmNamesList)
  const [formSubmitLoading, setFormSubmitLoading] = useState(false)
  const [selectedExample, setSelectedExample] = useState<string>('')

  useEffect(() => {
    setExampleValues(form, selectedExample)
  }, [selectedExample])

  const initialValues = { algorithms: selectedAlgorithms }
  const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }, }

  const onReset = () => {
    form.resetFields();
    setSelectedExample('')
  };

  const handleSubmit = async () => {
    if (formSubmitLoading) return
    setFormSubmitLoading(true)
    form.validateFields().then(values => {
      onSubmit && onSubmit({
        algorithms: values.algorithms,
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

  const examplesMenu = (
    <Menu selectedKeys={[selectedExample]} onClick={(e) => setSelectedExample(e.key)} >
      <Menu.Item key="example1" >Exemplo 1</Menu.Item>
      <Menu.Item key="example2" >Exemplo 2</Menu.Item>
    </Menu>
  )

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

    <Form.Item label="τ (tau)" key="tau" name="tau" tooltip="Idade máxima para considerar uma página dentro do conjunto de trabalho." rules={[{ required: true, message: 'Informe a idade máxima para considerar uma página dentro do conjunto de trabalho' }]}>
      <Input addonAfter={<Tooltip title="Gerar automaticamente"><SettingOutlined onClick={() => setTau(form)} /></Tooltip>} style={{ width: '100%' }} type="number" />
    </Form.Item>

    <Form.Item label="Algoritmos" key="algorithms" name="algorithms" tooltip="Algoritmos a serem executados." rules={[{ required: true, message: 'Selecione os algoritmos' }]} >
      <Select mode="multiple" style={{ width: '100%' }} onChange={(value: string[]) => setSelectedAlgorithms(value)}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />}>Simular</Button>
        <Dropdown.Button overlay={examplesMenu} type="dashed">Usar exemplo</Dropdown.Button>
        <Button type="dashed" htmlType="button" icon={<SettingOutlined />} onClick={() => setRandomValues(form)}>Gerar dados aleatórios</Button>
        <Button type="dashed" htmlType="button" icon={<ClearOutlined />} onClick={onReset}>Limpar</Button>
      </Space>
    </Form.Item>

  </Form>
}