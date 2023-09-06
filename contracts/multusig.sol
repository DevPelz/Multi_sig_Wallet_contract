// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// a multisig wallet
// the contract should acceppt ethers
//  aarray of signatories
// approving transactions
// napping address to bool for valid Admins
// mapping uinnt =? address => bool to track approval of each transaction
// mappping uin => address = bool to tack approval of eachh Admin
contract Multsig {
    struct Transaction {
        address spender;
        uint amount;
        uint numberOfApproval;
        bool isActive;
    }

    address[] Admins;
    uint constant MINIMUM = 3;
    uint transactionId;

    mapping(address => bool) isAdmin;
    mapping(uint => Transaction) transaction;
    mapping(uint => mapping(address => bool)) hasApproved;

    error InvalidAddress(uint positon);
    error InvalidAdminNumber(uint number);
    error dulicate(address _addr);

    fallback() external payable {}

    receive() external payable {}

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Nott a valid admin");
        _;
    }

    constructor(address[] memory _admins) payable {
        if (_admins.length < MINIMUM) {
            revert InvalidAdminNumber(MINIMUM);
        }
        for (uint i = 0; i < _admins.length; i++) {
            if (_admins[i] == address(0)) {
                revert InvalidAddress(i);
            }
            if (isAdmin[_admins[i]]) {
                revert dulicate(_admins[i]);
            }
        }

        Admins = _admins;
    }

    function createTransaction(uint amount, address spender) external {
        transactionId++;
        Transaction storage _transaction = transaction[transactionId];
        _transaction.amount = amount;
        _transaction.spender = spender;
        _transaction.isActive = true;
    }

    function ApproveTransactiobn(uint _id) external {
        require(!hasApproved[_id][msg.sender], "Already Approved");
        hasApproved[_id][msg.sender] = true;

        Transaction storage _transaction = transaction[_id];

        require(_transaction.isActive, "Not Active");
        _transaction.numberOfApproval += 1;

        uint count = _transaction.numberOfApproval;
        uint MinApproval = calcMinAppoval();

        if (count > MinApproval) {
            sendTransaction(_id);
        }
    }

    function sendTransaction(uint id) internal {
        Transaction storage _transaction = transaction[id];
        payable(_transaction.spender).transfer(_transaction.amount);
        _transaction.isActive = false;
    }

    function calcMinAppoval() public view returns (uint MinAdmin) {
        uint size = Admins.length;
        MinAdmin = (size * 70) / 100;
    }
}
