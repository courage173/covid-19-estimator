/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
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
  impact.hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - im;
  const sev = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - sev;
  // challenge 3
  // impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  // severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;

  // impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  // severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime*0.02;

  // const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  // const income = avgDailyIncomeInUSD;
  // const pop = avgDailyIncomePopulation;
  // impact.dollarsInFlight = impact.infectionsByRequestedTime * pop * income * days;
  // severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * pop * income * days;

  return {
    data: { ...data },
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
