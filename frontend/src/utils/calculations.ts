export function movingAverage(array: number[], position: number, periods: number) {
  let sum = 0;
  let cont = 0;
  for (let x = position; x >= 0 && (position - x) < periods; x--) {
    sum += array[x];
    cont++;
  }
  return cont ? sum / cont : 0;
}

export function round(nmb: number) {
  return Math.round(nmb * 100) / 100
}


export function countValues(arr: string[]): { cont: number, value: string }[] {
  const conts: number[] = [];
  const values: string[] = [];

  for (const cur of arr) {
    const ind = values.indexOf(cur);
    if (values.includes(cur)) {
      conts[ind] = conts[ind] + 1;
    } else {
      conts.push(1);
      values.push(cur);
    }
  }
  let resp: any[] = [];
  for (let x = 0; x < conts.length; x++) {
    resp.push({ cont: conts[x], value: values[x] })
  }
  return resp;
}


export function orderObjectsByName(objs: any[]) {

  const compare = (a: any, b: any) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }
  return objs.sort(compare);
}

export function orderObjectsByField(objs: any[], field: string) {

  const compare = (a: any, b: any) => {
    let comparison = 0;
    if (a[field] > b[field]) {
      comparison = -1;
    } else if (a[field] < b[field]) {
      comparison = 1;
    }
    return comparison;
  }
  return objs.sort(compare);
}


export interface ContType {
  name: string,
  cont: number,
  percentage?: number,
}

/**
 * Creates ContType array based on string array
 * @param orderBy (optional, default null) field to which contTypes should be ordered
 * @param arr array of containing multiple ocurrenres of several different strings
 */
export const calcContType = (arr: string[], orderBy?: 'cont' | 'name'): ContType[] => {
  const contTypes: ContType[] = []
  const valueToIndexMap: Record<string, number> = {}

  for (const cur of arr) {
    if (cur) {
      const ind = valueToIndexMap[cur]
      if (ind || ind === 0) {
        contTypes[ind].cont++
      } else {
        contTypes.push({ name: cur, cont: 1 })
        valueToIndexMap[cur] = contTypes.length - 1
      }
    }
  }
  return orderBy ? orderObjectsByField(contTypes, orderBy) : contTypes;
}

export function contTypesToHistogramArray(arr: ContType[], divider: number): number[] {
  const output: number[] = [];
  arr.forEach(cur => {
    for (let x = 0; x < cur.cont; x = x + divider) {
      output.push(parseInt(cur.name) + 0.5);
    }
  })
  return output;
}

export function filterValues(values: number[], max: number, min: number = -1) {
  let filt: number[] = [];
  for (const cur of values) {
    if (cur < max && cur > min) {
      filt.push(cur);
    }
  }
  return filt;
}

const EMAIL_REGEXP = /(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

export const isEmail = (str: string) => {
  return !!str.match(EMAIL_REGEXP);
}


export const contTypesSum = (arr: ContType[]) => {
  if (!arr || !arr.length) return 0;

  const sumReducer = (total: number, newValue: number) => total + newValue;
  const values = arr.map(ct => ct.cont);
  return values.reduce(sumReducer);
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
