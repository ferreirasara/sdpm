import { BookOutlined, ClearOutlined, SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Form, Input, InputNumber, Menu, Select, Space, Switch, Tooltip } from "antd";
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
  const [generateFewData, setGenerateFewData] = useState<boolean>(false);

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
      label="Tamanho da mem??ria"
      key="memorySize"
      name="memorySize"
      tooltip="Quantas p??ginas cabem na mem??ria."
      rules={[{ required: true, message: "Informe o tamanho da mem??ria" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Tamanho da fila de p??ginas"
      key="pagesQueueSize"
      name="pagesQueueSize"
      tooltip="Tamanho da fila de p??ginas a serem referenciadas."
      rules={[{ required: true, message: "Informe o tamanho da fila de p??ginas" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Quantidade de p??ginas"
      key="numberOfPages"
      name="numberOfPages"
      tooltip="N??mero de p??ginas ??nicas."
      rules={[{ required: true, message: "Informe o n??mero de p??ginas ??nicas" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="P??ginas"
      key="pages"
      name="pages"
      tooltip="Nomes das p??ginas."
      rules={[{ required: true, message: "Informe os nomes das p??ginas" }]}
    >
      <Select mode="tags" tokenSeparators={[","]} allowClear style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Fila de p??ginas"
      key="pagesQueue"
      name="pagesQueue"
      tooltip="Fila de p??ginas para serem referenciadas."
      rules={[{ required: true, message: "Informe a fila de p??ginas para serem referenciadas" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende dos campos 'Tamanho da fila de p??ginas' e 'P??ginas'.">
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
      label="Fila de a????es"
      key="actionsQueue"
      name="actionsQueue"
      tooltip="Fila de a????es a serem executadas para cada p??gina (escrita (E) ou leitura (L))."
      rules={[{ required: true, message: "Informe a fila de a????es a serem executadas para cada p??gina (escrita (E) ou leitura (L))" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende do campo 'Tamanho da fila de p??ginas'.">
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
      label="Estado inicial da mem??ria"
      key="memoryInitalState"
      name="memoryInitalState"
      tooltip="P??ginas que j?? est??o na mem??ria."
      rules={[{ required: true, message: "Informe as p??ginas que j?? est??o na mem??ria" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende dos campos 'Tamanho da mem??ria' e 'P??ginas'.">
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
      label="Interrup????o do rel??gio"
      key="clockInterruption"
      name="clockInterruption"
      tooltip="A quantas refer??ncias de p??gina haver?? uma interrup????o do rel??gio."
      rules={[{ required: true, message: "Informe a quantas refer??ncias de p??gina haver?? uma interrup????o do rel??gio" }]}
    >
      <Input addonAfter={
        <Tooltip title="Gerar automaticamente. Depende do campo 'Tamanho da fila de p??ginas'.">
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
      label="?? (tau)"
      key="tau"
      name="tau"
      tooltip="Idade m??xima para considerar uma p??gina dentro do conjunto de trabalho."
      rules={[{ required: true, message: "Informe a idade m??xima para considerar uma p??gina dentro do conjunto de trabalho" }]}
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
      <Select mode="multiple" style={{ width: "100%" }} onChange={(value: string[]) => setSelectedAlgorithms(value)}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />}>Simular</Button>
        <Tooltip trigger="click" title={"Casos de teste que foram utilizados para validar o simulador. Selecione um caso de teste no menu (...)"}>
          <Dropdown.Button
            overlay={testCasesMenu}
            type="dashed"
          >
            <BookOutlined /> Usar caso de teste
          </Dropdown.Button>
        </Tooltip>
        <Dropdown.Button
          overlay={
            <Card style={{ padding: '10px' }}>
              <Space direction="vertical">
                <div><Switch onChange={() => setGenerateFewData(!generateFewData)} /> Visualizar detalhes da execu????o dos algoritmos.</div>
                <i>Note que isso ir?? gerar uma carga de dados menor.</i>
              </Space>
            </Card>
          }
          type="dashed"
          htmlType="button"
          trigger={["click"]}
          onClick={() => setRandomValues(form, setSelectedAlgorithms, generateFewData)}
        >
          <SettingOutlined /> Gerar dados aleat??rios
        </Dropdown.Button>
        <Button type="dashed" htmlType="button" icon={<ClearOutlined />} onClick={onReset}>Limpar</Button>
      </Space>
    </Form.Item>
  </Form>
}