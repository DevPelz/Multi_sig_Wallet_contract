// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IMultisig.sol";

interface IMultisigs {
    function createMultisig(
        address[] memory _admins
    ) external payable returns (IMultisig newWallets);

    // function getWallets() external view returns (Multisigy);
}
