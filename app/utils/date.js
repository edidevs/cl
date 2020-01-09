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

/**
 * Gets the next 14 available dates for provider starting from today.
 *
 * @param {Array.<Object>} availabilityData Data about provider's availailability. See structure in app/utils/transform.js
 * @returns {Array.<Date>} Available dates for selection.
 */
const getAvailableDates = (availabilityData) => {};

export {getAvailableDates};

/**
 * Gets the closest available date from an array of Dates.
 *
 * @param {Array.<Date>} dates Dates.
 * @returns {Date} Closest date available for selection.
 */
const getSelectedDate = (dates) => {};

export {getSelectedDate};
