let pushDeal = (item, day) => {
  if (item.active === 1) {
    day.push(item);
  }
};

export const saveToState = val => {
  let sun = [];
  let mon = [];
  let tue = [];
  let wed = [];
  let thu = [];
  let fri = [];
  let sat = [];
  let days = [sun, mon, tue, wed, thu, fri, sat];
  let all = [];

  val.data.map(item => {
    for (let i = 0; i < days.length; i++) {
      if (item.day_of_week === i) {
        pushDeal(item, days[i]);
      }
    }
  });
  all.push(
    {day: {'1': sun}},
    {day: {'2': mon}},
    {day: {'3': tue}},
    {day: {'4': wed}},
    {day: {'5': thu}},
    {day: {'6': fri}},
    {day: {'7': sat}},
  );

  let data = [sun, mon, tue, wed, thu, fri, sat, all];
  return data;
};
