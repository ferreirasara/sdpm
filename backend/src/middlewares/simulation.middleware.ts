export const validateRequiredParams = (req: any, res: any, next: any) => {
  if (!req.body.memorySize) {
    return res.status(400).send({ success: false, message: `O campo "Tamanho da memória" é obrigatório.` })
  } else if (!req.body.pagesQueueSize) {
    return res.status(400).send({ success: false, message: `O campo "Tamanho da fila de páginas" é obrigatório.` })
  } else if (!req.body.algorithms) {
    return res.status(400).send({ success: false, message: `O campo "Algoritmos" é obrigatório.` })
  } else {
    return next();
  }
}
