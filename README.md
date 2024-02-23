*Blockchain Voting System*

This project implements a blockchain-based voting system using Solidity, Truffle, and Ganache. The system allows two participants to vote using testnet Ether from MetaMask.

Features
Secure Voting: Utilizes the security and transparency of the blockchain for voting.
Participant Roles: Defines two participant roles (e.g., voters and candidates) in the voting process.
Truffle Tests: Includes Truffle tests to ensure the correctness of the smart contract.
Setup
Install Dependencies:

sh
Copy code
npm install
Compile Contracts:

sh
Copy code
truffle compile
Run Ganache:
Start Ganache and ensure it is running on the correct port.

Migrate Contracts:

sh
Copy code
truffle migrate
Configure MetaMask:
Configure MetaMask to use the Ganache test network and import testnet Ether.

Run Tests:

sh
Copy code
truffle test
Usage
Start the Application:

sh
Copy code
npm start
Access the Application:
Open the application in your browser and connect MetaMask.

Cast Votes:
Cast votes as a participant using the provided interface.
