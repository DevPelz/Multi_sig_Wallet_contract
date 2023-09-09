// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./multisig.sol";

contract MultisigFactory {
    Multisig[] public wallets;
    event Create(Multisig _adr);

    function createMultisig(
        address[] memory _admins
    ) external payable returns (Multisig newWallets) {
        newWallets = new Multisig{value: msg.value}(_admins);
        wallets.push(newWallets);
        emit Create(newWallets);
    }

    function getWallets() external view returns (Multisig[] memory) {
        return wallets;
    }
}
