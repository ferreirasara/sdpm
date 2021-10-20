import { FormInstance, message } from "antd"
import { algorithmNamesList } from "./algorithmList"
import { getRandomInt } from "./calculations"
import { getRandomString } from "./pretifyStrings"


export const setMemoryInitialState = (form: FormInstance<any>) => {
  const memorySize = form.getFieldValue('memorySize')
  if (!memorySize) {
    message.error("Preencha o campo 'Tamanho da memória'.")
    return
  }

  const pages = form.getFieldValue('pages')
  if (!pages) {
    message.error("Preencha o campo 'Páginas'.")
    return
  }

  const memoryInitalState = generateMemoryInitialState(memorySize, pages).join('|')
  form.setFieldsValue({ memoryInitalState })
}

export const setPagesQueue = (form: FormInstance<any>) => {
  const pagesQueueSize = form.getFieldValue('pagesQueueSize')
  if (!pagesQueueSize) {
    message.error("Preencha o campo 'Tamanho da fila de páginas'.")
    return
  }

  const pages = form.getFieldValue('pages')
  if (!pages) {
    message.error("Preencha o campo 'Páginas'.")
    return
  }

  const pagesQueue = generatePagesQueue(pagesQueueSize, pages).join('|')
  form.setFieldsValue({ pagesQueue })
}

export const setActionsQueue = (form: FormInstance<any>) => {
  const pagesQueueSize = form.getFieldValue('pagesQueueSize')
  if (!pagesQueueSize) {
    message.error("Preencha o campo 'Tamanho da fila de páginas'.")
    return
  }

  const actionsQueue = generateActionsQueue(pagesQueueSize).join('|')
  form.setFieldsValue({ actionsQueue })
}

export const setClockInterruption = (form: FormInstance<any>) => {
  const pagesQueueSize = form.getFieldValue('pagesQueueSize')
  if (!pagesQueueSize) {
    message.error("Preencha o campo 'Tamanho da fila de páginas'.")
    return
  }

  const clockInterruption = generateClockInterruption(pagesQueueSize)
  form.setFieldsValue({ clockInterruption })
}

export const setTau = (form: FormInstance<any>) => {
  const tau = generateTau()
  form.setFieldsValue({ tau })
}

export const setRandomValues = (form: FormInstance<any>) => {
  const memorySize = getRandomInt(1, 100)
  const pagesQueueSize = getRandomInt(100, 1000)
  const numberOfPages = generateNumberOfPages(memorySize, pagesQueueSize)
  const pages = generatePages(numberOfPages)
  const pagesQueue = generatePagesQueue(pagesQueueSize, pages).join('|')
  const actionsQueue = generateActionsQueue(pagesQueueSize).join('|')
  const memoryInitalState = generateMemoryInitialState(memorySize, pages).join('|')
  const tau = generateTau()
  const clockInterruption = generateClockInterruption(pagesQueueSize)

  form.setFieldsValue({
    memorySize,
    pagesQueueSize,
    numberOfPages,
    pages,
    pagesQueue,
    actionsQueue,
    memoryInitalState,
    tau,
    clockInterruption,
    algorithms: algorithmNamesList,
  })
}

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

export const generateActionsQueue = (pagesQueueSize: number) => {
  const actionsQueue = []
  for (let i = 0; i < pagesQueueSize; i++) {
    if (getRandomInt(0, 2) === 1) {
      actionsQueue.push('E')
    } else {
      actionsQueue.push('L')
    }
  }
  return actionsQueue
}

export const generateClockInterruption = (pagesQueueSize: number) => {
  // This is temporary. TODO: calculate the best value
  return getRandomInt(2, pagesQueueSize / 2)
}

export const generateTau = () => {
  // This is temporary. TODO: calculate the best value
  return getRandomInt(1, 10)
}