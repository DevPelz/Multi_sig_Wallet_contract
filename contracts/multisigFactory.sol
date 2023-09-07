// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./multisig.sol";

contract MultisigFactory {
    Multisig[] public wallets;

    function createMultisig(
        address[] memory _admins
    ) external payable returns (Multisig newWallets) {
        newWallets = new Multisig(_admins);
        wallets.push(newWallets);
    }

    function getWallets() external view returns (Multisig[] memory) {
        return wallets;
    }
}
