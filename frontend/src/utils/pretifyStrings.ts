import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { algorithmList } from "./algorithmList";

export function formatDateHour(date: Date | string) {
  if (!date) return "-"
  return dayjs(date).format("DD/MM/YY HH:mm");
  // return moment(date).local().format("DD/MM/YY HH:mm");
}

export function getRandomString(size: number) {
  let string = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < size; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
}

export const pretifyAlgorithmName = (algorithmName: string) => {
  return algorithmList.find(cur => cur.name === algorithmName)?.label || ""
}