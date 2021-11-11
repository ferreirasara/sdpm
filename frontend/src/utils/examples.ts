import { FormInstance } from "antd"

const example1 = {
  memorySize: 5,
  pagesQueueSize: 50,
  numberOfPages: 10,
  pages: ["A","B","C","D","E","F","G","H","I","J"],
  pagesQueue: "F|I|J|G|I|B|C|F|C|B|E|A|G|E|C|C|G|I|F|E|D|G|I|A|B|I|A|H|B|E|B|H|J|C|F|G|G|E|G|D|J|J|C|I|E|H|B|B|C|I",
  actionsQueue: "L|E|L|E|E|L|E|E|E|L|E|L|L|L|E|L|E|L|L|E|L|L|E|E|L|L|L|L|L|L|E|E|E|E|L|E|E|E|E|E|L|L|E|L|E|L|E|E|E|L",
  memoryInitalState: "0|0|0|0|0",
  clockInterruption: 3,
  tau: 1,
}

const example2 = {
  memorySize: 5,
  pagesQueueSize: 50,
  numberOfPages: 10,
  pages: ["A","B","C","D","E","F","G","H","I","J"],
  pagesQueue: "G|D|G|C|G|G|C|C|G|I|C|G|A|A|I|J|C|E|A|C|I|A|E|H|G|I|E|J|B|A|F|H|B|D|E|D|E|I|I|A|A|I|A|B|J|A|E|E|J|B",
  actionsQueue: "E|L|L|E|L|E|L|L|L|L|E|E|L|L|E|E|E|L|L|E|E|E|L|E|E|E|L|L|E|E|L|E|L|E|E|E|L|E|E|L|L|L|E|E|E|E|E|E|E|L",
  memoryInitalState: "G|D|0|0|A",
  clockInterruption: 3,
  tau: 1,
}

const example3 = {
  memorySize: 5,
  pagesQueueSize: 50,
  numberOfPages: 10,
  pages: ["A","B","C","D","E","F","G","H","I","J"],
  pagesQueue: "J|G|G|D|G|G|J|H|F|D|H|F|F|G|C|A|I|H|D|E|A|E|E|G|B|I|B|J|I|F|A|J|E|J|G|E|G|F|D|I|I|H|A|E|G|H|G|H|E|A",
  actionsQueue: "L|E|E|L|L|L|E|E|E|E|L|L|E|L|E|L|E|L|L|E|L|E|L|E|E|L|L|L|L|L|L|L|L|L|L|L|E|E|E|E|E|L|E|E|L|L|E|E|E|L",
  memoryInitalState: "F|E|I|D|A",
  clockInterruption: 3,
  tau: 4,
}

export const setExampleValues = (form: FormInstance<any>, selectedExample: string) => {
  if (selectedExample === "") return
  if (selectedExample === "example1") form.setFieldsValue({ ...example1 });
  if (selectedExample === "example2") form.setFieldsValue({ ...example2 });
  if (selectedExample === "example3") form.setFieldsValue({ ...example3 });
}