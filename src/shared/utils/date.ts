import dayjs from 'dayjs';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const dateToString = (date: Date) => DAYS[date.getDay()] + ', ' + MONTHS[date.getMonth()] + ' ' + date.getDate();

export const getYearMonth = (date: Date) => date.getFullYear() + '.' + ('0' + (date.getMonth() + 1)).slice(-2);

export const getCalendarDates = (date: Date) => {
  const newDate = dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-1`);
  const dates = [];

  let tempDate = newDate;
  for (let i = 0; i < newDate.get('d'); i++) {
    tempDate = tempDate.set('D', tempDate.get('D') - 1);
    dates.unshift([tempDate.get('M'), tempDate.get('D')]);
  }

  let i = 6 * 7 - dates.length;
  tempDate = newDate;
  while (i--) {
    dates.push([tempDate.get('M'), tempDate.get('D')]);
    tempDate = tempDate.set('D', tempDate.get('D') + 1);
  }

  return dates;
};
