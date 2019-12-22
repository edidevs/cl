let findMaxDiscount = arr => {
  let discounts = [];
  arr.map(item => {
    discounts.push(item.discount);
  });

  let result = discounts.reduce(function(p, v) {
    return p > v ? p : v;
  });

  return result;
};

let findIndexOfMaxDisount = val => {
  let discounts = [];
  val.map(item => {
    discounts.push(item.discount);
  });
  let indexOfMaxValue = discounts.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0,
  );
  return indexOfMaxValue;
};

let getEachDeal = async (day, index, stateObj) => {
  let discount = await findMaxDiscount(day);
  let idDeal = await findIndexOfMaxDisount(day);
  stateObj.setState({
    allDeal: day,
    selected: true,
    index: index,
    discount: discount,
    active: true,
    selectedDeal: false,
    activeDate: true,
    idDeal: idDeal,
  });
};

export const selectDeals = (value, index, stateObj) => {
  let daysInWeek = [
    stateObj.sun,
    stateObj.mon,
    stateObj.tue,
    stateObj.wed,
    stateObj.thu,
    stateObj.fri,
    stateObj.sat,
  ];
  if (daysInWeek[value - 1].length > 0) {
    getEachDeal(daysInWeek[value - 1], index, stateObj);
  } else {
    selectDeals(value + 1, index + 1, stateObj);
  }
};
