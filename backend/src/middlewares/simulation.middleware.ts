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
  } else if (!req.body.memoryInitalState) {
    return res.status(400).send({ success: false, message: `O campo "Estado inicial da memória" é obrigatório.` })
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
  const pagesQueue: string[] = (req.body.pagesQueue as string).split('|').filter(cur => cur !== '#')
  const memoryInitalState: string[] = req.body.memoryInitalState.split('|')
  const algorithmsNotAllowed: string[] = (req.body.algorithms as string[]).filter(cur => !algorithmNamesList.includes(cur))

  if (memorySize !== memoryInitalState.length) {
    return res.status(400).send({ success: false, message: `O campo "Estado inicial da memória" deve possuir comprimento igual ao tamanho da memória.` })
  } else if (pagesQueueSize !== pagesQueue.length) {
    return res.status(400).send({ success: false, message: `O campo "Fila de páginas" deve possuir comprimento igual ao tamanho da fila de páginas.` })
  } else if (numberOfPages !== pages.length) {
    return res.status(400).send({ success: false, message: `O campo "Páginas" deve possuir comprimento igual à quantidade de páginas.` })
  } else if (algorithmsNotAllowed.length) {
    const plural = algorithmsNotAllowed.length > 1
    return res.status(400).send({ success: false, message: `Algoritmo${plural ? 's' : ''} não suportado${plural ? 's' : ''}: ${algorithmsNotAllowed.join(', ')}.` })
  } else {
    return next();
  }
}
