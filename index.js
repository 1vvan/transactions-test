const fs = require('fs');
const transactionProcessor = require('./src/transactionProcessor');

function main(inputFilePath) {
    fs.readFile(inputFilePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            const transactions = JSON.parse(data);
            const fees = transactionProcessor.processTransactions(transactions);
            fees.forEach(fee => console.log(fee.toFixed(2)));
        } catch (error) {
            console.error('Error processing transactions:', error);
        }
    });
}

const inputFilePath = process.argv[2];
main(inputFilePath);