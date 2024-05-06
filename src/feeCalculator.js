const config = require('./config'); // Load configuration for transaction fees

/**
 * Calculates the fee for a cash-in transaction.
 * @param {number} amount - The amount of the transaction.
 * @returns {number} The calculated fee, rounded up to the nearest cent.
 */
function calculateFeeForCashIn(amount) {
    // Calculate the fee as a percentage of the transaction amount
    const fee = Math.min(amount * (config.cashIn.percents / 100), config.cashIn.max.amount);
    // Round up to the nearest cent
    return Math.ceil(fee * 100) / 100;
}

/**
 * Calculates the fee for a cash-out transaction for natural persons,
 * considering the weekly free limit.
 * @param {number} amount - The amount of the transaction.
 * @param {number} accumulatedWeekAmount - The total accumulated amount for the week so far.
 * @returns {number} The calculated fee, rounded up to the nearest cent.
 */
function calculateFeeForCashOutNatural(amount, accumulatedWeekAmount) {
    // Calculate new total amount for the week including this transaction
    const newAccumulatedAmount = accumulatedWeekAmount + amount;
    // Check if the new accumulated amount exceeds the free limit
    if (newAccumulatedAmount > config.cashOutNatural.week_limit.amount) {
        // Calculate the amount that was already taxable before this transaction
        const previouslyTaxableAmount = Math.max(accumulatedWeekAmount - config.cashOutNatural.week_limit.amount, 0);
        // Calculate the taxable amount for this transaction
        const taxableAmount = Math.max(newAccumulatedAmount - config.cashOutNatural.week_limit.amount, 0) - previouslyTaxableAmount;
        const fee = taxableAmount * (config.cashOutNatural.percents / 100);
        // Round up to the nearest cent
        return Math.ceil(fee * 100) / 100;
    }

    return 0; // No fee if within the free limit
}

/**
 * Calculates the fee for a cash-out transaction for juridical persons.
 * @param {number} amount - The amount of the transaction.
 * @returns {number} The calculated fee, rounded up to the nearest cent.
 */
function calculateFeeForCashOutJuridical(amount) {
    // Calculate the fee as a percentage of the transaction amount, ensuring it is not below a minimum
    const fee = Math.max(amount * (config.cashOutJuridical.percents / 100), config.cashOutJuridical.min.amount);
    // Round up to the nearest cent
    return Math.ceil(fee * 100) / 100;
}

// Export functions for use in other modules
module.exports = {
    calculateFeeForCashIn,
    calculateFeeForCashOutNatural,
    calculateFeeForCashOutJuridical
};
