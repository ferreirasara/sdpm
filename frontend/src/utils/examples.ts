import { FormInstance } from "antd"

const example1 = {
  memorySize: 3,
  pagesQueueSize: 13,
  numberOfPages: 6,
  pages: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'],
  pagesQueue: 'A1|A2|A3|A2|A3|B2|B3|A1|A2|A3|A2|A1|A3',
  memoryInitalState: '0|0|0',
  tau: 1,
}

const example2 = {
  memorySize: 3,
  pagesQueueSize: 12,
  numberOfPages: 6,
  pages: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'],
  pagesQueue: 'A2|A3|B2|B3|A1|A2|A3|B2|B1|B3|B2|A3',
  memoryInitalState: 'A1|A2|A3',
  tau: 1,
}

export const setExampleValues = (form: FormInstance<any>, selectedExample: string) => {
  if (selectedExample === '') return
  if (selectedExample === 'example1') form.setFieldsValue({ ...example1 });
  if (selectedExample === 'example2') form.setFieldsValue({ ...example2 });
}