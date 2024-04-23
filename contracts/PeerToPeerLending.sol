// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './common/SafeMath.sol';
import './common/Destructible.sol';
import './Credit.sol';

contract PeerToPeerLending is Destructible {
    
    using SafeMath for uint256;

    struct User {
        bool credited;
        address activeCredit;
        bool fraudStatus;
        address[] allCredits;
    }

    mapping(address => User) public users;
    address[] public credits;

    event LogCreditCreated(address indexed _address, address indexed _borrower, uint256 indexed timestamp);
    event LogCreditStateChanged(address indexed _address, Credit.State indexed state, uint256 indexed timestamp);
    event LogCreditActiveChanged(address indexed _address, bool indexed active, uint256 indexed timestamp);
    event LogUserSetFraud(address indexed _address, bool fraudStatus, uint256 timestamp);

    constructor() {
    }

    function applyForCredit(uint256 requestedAmount, uint256 repaymentsCount, uint256 interest, bytes32 creditDescription) public returns(address _credit) {
        require(users[msg.sender].credited == false, "User already has an active credit");
        require(users[msg.sender].fraudStatus == false, "User is marked as fraudulent");

        assert(users[msg.sender].activeCredit == address(0));

        users[msg.sender].credited = true;

        Credit credit = new Credit(requestedAmount, repaymentsCount, interest, creditDescription);

        users[msg.sender].activeCredit = address(credit);
        credits.push(address(credit));
        users[msg.sender].allCredits.push(address(credit));

        emit LogCreditCreated(address(credit), msg.sender, block.timestamp);

        return address(credit);
    }

    function getCredits() public view returns (address[] memory) {
        return credits;
    }

    function getUserCredits() public view returns (address[] memory) {
        return users[msg.sender].allCredits;
    }

    function setFraudStatus(address _borrower) external returns (bool) {
        users[_borrower].fraudStatus = true;
        emit LogUserSetFraud(_borrower, users[_borrower].fraudStatus, block.timestamp);
        return users[_borrower].fraudStatus;
    }

    function changeCreditState(Credit _credit, Credit.State state) public onlyOwner {
        _credit.changeState(state);
        emit LogCreditStateChanged(address(_credit), state, block.timestamp);
    }

    function toggleCreditActiveState(Credit _credit) public onlyOwner {
        bool active = _credit.toggleActive();
        emit LogCreditActiveChanged(address(_credit), active, block.timestamp);
    }
}
