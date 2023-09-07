// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

interface IMultisig {
    struct Transaction {
        address spender;
        uint amount;
        uint numberOfApproval;
        bool isActive;
    }

    function createTransaction(uint amount, address spender) external;

    function ApproveTransaction(uint _id) external;

    function sendTransaction(uint id) external;

    function getTransaction(uint id) external returns (Transaction memory);

    function calcMinAppoval() external view returns (uint MinAdmin);
}
