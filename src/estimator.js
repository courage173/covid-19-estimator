import {
  convertToDays, caseReported,
  raiseToPowValue
} from './helperFunctions';

const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse,
    totalHospitalBeds } = data;
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
  impact.hospitalBedsByRequestedTime = totalHospitalBeds - impact.severeCasesByRequestedTime;
  const sev = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = totalHospitalBeds - sev;
  return {
    data: { ...data },
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
