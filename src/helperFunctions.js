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
  const val = parseInt(days / 3, 10);
  return 2 ** val;
};
