// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./common/SafeMath.sol";
import "./common/Destructible.sol";

contract Credit is Destructible {
    using SafeMath for uint256;

    address payable public borrower;
    uint256 public requestedAmount;
    uint256 public returnAmount;
    uint256 public repaidAmount;
    uint256 public interest;
    uint256 public requestedRepayments;
    uint256 public remainingRepayments;
    uint256 public repaymentInstallment;
    uint256 public requestedDate;
    uint256 public lastRepaymentDate;
    bytes32 public description;
    bool public active = true;

    enum State {
        investment,
        repayment,
        interestReturns,
        expired,
        revoked,
        fraud
    }
    State public state;

    mapping(address => bool) public lenders;
    mapping(address => uint256) public lendersInvestedAmount;
    uint256 public lendersCount = 0;
    uint256 public revokeVotes = 0;
    mapping(address => bool) public revokeVoters;
    uint256 public fraudVotes = 0;
    mapping(address => bool) public fraudVoters;
    uint256 public revokeTimeNeeded = block.timestamp + 1 seconds;

    event LogCreditInitialized(
        address indexed _address,
        uint256 indexed timestamp
    );
    event LogCreditStateChanged(State indexed state, uint256 indexed timestamp);
    event LogCreditStateActiveChanged(
        bool indexed active,
        uint256 indexed timestamp
    );
    event LogBorrowerWithdrawal(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );
    event LogBorrowerRepaymentInstallment(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );
    event LogBorrowerRepaymentFinished(
        address indexed _address,
        uint256 indexed timestamp
    );
    event LogBorrowerChangeReturned(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );
    event LogBorrowerIsFraud(
        address indexed _address,
        bool indexed fraudStatus,
        uint256 indexed timestamp
    );
    event LogLenderInvestment(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );
    event LogLenderWithdrawal(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );
    event LogLenderChangeReturned(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );
    event LogLenderVoteForRevoking(
        address indexed _address,
        uint256 indexed timestamp
    );
    event LogLenderVoteForFraud(
        address indexed _address,
        uint256 indexed timestamp
    );
    event LogLenderRefunded(
        address indexed _address,
        uint256 indexed _amount,
        uint256 indexed timestamp
    );

    modifier isActive() {
        require(active == true, "Contract is not active");
        _;
    }

    modifier onlyBorrower() {
        require(msg.sender == borrower, "Only borrower can call this function");
        _;
    }

    modifier onlyLender() {
        require(
            lenders[msg.sender] == true,
            "Only lenders can call this function"
        );
        _;
    }

    modifier canAskForInterest() {
        require(
            state == State.interestReturns,
            "Can only ask for interest in interestReturns state"
        );
        require(
            lendersInvestedAmount[msg.sender] > 0,
            "No investment found for sender"
        );
        _;
    }

    modifier canInvest() {
        require(
            state == State.investment,
            "Investment not allowed in current state"
        );
        _;
    }

    modifier canRepay() {
        require(
            state == State.repayment,
            "Repayment not allowed in current state"
        );
        _;
    }

    modifier canWithdraw() {
        require(
            address(this).balance >= requestedAmount,
            "Insufficient balance for withdrawal"
        );
        _;
    }

    modifier isNotFraud() {
        require(state != State.fraud, "Borrower is marked as fraud");
        _;
    }

    modifier isRevokable() {
        require(
            block.timestamp >= revokeTimeNeeded,
            "Not yet eligible for revoking"
        );
        require(
            state == State.investment,
            "Revoking not allowed in current state"
        );
        _;
    }

    modifier isRevoked() {
        require(state == State.revoked, "Contract is not revoked");
        _;
    }

    constructor(
        uint256 _requestedAmount,
        uint256 _requestedRepayments,
        uint256 _interest,
        bytes32 _description
    ) {
        borrower = payable(msg.sender);
        interest = _interest;
        requestedAmount = _requestedAmount;
        requestedRepayments = _requestedRepayments;
        remainingRepayments = _requestedRepayments;
        returnAmount = requestedAmount + interest;
        repaymentInstallment = returnAmount / requestedRepayments;
        description = _description;
        requestedDate = block.timestamp;
        emit LogCreditInitialized(borrower, block.timestamp);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function invest() public payable canInvest {
        uint256 extraMoney = 0;
        if (address(this).balance >= requestedAmount) {
            extraMoney = address(this).balance - requestedAmount;
            if (extraMoney > 0) {
                payable(msg.sender).transfer(extraMoney);
                emit LogLenderChangeReturned(
                    msg.sender,
                    extraMoney,
                    block.timestamp
                );
            }
            state = State.repayment;
            emit LogCreditStateChanged(state, block.timestamp);
        }
        lenders[msg.sender] = true;
        lendersCount++;
        lendersInvestedAmount[msg.sender] += msg.value - extraMoney;
        emit LogLenderInvestment(
            msg.sender,
            msg.value - extraMoney,
            block.timestamp
        );
    }

    function repay() public payable onlyBorrower canRepay {
        require(remainingRepayments > 0, "No remaining repayments");
        require(
            msg.value >= repaymentInstallment,
            "Insufficient repayment amount"
        );
        assert(repaidAmount < returnAmount);
        remainingRepayments--;
        lastRepaymentDate = block.timestamp;
        uint256 extraMoney = 0;
        if (msg.value > repaymentInstallment) {
            extraMoney = msg.value - repaymentInstallment;
            payable(msg.sender).transfer(extraMoney);
            emit LogBorrowerChangeReturned(
                msg.sender,
                extraMoney,
                block.timestamp
            );
        }
        emit LogBorrowerRepaymentInstallment(
            msg.sender,
            msg.value - extraMoney,
            block.timestamp
        );
        repaidAmount += msg.value - extraMoney;
        if (repaidAmount == returnAmount) {
            emit LogBorrowerRepaymentFinished(msg.sender, block.timestamp);
            state = State.interestReturns;
            emit LogCreditStateChanged(state, block.timestamp);
        }
    }

    function withdraw() public isActive onlyBorrower canWithdraw isNotFraud {
        state = State.repayment;
        emit LogCreditStateChanged(state, block.timestamp);
        emit LogBorrowerWithdrawal(
            msg.sender,
            address(this).balance,
            block.timestamp
        );
        borrower.transfer(address(this).balance);
    }

    function requestInterest() public isActive onlyLender canAskForInterest {
        uint256 lenderReturnAmount = returnAmount / lendersCount;
        assert(address(this).balance >= lenderReturnAmount);
        payable(msg.sender).transfer(lenderReturnAmount);
        emit LogLenderWithdrawal(
            msg.sender,
            lenderReturnAmount,
            block.timestamp
        );
        if (address(this).balance == 0) {
            active = false;
            emit LogCreditStateActiveChanged(active, block.timestamp);
            state = State.expired;
            emit LogCreditStateChanged(state, block.timestamp);
        }
    }

    function revokeVote() public isActive isRevokable onlyLender {
        require(
            revokeVoters[msg.sender] == false,
            "Already voted for revoking"
        );
        revokeVotes++;
        revokeVoters[msg.sender] = true;
        emit LogLenderVoteForRevoking(msg.sender, block.timestamp);
        if (lendersCount == revokeVotes) {
            revoke();
        }
    }

    function revoke() internal {
        state = State.revoked;
        emit LogCreditStateChanged(state, block.timestamp);
    }

    function refund() public isActive onlyLender isRevoked {
        assert(address(this).balance >= lendersInvestedAmount[msg.sender]);
        payable(msg.sender).transfer(lendersInvestedAmount[msg.sender]);
        emit LogLenderRefunded(
            msg.sender,
            lendersInvestedAmount[msg.sender],
            block.timestamp
        );
        if (address(this).balance == 0) {
            active = false;
            emit LogCreditStateActiveChanged(active, block.timestamp);
            state = State.expired;
            emit LogCreditStateChanged(state, block.timestamp);
        }
    }

    function fraudVote() public isActive onlyLender returns (bool) {
        require(fraudVoters[msg.sender] == false, "Already voted for fraud");
        fraudVotes++;
        fraudVoters[msg.sender] = true;
        emit LogLenderVoteForFraud(msg.sender, block.timestamp);
        if (lendersCount == fraudVotes) {
            return fraud();
        }
        return true;
    }

    function fraud() internal returns (bool) {
        (bool success, ) = owner.call{value: 0}(
            abi.encodeWithSignature("setFraudStatus(address)", borrower)
        );
        emit LogBorrowerIsFraud(borrower, success, block.timestamp);
        return success;
    }

    function changeState(State _state) external onlyOwner {
        state = _state;
        emit LogCreditStateChanged(state, block.timestamp);
    }

    function toggleActive() external onlyOwner returns (bool) {
        active = !active;
        emit LogCreditStateActiveChanged(active, block.timestamp);
        return active;
    }

    function getCreditInfo()
        public
        view
        returns (
            address,
            bytes32,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            State,
            bool,
            uint256
        )
    {
        return (
            borrower,
            description,
            requestedAmount,
            requestedRepayments,
            repaymentInstallment,
            remainingRepayments,
            interest,
            returnAmount,
            state,
            active,
            address(this).balance
        );
    }
}
