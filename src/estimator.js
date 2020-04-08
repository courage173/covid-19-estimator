import {
    convertToDays,
    caseReported,
    raiseToPowValue
} from './helperFunctions'

const covid19ImpactEstimator = (data) => {

    const { reportedCases, periodType, timeToElapse } = data
    const impart = {}
    const severeImpart = {}

    //Challeng 1 /////////////////////////////////////////////////
    impart.currentlyInfected = caseReported(reportedCases, 10)
    severeImpact.currentlyInfected = caseReported(reportedCases, 50)

    //second question of challenge one
    const days = convertToDays(periodType, timeToElapse)

    const raiseToPow = raiseToPowValue(days)
    impart.infectionsByRequestedTime = raiseToPow * impart.currentlyInfected
    severeImpart.infectionsByRequestedTime = raiseToPow * severeImpart.currentlyInfected
    ///////////////////////////////////////////////////////////////////////////
    return {
        data: { ...data },
        impart,
        severeImpart

    }
}

export default covid19ImpactEstimator;
