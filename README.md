# Commission Fee Calculator System

## Overview
This project is designed to calculate commission fees for cash in and cash out operations based on the type of user (natural or juridical) and the amount of transaction. Only the EUR currency is supported.

## How to Run the System
1. Ensure that Node.js is installed on your system. If not, download and install it from [Node.js official website](https://nodejs.org/).
2. Clone the repository or download the source code.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies by running: `npm install`
5. To run the system, execute the command: `npm start data/transactions.json`

## How to Run Tests
1. Ensure that all dependencies are installed by running npm install if you haven't done so already.
2. Execute the tests using the command: `npm test`

## Functionality Description
 - To configurate transactions, a method for storing config in the JSON file was chosen, instead of using the API.
 - The system processes a list of transactions provided in a JSON file. Each transaction includes details such as the date, user ID, user type, operation type, amount, and currency.
 - Based on the operation type (cash_in or cash_out) and the user type (natural or juridical), the system calculates the commission fee according to predefined rules.
 - The results are outputted to the standard output, one line per transaction, showing the calculated fee without the currency symbol.