$(document).ready(async function () {
    let peerToPeerLendingContract = "0xCa94a46700585d79AE5A97c4d03b6817B8F8ee25";
    let peerToPeerLendingContractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "active", "type": "bool" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogCreditActiveChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_borrower", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogCreditCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "enum Credit.State", "name": "state", "type": "uint8" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogCreditStateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_currentOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "LogOwnershipTransfered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "fraudStatus", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogUserSetFraud", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "credits", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "destroy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }], "name": "destroyAndSend", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "users", "outputs": [{ "internalType": "bool", "name": "credited", "type": "bool" }, { "internalType": "address", "name": "activeCredit", "type": "address" }, { "internalType": "bool", "name": "fraudStatus", "type": "bool" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "uint256", "name": "requestedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "repaymentsCount", "type": "uint256" }, { "internalType": "uint256", "name": "interest", "type": "uint256" }, { "internalType": "bytes32", "name": "creditDescription", "type": "bytes32" }], "name": "applyForCredit", "outputs": [{ "internalType": "address", "name": "_credit", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCredits", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getUserCredits", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "_borrower", "type": "address" }], "name": "setFraudStatus", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract Credit", "name": "_credit", "type": "address" }, { "internalType": "enum Credit.State", "name": "state", "type": "uint8" }], "name": "changeCreditState", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract Credit", "name": "_credit", "type": "address" }], "name": "toggleCreditActiveState", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

    let creditContractABI = [{ "inputs": [{ "internalType": "uint256", "name": "_requestedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_requestedRepayments", "type": "uint256" }, { "internalType": "uint256", "name": "_interest", "type": "uint256" }, { "internalType": "bytes32", "name": "_description", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerChangeReturned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "fraudStatus", "type": "bool" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerIsFraud", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerRepaymentFinished", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerRepaymentInstallment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogCreditInitialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bool", "name": "active", "type": "bool" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogCreditStateActiveChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum Credit.State", "name": "state", "type": "uint8" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogCreditStateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogLenderChangeReturned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogLenderInvestment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogLenderRefunded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogLenderVoteForFraud", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogLenderVoteForRevoking", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "LogLenderWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_currentOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "LogOwnershipTransfered", "type": "event" }, { "inputs": [], "name": "active", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrower", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "destroy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }], "name": "destroyAndSend", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "fraudVoters", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fraudVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "interest", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastRepaymentDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lenders", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lendersCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lendersInvestedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "remainingRepayments", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "repaidAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "repaymentInstallment", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "requestedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "requestedDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "requestedRepayments", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "returnAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "revokeTimeNeeded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "revokeVoters", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "revokeVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "state", "outputs": [{ "internalType": "enum Credit.State", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "invest", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "repay", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "requestInterest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "revokeVote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "fraudVote", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum Credit.State", "name": "_state", "type": "uint8" }], "name": "changeState", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "toggleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCreditInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "enum Credit.State", "name": "", "type": "uint8" }, { "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

    const provider = await detectEthereumProvider();
    if (!provider) return;

    const web3 = new Web3(window.ethereum);

    $("#login").click(async function () {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to the blockchain");
            window.location = "/";
        } catch (error) {
            console.error(error);
        }
    });

    const coinbase = await web3.eth.getCoinbase()

    console.log({ coinbase });

    let peerToPeerLendingContractInstance = new web3.eth.Contract(peerToPeerLendingContractABI, peerToPeerLendingContract);
    let creditStates = ["Investment", "Repayment", "Interest returns", "Expired", "Revoked", "Fraud"];

    peerToPeerLendingContractInstance.methods.getCredits().call().then(function (result) {


        console.log("getcredits", { result });

        result.forEach(function (index) {
            let creditAddress = index;

            let creditContract = new web3.eth.Contract(creditContractABI, creditAddress);

            creditContract.methods.getCreditInfo().call().then(function (info) {
                let creditContractInfo = {
                    address: creditAddress,
                    borrower: info[0],
                    description: web3.utils.hexToAscii(info[1]),
                    requestedAmount: info[2].toString(10),
                    requestedRepayments: info[3].toString(10),
                    repaymentInstallment: info[4].toString(10),
                    remainingRepayments: info[5].toString(10),
                    interest: info[6].toString(10),
                    returnAmount: info[7].toString(10),
                    state: parseInt(info[8].toString(10)),
                    active: info[9],
                    balance: info[10].toString(10)
                }

                $('#activeCredits')
                    .append(`<div class="col-sm-6 mt-5">
                                <div class="card">
                                    <div class="card-header ${ creditContractInfo.active == true ? "alert-success" : "alert-secondary" }">
                                        <h5 class="card-title">${ creditContractInfo.description }</h5>
                                        <p>State: <span class="badge badge-primary">${ creditStates[creditContractInfo.state] }</span></p>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">
                                            <span class="credit-description-property">Address:</span> ${ creditContractInfo.address }
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Borrower:</span> <span class="text-primary">${ creditContractInfo.borrower }</span>
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Requested:</span> ${ web3.utils.fromWei(creditContractInfo.requestedAmount, "ether") } ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Funded:</span> ${ web3.utils.fromWei(creditContractInfo.balance, "ether") } ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Installments Count:</span> ${ creditContractInfo.requestedRepayments }
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Interest:</span> ${ web3.utils.fromWei(creditContractInfo.interest, "ether") } ETH
                                        </p>
                                    </div>
                                    <div class="card-footer">

                                        <div class="input-group mb-3 investment-card" ${ creditContractInfo.state !== 0 ? 'style="display:none;"' : '' }>
                                          <input type="number" class="form-control" name="amount" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon2">
                                          <div class="input-group-append">
                                            <button class="btn btn-outline-success" type="button" name="invest" data-contract-address="${ creditContractInfo.address }">Invest</button>
                                          </div>
                                        </div>
                                        <div class="mb-3">

                                            <button type="button" class="btn btn-warning" name="refund" data-contract-address="${ creditContractInfo.address }" ${ creditStates[creditContractInfo.state] === "Expired" ? 'disabled' : ''}>Refund</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)
                // <button type="button" class="btn btn-warning" name="revokeVote" data-contract-address="${ creditContractInfo.address }">Revoke vote</button>
                // <button type="button" class="btn btn-danger" name="fraudVote" data-contract-address="${ creditContractInfo.address }">Fraud</button>
                //  <button type="button"  class="btn btn-info" ${ creditContractInfo.state !== 2 ? 'style="display:none;"' : '' } name="requestInterest" data-contract-address="${ creditContractInfo.address }">Get interest</button>


            }).catch(error => console.error(error));


        })
    }).catch(error => console.error(error));


    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
        if (!error) {
            console.log('New block header: ', result);
            web3.eth.getBlock(result, (error, block) => {
                if (!error) {
                    block.transactions.forEach(txHash => {
                        web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
                            if (!error) {
                                console.log('Transaction receipt: ', receipt);
                            } else {
                                console.error('Error fetching transaction receipt: ', error);
                            }
                        });
                    });
                } else {
                    console.error('Error fetching block: ', error);
                }
            });
        } else {
            console.error('Error fetching new block header: ', error);
        }
    });


    $('body').on('click', 'button[name="invest"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let amountField = $(this).closest('div.investment-card').find('input');
        let amount = amountField.val();
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.invest().encodeABI();

        if (amount < 0 || amount == "" || amount == "undefined") {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Amount is missing!',
            })
            return;
        }

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, invest!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const result = await web3.eth.sendTransaction({
                        from: coinbase,
                        to: address,
                        data: getData,
                        value: web3.utils.toWei(amount, "ether")
                    });

                    console.log("tx.hash:", result.transactionHash);
                    console.log("invest", { result });

                    swal(
                        'Invested!',
                        'Your investment was sent.',
                        'success'
                    );

                    amountField.val('');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error(error);
                    // Handle error
                }

            }
        })
    });

    $('body').on('click', 'button[name="repayInstallment"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let amountField = $(this).closest('div.investment-card').find('input');
        let amount = amountField.val();
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);

        if (amount < 0 || amount === "" || amount === undefined) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Amount is missing!',
            });
            return;
        }

        // Call the repay function directly without encoding ABI data
        selectedCreditContract.methods.repay().send({ from: coinbase, value: web3.utils.toWei(amount, "ether"), gas: 3000000 })
            .on('transactionHash', function (hash) {
                // Transaction hash is received
                console.log("tx.hash: " + hash);
            })
            .on('receipt', function (receipt) {
                // Transaction receipt is received
                console.log('Receipt:', receipt);
                swal(
                    'Success!',
                    'Your repayment was collected.',
                    'success'
                );
                amountField.val('');
            })
            .on('error', function (error) {
                // Transaction encountered an error
                console.error('Error:', error);
                swal(
                    'Error!',
                    'Transaction failed.',
                    'error'
                );
            });
    });

    $('body').on('click', 'button[name="requestInterest"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);

        // Send the transaction directly without encoding ABI data
        selectedCreditContract.methods.requestInterest().send({ from: coinbase, gas: 3000000 })
            .on('transactionHash', function (hash) {
                // Transaction hash is received
                console.log("tx.hash: " + hash);
            })
            .on('receipt', function (receipt) {
                // Transaction receipt is received
                console.log('Receipt:', receipt);
            })
            .on('error', function (error) {
                // Transaction encountered an error
                console.error('Error:', error);
            });
    });


    $('body').on('click', 'button[name="refund"]', async function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        // let address = "0xCCe8cF4795A19D6573A39d65eEBAdAdDCCcCfDe9"

        console.log('refund request from ' + address);

        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        // let getData = selectedCreditContract.methods.refund().encodeABI();

        // console.log("refund", { getData })

        try {
            // const result = await web3.eth.sendTransaction({
            //     from: coinbase,
            //     to: address,
            //     data: getData
            // });

            const result = await selectedCreditContract.methods.refund().send({
                from: coinbase,
                gas: 3000000
            });


            console.log("refund", { result });
        } catch (error) {
            console.error(error);
        }

    });

    $('body').on('click', 'button[name="revokeVote"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');

        console.log('revoke vote ' + address);

        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.revokeVote().encodeABI();
        web3.eth.sendTransaction({ from: coinbase, to: address, data: getData }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result);
        })
    });

    $('body').on('click', 'button[name="fraudVote"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.fraudVote().encodeABI();

        console.log('fraud vote ' + address);

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, vote!'
        }).then((result) => {
            if (result.value) {
                web3.eth.sendTransaction({ from: coinbase, to: address, data: getData }, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    swal(
                        'Voted!',
                        'Your vote was saved.',
                        'success'
                    )
                    console.log(result);
                })
            }
        })
    });


    //     $('body').on('click', 'button[name="withdraw"]', function (e) {
    //         e.preventDefault();
    //         let address = $(this).attr('data-contract-address');
    //         let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);

    //         console.log('withdraw ' + address);

    //         web3.eth.sendTransaction({ from: "0x6122D598AFDb5732c5bF41aaE186D28256Dbabd2", to: "0x876373F0aAe172Db333A2f38664eA0F417Ce15Ec", value: web3.utils.toWei("10", "ether") }, function (err, result) {

    //             // selectedCreditContract.methods.withdraw().send({ from: coinbase }).then(function (result) {
    //             if (result) {

    //                 swal(
    //                     'Success!',
    //                     'Your account was credited.',
    //                     'success'
    //                 )
    //             }
    //             //     console.log(result);
    //             // }).catch(error => console.error(error));
    //     });
    // })

    $('body').on('click', 'button[name="withdraw"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);

        console.log('withdraw ' + address);

        // Call the withdraw function on the smart contract
        selectedCreditContract.methods.withdraw().send({ from: coinbase, gas: 3000000 })
            .on('transactionHash', function (hash) {
                // Transaction hash is received
                console.log('Transaction hash:', hash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                // Transaction is confirmed
                console.log('Confirmation number:', confirmationNumber);
                console.log('Receipt:', receipt);
                swal(
                    'Success!',
                    'Your account was credited.',
                    'success'
                );
            })
            .on('error', function (error, receipt) {
                // Transaction encountered an error
                console.error('Error:', error);
                console.log('Receipt:', receipt);
                swal(
                    'Error!',
                    'Transaction failed.',
                    'error'
                );
            });
    });



    $('body').on('submit', '#borrowRequest', function (e) {
        e.preventDefault();

        let creditDescription = $(this).find('input[name="creditDescription"]').val();
        let creditRequestedAmount = $(this).find('input[name="creditRequestedAmount"]').val();
        let creditRequestedInstallmentsCount = $(this).find('input[name="creditRequestedInstallmentsCount"]').val();
        let creditRequestedInterest = $(this).find('input[name="creditRequestedInterest"]').val();

        let padded = `${ web3.utils.asciiToHex(creditDescription) }`.padEnd(66, '0');

        peerToPeerLendingContractInstance.methods.applyForCredit(
            web3.utils.toWei(creditRequestedAmount, "ether").toString(10),
            creditRequestedInstallmentsCount,
            web3.utils.toWei(creditRequestedInterest, "ether").toString(10),
            padded
        ).send({ from: coinbase })
            .on('transactionHash', function (hash) {
                console.log("Transaction Hash:", hash);
            })
            .on('receipt', function (receipt) {
                console.log("Receipt:", receipt);
                showInfo(`Credit successfully requested.`);
                // reload page
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            })
            .on('error', function (error) {
                console.error(error);
                showError("Smart contract call failed");
            })

    });


    if (top.location.pathname === '/lend') {
        console.log('lend');
    }
    else if (top.location.pathname === "/borrow") {
        peerToPeerLendingContractInstance.methods.users(coinbase).call().then(function (result) {

            console.log("borrow", { result });

            let user = {
                credited: result[0],
                lastCredit: result[1],
                fraudStatus: result[2]
            }

            if (user.credited == true) {
                $('#borrowContent')
                    .append(`
                        <div class="col-sm-8 offset-sm-2 alert-info">
                            <p>You cannot request another credit until you repay the last one!</p>
                        </div>
                `)
            }
            else {
                $('#borrowContent')
                    .append(`
                        <form id="borrowRequest">
                            <h1 class="text-center">Borrow request</h1>
                            <div class="form-group">
                                <label for="creditDescription">Description</label>
                                <input type="text" class="form-control" name="creditDescription" placeholder="Why do you need the money?" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedAmount">Requested Amount:</label>
                                    <input type="number" class="form-control" name="creditRequestedAmount" placeholder="e.g. 0.01 ETH" required>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedInstallmentsCount">Installments count:</label>
                                    <input type="number" class="form-control" name="creditRequestedInstallmentsCount" placeholder="e.g. 2" required>
                                </div>
                                 <div class="form-group col-md-4">
                                    <label for="creditRequestedInterest">Interest:</label>
                                    <input type="number" class="form-control" name="creditRequestedInterest" placeholder="e.g. 2 ETH" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Ask for funding</button>
                        </form>
                `)
            }
        }).catch(error => console.error(error));
    }
    else if (top.location.pathname === "/profile") {
        console.log('profile')

        peerToPeerLendingContractInstance.methods.getCredits().call().then(function (result) {

            console.log("profile", { result });

            result.forEach(function (index) {
                let creditAddress = index;
                let creditContract = new web3.eth.Contract(creditContractABI, creditAddress);

                creditContract.methods.getCreditInfo().call().then(function (info) {
                    let creditContractInfo = {
                        address: creditAddress,
                        borrower: info[0],
                        description: web3.utils.hexToAscii(info[1]),
                        requestedAmount: info[2].toString(10),
                        requestedRepayments: info[3].toString(10),
                        repaymentInstallment: info[4].toString(10),
                        remainingRepayments: info[5].toString(10),
                        interest: info[6].toString(10),
                        returnAmount: info[7].toString(10),
                        state: parseInt(info[8].toString(10)),
                        active: info[9],
                        balance: info[10].toString(10)
                    }

                    $('#myCredits')
                        .append(`<div class="col-sm-6 mt-5">
                                <div class="card">
                                    <div class="card-header ${ creditContractInfo.active == true ? "alert-success" : "alert-secondary" }">
                                        <h5 class="card-title">${ creditContractInfo.description }</h5>
                                        <p>State: <span class="badge badge-primary">${ creditStates[creditContractInfo.state] }</span></p>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">
                                            <span class="credit-description-property">Address:</span> ${ creditContractInfo.address }
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Requested:</span> ${ web3.utils.fromWei(creditContractInfo.requestedAmount, "ether") } ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Funded:</span> ${ web3.utils.fromWei(creditContractInfo.balance, "ether") } ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Installments Count:</span> ${ creditContractInfo.requestedRepayments }
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Interest:</span> ${ web3.utils.fromWei(creditContractInfo.interest, "ether") } ETH
                                        </p>
                                    </div>
                                    <div class="card-footer" ${ creditContractInfo.state !== 1 ? 'style="display:none;"' : '' }>
                                        <div class="input-group mb-3 investment-card">
                                          <input type="number" class="form-control" name="amount" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon2">
                                          <div class="input-group-append">
                                            <button class="btn btn-outline-success" type="button" name="repayInstallment" data-contract-address="${ creditContractInfo.address }">Repay installment</button>
                                          </div>
                                        </div>
                                        <div class="mb-3">
                                            <button type="button" class="btn btn-info" name="withdraw" data-contract-address="${ creditContractInfo.address }">Withdraw</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)
                })
            })
        }).catch(error => console.error(error));


    }
    else if (top.location.pathname === "/check") {
        let address = getUrlParameter('address');
        peerToPeerLendingContractInstance.methods.users(address).call().then(function (result) {
            console.log("check", { result });

            let user = {
                credited: result[0],
                lastCredit: result[1],
                fraudStatus: result[2]
            }

            $('#checkContent')
                .append(`<div class="col-sm-8 offset-sm-2 ${ user.fraudStatus == true ? "alert-danger" : "alert-success" }">
                            <p>Credited: ${ user.credited == true ? "Yes" : "No" } </p>
                            <p>Last credit: ${ user.lastCredit } </p>
                            <p>Fraud status: ${ user.fraudStatus == true ? "Fraudlent" : "Good" } </p>
                        </div>`)
        }).catch(error => console.error(error));
    }


    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () { $("#loadingBox").show() },
        ajaxStop: function () { $("#loadingBox").hide() }
    });

    function showSuccess(message) {
        swal({
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    function showInfo(message) {
        swal(
            'Info?',
            message,
            'question'
        )
        console.log(message);
    }
    //
    function showError(errorMsg) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: errorMsg,
        })
        console.log(errorMsg);
    }

    function getUrlParameter(sParam) {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
});

