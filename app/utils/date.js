let list = () => {
  let dates = [];
  let date = new Date();
  let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DES',
  ];

  for (let i = 0; i <= 14; i++) {
    let tempDate = new Date();
    tempDate.setDate(date.getDate() + i);
    let str =
      days[tempDate.getDay()] +
      '/' +
      pad(tempDate.getDate()) +
      '/' +
      months[tempDate.getMonth()] +
      '/' +
      (1 + tempDate.getDay());
    // str.split("/");
    dates.push(str.split('/'));
  }

  return dates;
};

let pad = n => {
  return n < 10 ? '0' + n : n;
};

export const dates = () => {
  return list();
};
