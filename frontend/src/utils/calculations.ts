export interface ContType {
  name: string,
  cont: number,
  percentage?: number,
}

export const contTypesSum = (arr: ContType[]) => {
  if (!arr || !arr.length) return 0;

  const sumReducer = (total: number, newValue: number) => total + newValue;
  const values = arr.map(ct => ct.cont);
  return values.reduce(sumReducer);
}

export const addPercentageDataInContType = (countData: ContType[]) => {
  if (countData) {
    let total = 0
    // const percentageData: { name: string, count: number }[] = []
    countData.forEach(cur => {
      total += cur.cont
    })
    countData.forEach(cur => {
      /* percentageData.push({ name: cur.name, count: parseFloat(((100 * cur.count) / total).toPrecision(2)) }) */
      cur["percentage"] = parseFloat(((100.00 * cur.cont) / total).toPrecision(2))
    })
  }
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const formatNumber = (num: number) => {
  return parseFloat(num.toString()).toFixed(2)
}

export const formatSimulationTime = (simulationTime: number): { simulationTime: number, suffix: string } => {
  if (simulationTime < 1000) {
    return { simulationTime, suffix: "milissegundos" }
  } else if (simulationTime >= 1000 && simulationTime < 60000) {
    return { simulationTime: simulationTime / 1000, suffix: "segundos" }
  } else {
    return { simulationTime: simulationTime / 60000, suffix: "minutos" }
  }
}