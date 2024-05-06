const fs = require('fs'); // Import the file system module for file operations
const transactionProcessor = require('./src/transactionProcessor'); // Import the transaction processing module

/**
 * Main function that reads a file containing transactions and processes them to calculate fees.
 * @param {string} inputFilePath - Path to the file containing the transactions data in JSON format.
 */
function main(inputFilePath) {
    // Read the file asynchronously, with UTF-8 encoding
    fs.readFile(inputFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            // Log an error message if there is an error reading the file
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Parse the JSON data from the file
            const transactions = JSON.parse(data);
            // Process the transactions to calculate the fees
            const fees = transactionProcessor.processTransactions(transactions);
            // Output each calculated fee, formatted to two decimal places
            fees.forEach(fee => console.log(fee.toFixed(2)));
        } catch (error) {
            // Log an error message if there is an error in processing the transactions
            console.error('Error processing transactions:', error);
        }
    });
}

// Get the file path from command line arguments
const inputFilePath = process.argv[2];
// Call the main function with the input file path
main(inputFilePath);
