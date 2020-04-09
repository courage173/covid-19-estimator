/* eslint-disable linebreak-style */

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
  const val = Math.floor(days / 3);
  return 2 ** val;
};
