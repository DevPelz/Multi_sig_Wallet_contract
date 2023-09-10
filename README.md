# Multisig Wallet Smart Contract

This Solidity smart contract implements a Multisig Wallet system, allowing multiple admins to collectively approve transactions. It accepts ethers and enforces a minimum approval threshold.

## Overview

The contract offers the following features:

- **Multisig Functionality**: Requires approval from multiple admins for transaction execution.
- **Admin Management**: Admins are added during contract deployment and have transaction approval authority.
- **Minimum Approval Threshold**: Default threshold is 70% of total admins.

## Getting Started

1. Compile the contract using a Solidity compiler.
2. Deploy it on Ethereum, specifying initial admin addresses.
3. Interact with the contract using provided functions.

## Usage

- Deploy Contract: Provide an admin list with at least the `MINIMUM` admins (default is 3).
- Create Transaction: Call `createTransaction` with the amount and spender's address.
- Approve Transaction: Admins use `ApproveTransaction` with the transaction ID.
- Check Transaction Details: Use `getTransaction` with the transaction ID.
