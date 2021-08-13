import { SettingOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { FormInstance } from "antd/lib/form";
import { algorithmList, algorithmNamesList } from "../../../utils/algorithmList";

export interface SimulationFormProps {
  form: FormInstance<any>,
  setRandomValues: () => void,
  setMemoryInitialState: () => void,
  setPagesQueue: () => void,
  onFinish: () => void,
}

export default function SimulationForm(props: SimulationFormProps) {
  const { form, setRandomValues, setMemoryInitialState, setPagesQueue, onFinish } = props

  const algorithmsOptions = algorithmList.map(cur => { return <Select.Option value={cur.name} key={cur.name}>{cur.label}</Select.Option> })

  const formItemLayout = { labelCol: { span: 8 },  wrapperCol: { span: 16 }, }

  const onReset = () => {
    form.resetFields();
  };

  return <Form {...formItemLayout} form={form} onFinish={onFinish}>

    <Form.Item label="Tamanho da memória" key="memorySize" name="memorySize" rules={[{ required: true, message: 'Informe o tamanho da memória' }]}>
      <InputNumber style={{width: '100%'}} type="number" />
    </Form.Item>

    <Form.Item label="Tamanho da fila de páginas" key="pagesQueueSize" name="pagesQueueSize" rules={[{ required: true, message: 'Informe o tamanho da fila de páginas' }]}>
      <InputNumber style={{width: '100%'}} type="number" />
    </Form.Item>

    <Form.Item label="Quantidade de páginas" key="numberOfPages" name="numberOfPages" tooltip="Se deixado em branco, será gerado automaticamente">
      <InputNumber style={{width: '100%'}} type="number" />
    </Form.Item>

    <Form.Item label="Páginas" key="pages" name="pages" tooltip="Se deixado em branco, será gerado automaticamente">
      <Select mode="tags" tokenSeparators={[',']} allowClear style={{width: '100%'}} />
    </Form.Item>

    <Form.Item label="Fila de páginas" key="pagesQueue" name="pagesQueue" tooltip="Se deixado em branco, será gerado automaticamente">
      <Input addonAfter={<SettingOutlined onClick={setPagesQueue} />} style={{width: '100%'}} />
    </Form.Item>

    <Form.Item label="Estado inicial da memória" key="memoryInitalState" name="memoryInitalState" tooltip="Se deixado em branco, será gerado automaticamente">
      <Input addonAfter={<SettingOutlined onClick={setMemoryInitialState} />} style={{width: '100%'}} />
    </Form.Item>

    <Form.Item label="Algoritmos" key="algorithms" name="algorithms" rules={[{ required: true, message: 'Selecione os algoritmos' }]} initialValue={algorithmNamesList}>
      <Select mode="multiple" style={{width: '100%'}}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">Simular</Button>
      <Button type="link" htmlType="button" onClick={setRandomValues}>Gerar dados aleatórios</Button>
      <Button type="link" htmlType="button" onClick={onReset}>Limpar</Button>
    </Form.Item>

  </Form>
}