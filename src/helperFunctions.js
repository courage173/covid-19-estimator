
export const caseReported = (value, mult) => value * mult;

export const convertToDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return timeToElapse;
  }
};

export const raiseToPowValue = (days) => {
  if (days > 2) {
    const val = parseInt(days / 2, 10);
    return 2 ** val;
  }
  return days;
};
