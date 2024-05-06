const { getWeek } = require('date-fns'); // Importing getWeek function from date-fns library
const feeCalculator = require('./feeCalculator'); // Import fee calculator module

/**
 * Processes an array of transactions and calculates fees for each.
 * @param {Array} transactions - Array of transaction objects.
 * @returns {Array} Array of calculated fees.
 */
function processTransactions(transactions) {
    let results = []; // Array to store fee results
    let weeklyAccumulation = {}; // Object to keep track of weekly accumulations for natural cash out

    // Define handlers for each transaction type
    const handlers = {
        'cash_in': processCashIn,
        'cash_out-natural': processCashOutNatural,
        'cash_out-juridical': processCashOutJuridical
    };

    // Iterate over all transactions
    transactions.forEach(transaction => {
        // Create a key from the transaction type and user type
        const key = transaction.type === 'cash_in' ? transaction.type : transaction.type + (transaction.user_type ? '-' + transaction.user_type : '');
        const handler = handlers[key]; // Find the appropriate handler based on the key
        if (handler) {
            // If handler exists, calculate the fee and add to results
            const fee = handler(transaction, weeklyAccumulation);
            results.push(fee);
        } else {
            // If no handler exists for the key, throw an error
            throw new Error(`No handler for transaction type: ${key}`);
        }
    });

    return results; // Return the array of calculated fees
}

/**
 * Calculates fee for cash-in transactions.
 * @param {Object} transaction - Transaction object.
 * @returns {number} Calculated fee.
 */
function processCashIn(transaction) {
    return feeCalculator.calculateFeeForCashIn(transaction.operation.amount);
}

/**
 * Processes cash-out transactions for natural persons, considering weekly free limit.
 * @param {Object} transaction - Transaction object.
 * @param {Object} weeklyAccumulation - Accumulated amounts per week per user.
 * @returns {number} Calculated fee.
 */
function processCashOutNatural(transaction, weeklyAccumulation) {
    // Generate a unique key for the user and the week of the year
    const key = `${transaction.user_id}-${getYearWeek(transaction.date)}`;
    // Retrieve the current accumulated amount for this user and week, default to 0
    const currentWeekAmount = weeklyAccumulation[key] || 0;
    // Calculate the fee based on the accumulated amount
    const fee = feeCalculator.calculateFeeForCashOutNatural(transaction.operation.amount, currentWeekAmount);
    // Update the accumulation for this user and week
    weeklyAccumulation[key] = currentWeekAmount + transaction.operation.amount;
    return fee;
}

/**
 * Calculates fee for cash-out transactions for juridical persons.
 * @param {Object} transaction - Transaction object.
 * @returns {number} Calculated fee.
 */
function processCashOutJuridical(transaction) {
    return feeCalculator.calculateFeeForCashOutJuridical(transaction.operation.amount);
}

/**
 * Extracts the ISO week number from a date string.
 * @param {string} date - Date string in ISO format.
 * @returns {number} ISO week number.
 */
function getYearWeek(date) {
    const dt = new Date(date); // Convert string to date
    return getWeek(dt, { weekStartsOn: 1 }); // Get week number with Monday as the start of the week
}

// Exporting processTransactions function
module.exports = {
    processTransactions
};
