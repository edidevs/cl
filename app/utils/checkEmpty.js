export const checkEmpty = (value, setState) => {
  let emptyArr = [
    {emptySun: 'SUN'},
    {emptyMon: 'MON'},
    {emptyTue: 'TUE'},
    {emptyWed: 'WED'},
    {emptyThu: 'THU'},
    {emptyFri: 'FRI'},
    {emptySat: 'SAT'},
  ];

  value.map(item => {
    for (let i = 1; i <= 7; i++) {
      if (item.day[i.toString()] && item.day[i.toString()].length < 1) {
        setState(emptyArr[i - 1]);
      }
    }
  });
};
