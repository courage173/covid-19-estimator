
export const caseReported = (value, mult) => value * mult;



export const convertToDays = (periodType, timeToElapse) => {
    switch (periodType) {
        case 'days':
            return timeToElapse;
        case 'weeks':
            const weeks = timeToElapse * 7;
            return weeks;
        case 'months':
            const months = timeToElapse * 30;
            return months;
        default:
            return timeToElapse;
    }
};

export const raiseToPowValue = (days) => {
    if (days > 2) {
        const val = parseInt(days / 2);
        return Math.pow(2, val);
    }
};
