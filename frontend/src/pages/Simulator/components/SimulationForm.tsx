import { ClearOutlined, SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, InputNumber, Menu, Select, Space, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
import { SimulationData } from "../../../utils/types";
import { algorithmList, algorithmNamesList } from "../../../utils/algorithmList";
import { setPagesQueue, setMemoryInitialState, setTau, setRandomValues, setActionsQueue, setClockInterruption } from "../../../utils/generateRandomData";
import { setTestCaseValues } from "../../../utils/testCases";

export interface SimulationFormProps {
  form: FormInstance<SimulationData>,
  onSubmit?: (data: SimulationData) => void,
}

export default function SimulationForm(props: SimulationFormProps) {
  const { form, onSubmit } = props

  const algorithmsOptions = algorithmList.map(cur => { return <Select.Option value={cur.name} key={cur.name}>{cur.label}</Select.Option> })

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>()
  const [formSubmitLoading, setFormSubmitLoading] = useState(false)
  const [selectedTestCase, setSelectedTestCase] = useState<string>("")
  const [firstRender, setFirstRender] = useState<boolean>(true);

  if (firstRender) {
    setSelectedAlgorithms(algorithmNamesList)
    setFirstRender(false);
  }

  useEffect(() => {
    setTestCaseValues(form, selectedTestCase)
  }, [selectedTestCase, form])

  const onReset = () => {
    form.resetFields();
    setSelectedTestCase("")
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
        actionsQueue: values.actionsQueue,
        pagesQueueSize: values.pagesQueueSize,
        clockInterruption: values.clockInterruption,
        tau: values.tau,
      })
      setFormSubmitLoading(false)
    })
  }

  const testCasesMenu = (
    <Menu selectedKeys={[selectedTestCase]} onClick={(e) => setSelectedTestCase(e.key)} >
      <Menu.Item key="testCase1" >Caso de teste 1</Menu.Item>
      <Menu.Item key="testCase2" >Caso de teste 2</Menu.Item>
      <Menu.Item key="testCase3" >Caso de teste 3</Menu.Item>
    </Menu>
  )

  return <Form
    labelAlign="right"
    initialValues={{ algorithms: algorithmNamesList }}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    onFinish={handleSubmit}
  >
    <Form.Item
      label="Tamanho da memória"
      key="memorySize"
      name="memorySize"
      tooltip="Quantos processos cabem na memória."
      rules={[{ required: true, message: "Informe o tamanho da memória" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Tamanho da fila de páginas"
      key="pagesQueueSize"
      name="pagesQueueSize"
      tooltip="Tamanho da fila de páginas a serem referenciadas."
      rules={[{ required: true, message: "Informe o tamanho da fila de páginas" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Quantidade de páginas"
      key="numberOfPages"
      name="numberOfPages"
      tooltip="Número de páginas únicas."
      rules={[{ required: true, message: "Informe o número de páginas únicas" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Páginas"
      key="pages"
      name="pages"
      tooltip="Nomes das páginas."
      rules={[{ required: true, message: "Informe os nomes das páginas" }]}
    >
      <Select mode="tags" tokenSeparators={[","]} allowClear style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Fila de páginas"
      key="pagesQueue"
      name="pagesQueue"
      tooltip="Fila de páginas para serem referenciadas."
      rules={[{ required: true, message: "Informe a fila de páginas para serem referenciadas" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende dos campos 'Tamanho da fila de páginas' e 'Páginas'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setPagesQueue(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Fila de ações"
      key="actionsQueue"
      name="actionsQueue"
      tooltip="Fila de ações a serem executadas para cada página (escrita (E) ou leitura (L))."
      rules={[{ required: true, message: "Informe a fila de ações a serem executadas para cada página (escrita (E) ou leitura (L))" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende do campo 'Tamanho da fila de páginas'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setActionsQueue(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Estado inicial da memória"
      key="memoryInitalState"
      name="memoryInitalState"
      tooltip="Páginas que já estão na memória."
      rules={[{ required: true, message: "Informe as páginas que já estão na memória" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende dos campos 'Tamanho da memória' e 'Páginas'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setMemoryInitialState(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} />
    </Form.Item>

    {!!(selectedAlgorithms?.includes("nruAlgorithm") || selectedAlgorithms?.includes("secondChanceAlgorithm") || selectedAlgorithms?.includes("wsClockAlgorithm")) && <Form.Item
      label="Interrupção do relógio"
      key="clockInterruption"
      name="clockInterruption"
      tooltip="A quantas referências de página haverá uma interrupção do relógio."
      rules={[{ required: true, message: "Informe a quantas referências de página haverá uma interrupção do relógio" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende do campo 'Tamanho da fila de páginas'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setClockInterruption(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} type="number" />
    </Form.Item>}

    {!!(selectedAlgorithms?.includes("wsClockAlgorithm")) && <Form.Item
      label="τ (tau)"
      key="tau"
      name="tau"
      tooltip="Idade máxima para considerar uma página dentro do conjunto de trabalho."
      rules={[{ required: true, message: "Informe a idade máxima para considerar uma página dentro do conjunto de trabalho" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setTau(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} type="number" />
    </Form.Item>}

    <Form.Item
      label="Algoritmos"
      key="algorithms"
      name="algorithms"
      tooltip="Algoritmos a serem executados."
      rules={[{ required: true, message: "Selecione os algoritmos" }]}
    >
      <Select mode="multiple" style={{ width: "100%" }} defaultValue={algorithmNamesList} onChange={(value: string[]) => setSelectedAlgorithms(value)}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />}>Simular</Button>
        <Tooltip title={"Casos de teste que foram utilizados para validar o simulador. Selecione um caso de teste no menu (...)"}>
          <Dropdown.Button overlay={testCasesMenu} type="dashed">Usar caso de teste</Dropdown.Button>
        </Tooltip>
        <Button type="dashed" htmlType="button" icon={<SettingOutlined />} onClick={() => setRandomValues(form, setSelectedAlgorithms)}>Gerar dados aleatórios</Button>
        <Button type="dashed" htmlType="button" icon={<ClearOutlined />} onClick={onReset}>Limpar</Button>
      </Space>
    </Form.Item>
  </Form>
}