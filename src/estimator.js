import {
  convertToDays,
  caseReported,
  raiseToPowValue
} from './helperFunctions';

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = caseReported(reportedCases, 10);
  severeImpact.currentlyInfected = caseReported(reportedCases, 50);

  const days = convertToDays(periodType, timeToElapse);

  const raiseToPow = raiseToPowValue(days);
  impact.infectionsByRequestedTime = raiseToPow * impact.currentlyInfected;
  severeImpact.infectionsByRequestedTime = raiseToPow * severeImpact.currentlyInfected;
  // challenge 2 question 1
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;
  // challenge 2 question 2
  const im = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = parseInt((totalHospitalBeds * 0.35) - im, 10);
  const sev = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = parseInt((totalHospitalBeds * 0.35) - sev, 10);
  // challenge 3
  impact.casesForICUByRequestedTime = parseInt(impact.infectionsByRequestedTime * 0.05, 10);
  const sevICU = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = parseInt(sevICU * 0.05, 10);

  impact.casesForVentilatorsByRequestedTime = parseInt(impact.infectionsByRequestedTime * 0.02, 10);
  const sevVent = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = parseInt(sevVent * 0.02, 10);
  // average daily income generator new assess
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const income = avgDailyIncomeInUSD;
  const pop = avgDailyIncomePopulation;
  const impactDol = impact.infectionsByRequestedTime;
  impact.dollarsInFlight = parseFloat(impactDol * pop * income * days).toFixed(2);
  const sevDol = severeImpact.infectionsByRequestedTime;
  severeImpact.dollarsInFlight = parseFloat(sevDol * pop * income * days).toFixed(2);

  return {
    data: { ...data },
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
