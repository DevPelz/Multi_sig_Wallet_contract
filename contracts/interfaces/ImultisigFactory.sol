// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

interface IMultisig {
    function createTransaction(uint amount, address spender) external;
}
