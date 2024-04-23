// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ownable {
    address public owner;

    event LogOwnershipTransfered(
        address indexed _currentOwner,
        address indexed _newOwner
    );

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // @dev - The ownership shouldn't be transferrable. Otherwise it will mess up the members logic.
    /* function transferOwnership(address _newOwner) public onlyOwner {
         owner = _newOwner;
         LogOwnershipTransfered(msg.sender, _newOwner);
     } */
}
