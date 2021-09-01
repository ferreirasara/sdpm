import moment from 'moment';
import 'moment/locale/pt-br';

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

export function getRandomString(size: number) {
  let string = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i++) {
      string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
}