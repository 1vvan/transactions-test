const { getWeek } = require('date-fns');
const feeCalculator = require('./feeCalculator');

function processTransactions(transactions) {
    let results = [];
    let weeklyAccumulation = {};

    transactions.forEach(transaction => {
        let fee = 0;
        if (transaction.type === 'cash_in') {
            fee = feeCalculator.calculateFeeForCashIn(transaction.operation.amount);
        } else if (transaction.type === 'cash_out') {
            if (transaction.user_type === 'natural') {
                const key = `${transaction.user_id}-${getYearWeek(transaction.date)}`;
                const currentWeekAmount = weeklyAccumulation[key] || 0;

                fee = feeCalculator.calculateFeeForCashOutNatural(transaction.operation.amount, currentWeekAmount);
                weeklyAccumulation[key] = currentWeekAmount + transaction.operation.amount;
            } else {
                fee = feeCalculator.calculateFeeForCashOutJuridical(transaction.operation.amount);
            }
        }
        results.push(fee);
    });

    return results;
}

function getYearWeek(date) {
    const dt = new Date(date);
    return getWeek(dt, { weekStartsOn: 1 });
}

module.exports = {
    processTransactions
};
