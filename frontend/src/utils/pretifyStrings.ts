import moment from 'moment';
import 'moment/locale/pt-br';

export function capsStart(str: string) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

export function truncate(str: string, n: number, htmlEllipsis?: boolean) {
  return (str && str.length > n) ? str.substr(0, n - 1) + (htmlEllipsis ? '&hellip;' : '...') : str;
}

export function formatDate(date: Date | string) {
  if (!date) return '-'
  return moment(date).local().format("DD/MM/YYYY");
}

export function formatDateShort(date: Date | string) {
  if (!date) return '-'
  return moment(date).local().format("DD/MM/YY");
}

export function formatDateHour(date: Date | string) {
  if (!date) return '-'
  return moment(date).local().format("DD/MM/YY HH:mm");
}

export function putSlashNinLongMessages(msg: string, limit: number) {
  const splited = msg.split(" ");
  let charCount = 0;
  let newSplit = [];

  for (let x = 0; x < splited.length; x++) {
    newSplit.push(splited[x]);
    charCount += splited[x].length;
    if (charCount > limit) {
      charCount = 0;
      newSplit.push("\n");
    }
  }
  return newSplit.join(" ");
}

export function asPercentage(num: number) {
  return (num * 100).toFixed(1) + " %";
}

export function getRandomString(size: number) {
  let string = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i++) {
      string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
}