import { algorithmNamesList } from "../utils/algorithmList"

export const validateRequiredParamsMiddleware = async (req: any, res: any, next: any) => {
  if (!req.body.memorySize) {
    return res.status(400).send({ success: false, message: `O campo "Tamanho da memória" é obrigatório.` })
  } else if (!req.body.pagesQueueSize) {
    return res.status(400).send({ success: false, message: `O campo "Tamanho da fila de páginas" é obrigatório.` })
  } else if (!req.body.numberOfPages) {
    return res.status(400).send({ success: false, message: `O campo "Quantidade de páginas" é obrigatório.` })
  } else if (!req.body.pages) {
    return res.status(400).send({ success: false, message: `O campo "Páginas" é obrigatório.` })
  } else if (!req.body.pagesQueue) {
    return res.status(400).send({ success: false, message: `O campo "Fila de páginas" é obrigatório.` })
  } else if (!req.body.actionsQueue) {
    return res.status(400).send({ success: false, message: `O campo "Fila de ações" é obrigatório.` })
  } else if (!req.body.memoryInitalState) {
    return res.status(400).send({ success: false, message: `O campo "Estado inicial da memória" é obrigatório.` })
  } else if (!req.body.clockInterruption) {
    return res.status(400).send({ success: false, message: `O campo "Interrupção do relógio" é obrigatório.` })
  } else if (!req.body.tau) {
    return res.status(400).send({ success: false, message: `O campo "τ (tau)" é obrigatório.` })
  } else if (!req.body.algorithms) {
    return res.status(400).send({ success: false, message: `O campo "Algoritmos" é obrigatório.` })
  } else {
    return next();
  }
}

export const validateParamsIntegrityMiddleware = async (req: any, res: any, next: any) => {
  const memorySize: number = req.body.memorySize
  const pagesQueueSize: number = req.body.pagesQueueSize
  const numberOfPages: number = req.body.numberOfPages
  const pages: string[] = req.body.pages
  const pagesQueue: string[] = (req.body.pagesQueue as string).split("|")
  const actionsQueue: string[] = (req.body.actionsQueue as string).split("|")
  const actionsQueueCharNotAllowed: string[] = actionsQueue.filter(cur => cur !== "|" && cur !== "E" && cur !== "L")
  const memoryInitalState: string[] = req.body.memoryInitalState.split("|")
  const clockInterruption: number = req.body.clockInterruption
  const algorithmsNotAllowed: string[] = (req.body.algorithms as string[]).filter(cur => !algorithmNamesList.includes(cur))

  if (memorySize !== memoryInitalState.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Estado inicial da memória" deve possuir comprimento igual ao tamanho da memória.`
    })
  } else if (pagesQueueSize !== pagesQueue.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Fila de páginas" deve possuir comprimento igual ao tamanho da fila de páginas.`
    })
  } else if (pagesQueueSize !== actionsQueue.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Fila de ações" deve possuir comprimento igual ao tamanho da fila de páginas.`
    })
  } else if (actionsQueueCharNotAllowed.length) {
    const plural = actionsQueueCharNotAllowed.length > 1 ? "s" : "";
    return res.status(400).send({
      success: false,
      message: `O campo "Fila de ações" deve possuir apenas os caracteres "|", "E" e "L". Caracter${plural ? "es" : ""} não suportado${plural}: ${actionsQueueCharNotAllowed.join(", ")}.`
    })
  } else if (numberOfPages !== pages.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Páginas" deve possuir comprimento igual à quantidade de páginas.`
    })
  } else if (clockInterruption >= pagesQueueSize) {
    return res.status(400).send({
      success: false,
      message: `O campo "Interrupção do relógio" deve ser menor que o tamanho da fila de páginas.`
    })
  } else if (algorithmsNotAllowed.length) {
    const plural = algorithmsNotAllowed.length > 1 ? "s" : "";
    return res.status(400).send({
      success: false,
      message: `Algoritmo${plural} não suportado${plural}: ${algorithmsNotAllowed.join(", ")}.`
    })
  } else {
    return next();
  }
}
