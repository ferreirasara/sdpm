import { algorithmNamesList } from "../utils/algorithmList"

export const validateSimulationRequiredParamsMiddleware = async (req: any, res: any, next: any) => {
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
  } else if (!req.body.algorithms) {
    return res.status(400).send({ success: false, message: `O campo "Algoritmos" é obrigatório.` })
  } else if (!req.body.clockInterruption && (req.body.algorithms.includes("nruAlgorithm") || req.body.algorithms.includes("secondChanceAlgorithm") || req.body.algorithms.includes("wsClockAlgorithm"))) {
    return res.status(400).send({ success: false, message: `O campo "Interrupção do relógio" é obrigatório.` })
  } else if (!req.body.tau && req.body.algorithms.includes("wsClockAlgorithm")) {
    return res.status(400).send({ success: false, message: `O campo "τ (tau)" é obrigatório.` })
  } else {
    return next();
  }
}

export const validateSimulationParamsIntegrityMiddleware = async (req: any, res: any, next: any) => {
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
  const pagesQueueNameNotAllowed: string[] = pagesQueue.filter(cur => !pages.includes(cur))
  const memoryInitalStateNameNotAllowed: string[] = memoryInitalState.filter(cur => !pages.includes(cur) && cur !== "0")

  if (memorySize !== memoryInitalState.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Estado inicial da memória" deve possuir a mesma quantidade de páginas informada no campo "Tamanho da memória".`
    })
  } else if (pagesQueueSize !== pagesQueue.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Fila de páginas" deve possuir a mesma quantidade de páginas informada no campo "Tamanho da fila de páginas".`
    })
  } else if (pagesQueueSize !== actionsQueue.length) {
    return res.status(400).send({
      success: false,
      message: `O campo "Fila de ações" deve possuir uma quantidade de ações igual à quantidade informada no campo "Tamanho da fila de páginas".`
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
      message: `O campo "Páginas" deve possuir a mesma quantidade de páginas informada no campo "Quantidade de páginas".`
    })
  } else if (pages.some(cur => cur.length >= 20)) {
    return res.status(400).send({
      success: false,
      message: `Os nomes de páginas no campo "Páginas" não devem ultrapassar 20 caracteres.`
    })
  } else if (pagesQueueNameNotAllowed.length) {
    const plural = pagesQueueNameNotAllowed.length > 1 ? "s" : "";
    return res.status(400).send({
      success: false,
      message: `O campo "Fila de páginas" deve possuir apenas os nomes de páginas informados no campo "Páginas". Nome${plural} não suportado${plural}: ${pagesQueueNameNotAllowed.join(", ")}`
    })
  } else if (memoryInitalStateNameNotAllowed.length) {
    const plural = memoryInitalStateNameNotAllowed.length > 1 ? "s" : "";
    return res.status(400).send({
      success: false,
      message: `O campo "Estado inicial da memória" deve possuir apenas os nomes de páginas informados no campo "Páginas" ou o caractere "0". Nome${plural} não suportado${plural}: ${memoryInitalStateNameNotAllowed.join(", ")}`
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
