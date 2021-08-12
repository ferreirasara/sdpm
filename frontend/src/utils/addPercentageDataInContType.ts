import { ContType } from './calculations'

export const addPercentageDataInContType = (countData: ContType[]) => {
  if (countData) {
    let total = 0
    // const percentageData: { name: string, count: number }[] = []
    countData.forEach(cur => {
      total += cur.cont
    })
    countData.forEach(cur => {
      /* percentageData.push({ name: cur.name, count: parseFloat(((100 * cur.count) / total).toPrecision(2)) }) */
      cur['percentage'] = parseFloat(((100.00 * cur.cont) / total).toPrecision(2))
    })
  }
}
