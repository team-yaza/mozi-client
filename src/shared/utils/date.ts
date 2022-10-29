import dayjs from 'dayjs';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DATESLENGTH = 42;
const SLICEMONTHLENGTH = -2;
const HOURS = 12;
const DAYHOURS = 24;

export const dateToString = (date: Date) => DAYS[date.getDay()] + ', ' + MONTHS[date.getMonth()] + ' ' + date.getDate();

export const dateToFormatString = (date: Date) =>
  date.getFullYear() +
  '.' +
  ('0' + (date.getMonth() + 1)).slice(SLICEMONTHLENGTH) +
  '.' +
  ('0' + date.getDate()).slice(SLICEMONTHLENGTH);

export const getYearMonth = (date: Date) =>
  date.getFullYear() + '.' + ('0' + (date.getMonth() + 1)).slice(SLICEMONTHLENGTH);

export const getCalendarDates = (date: Date) => {
  const newDate = dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-1`);
  const dates = [];

  let tempDate = newDate;
  for (let i = 0; i < newDate.get('d'); i++) {
    tempDate = tempDate.set('D', tempDate.get('D') - 1);
    dates.unshift({ year: tempDate.get('y'), month: tempDate.get('M'), date: tempDate.get('D') });
  }

  let i = DATESLENGTH - dates.length;
  tempDate = newDate;
  while (i--) {
    dates.push({ year: tempDate.get('y'), month: tempDate.get('M'), date: tempDate.get('D') });
    tempDate = tempDate.set('D', tempDate.get('D') + 1);
  }

  return dates;
};

export const getDateToHour = (date: Date) =>
  ('0' + ((date.getHours() + DAYHOURS) % HOURS || HOURS)).slice(SLICEMONTHLENGTH);

export const getDateToMin = (date: Date) => ('0' + date.getMinutes()).slice(SLICEMONTHLENGTH);

export const dateDiff = (date1?: Date | string, date2?: Date | string) => {
  if (!date1 || !date2) return false;
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);

  if (
    newDate1.getFullYear() !== newDate2.getFullYear() ||
    newDate1.getMonth() !== newDate2.getMonth() ||
    newDate1.getDate() !== newDate2.getDate()
  )
    return false;

  return true;
};

export const checkAlarm = (todoDate: string) => {
  const nowDate = new Date();
  const alarmDate = new Date(todoDate);

  if (
    dateDiff(nowDate, alarmDate) &&
    nowDate.getHours() === alarmDate.getHours() &&
    nowDate.getMinutes() >= alarmDate.getMinutes()
  )
    return true;
  return false;
};
