const config = require('./config');

function calculateFeeForCashIn(amount) {
    const fee = Math.min(amount * (config.cashIn.percents / 100), config.cashIn.max.amount);

    return Math.ceil(fee * 100) / 100;
}

function calculateFeeForCashOutNatural(amount, accumulatedWeekAmount) {
    const newAccumulatedAmount = accumulatedWeekAmount + amount;
    if (newAccumulatedAmount > config.cashOutNatural.week_limit.amount) {
        const previouslyTaxableAmount = Math.max(accumulatedWeekAmount - config.cashOutNatural.week_limit.amount, 0);
        const taxableAmount = Math.max(newAccumulatedAmount - config.cashOutNatural.week_limit.amount, 0) - previouslyTaxableAmount;
        const fee = taxableAmount * (config.cashOutNatural.percents / 100);

        return Math.ceil(fee * 100) / 100;
    }

    return 0;
}

function calculateFeeForCashOutJuridical(amount) {
    const fee = Math.max(amount * (config.cashOutJuridical.percents / 100), config.cashOutJuridical.min.amount);
    
    return Math.ceil(fee * 100) / 100;
}

module.exports = {
    calculateFeeForCashIn,
    calculateFeeForCashOutNatural,
    calculateFeeForCashOutJuridical
};
