/**
 * Created by milenradkov on 8.03.18.
 */
$(document).ready(async function () {
    let peerToPeerLendingContract = '0x35f46Fa6aC70EFF5516b45f2B0d39090c90306AB';
    let peerToPeerLendingContractABI = [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "credits", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getUserCredits", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_credit", "type": "address" }], "name": "changeCreditState", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCredits", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "users", "outputs": [{ "name": "credited", "type": "bool" }, { "name": "activeCredit", "type": "address" }, { "name": "fraudStatus", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_borrower", "type": "address" }], "name": "setFraudStatus", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "requestedAmount", "type": "uint256" }, { "name": "repaymentsCount", "type": "uint256" }, { "name": "interest", "type": "uint256" }, { "name": "creditDescription", "type": "bytes32" }], "name": "applyForCredit", "outputs": [{ "name": "_credit", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_recipient", "type": "address" }], "name": "destroyAndSend", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_credit", "type": "address" }, { "name": "state", "type": "uint8" }], "name": "changeCreditState", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_borrower", "type": "address" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogCreditCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "state", "type": "uint8" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogCreditStateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "active", "type": "bool" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogCreditActiveChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": false, "name": "fraudStatus", "type": "bool" }, { "indexed": false, "name": "timestamp", "type": "uint256" }], "name": "LogUserSetFraud", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_currentOwner", "type": "address" }, { "indexed": true, "name": "_newOwner", "type": "address" }], "name": "LogOwnershipTransfered", "type": "event" }];

    let creditContractABI = [{ "constant": true, "inputs": [], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_state", "type": "uint8" }], "name": "changeState", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "lenders", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "toggleActive", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "repay", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "revokeVote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "refund", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "fraudVote", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "requestInterest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCreditInfo", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint8" }, { "name": "", "type": "bool" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_recipient", "type": "address" }], "name": "destroyAndSend", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_requestedAmount", "type": "uint256" }, { "name": "_requestedRepayments", "type": "uint256" }, { "name": "_interest", "type": "uint256" }, { "name": "_description", "type": "bytes32" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogCreditInitialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "state", "type": "uint8" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogCreditStateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "active", "type": "bool" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogCreditStateActiveChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerRepaymentInstallment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerRepaymentFinished", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerChangeReturned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "fraudStatus", "type": "bool" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogBorrowerIsFraud", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogLenderInvestment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogLenderWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogLenderChangeReturned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogLenderVoteForRevoking", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogLenderVoteForFraud", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_address", "type": "address" }, { "indexed": true, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "timestamp", "type": "uint256" }], "name": "LogLenderRefunded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_currentOwner", "type": "address" }, { "indexed": true, "name": "_newOwner", "type": "address" }], "name": "LogOwnershipTransfered", "type": "event" }];

    // if (typeof web3 === 'undefined')
    //     return showError("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
    const provider = await detectEthereumProvider();
    if (!provider) return;

    const web3 = new Web3(window.ethereum);
    const coinbase = await web3.eth.getCoinbase()


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
                                            <span class="credit-description-property">Borrower:</span> <a class="text-primary" href="/check?address=${ creditContractInfo.borrower }" >${ creditContractInfo.borrower }</a>
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
                                            <button type="button" class="btn btn-info" ${ creditContractInfo.state !== 2 ? 'style="display:none;"' : '' } name="requestInterest" data-contract-address="${ creditContractInfo.address }">Get interest</button>
                                            <button type="button" class="btn btn-warning" name="revokeVote" data-contract-address="${ creditContractInfo.address }">Revoke vote</button>
                                            <button type="button" class="btn btn-warning" name="refund" data-contract-address="${ creditContractInfo.address }">Refund</button>
                                            <button type="button" class="btn btn-danger" name="fraudVote" data-contract-address="${ creditContractInfo.address }">Fraud</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)

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
        }).then((result) => {
            if (result.value) {
                web3.eth.sendTransaction({ from: coinbase, to: address, data: getData, value: web3.utils.toWei(amount, "ether") }, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    swal(
                        'Invested!',
                        'Your investment was sent.',
                        'success'
                    )
                    amountField.val('');
                    console.log("tx.hash: " + result.transactionHash);
                })
            }
        })
    });

    $('body').on('click', 'button[name="repayInstallment"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let amountField = $(this).closest('div.investment-card').find('input');
        let amount = amountField.val();
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.repay().encodeABI();

        if (amount < 0 || amount == "" || amount == "undefined") {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Amount is missing!',
            })
            return;
        }

        web3.eth.sendTransaction({ from: coinbase, to: address, data: getData, value: web3.utils.toWei(amount, "ether") }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            swal(
                'Success!',
                'Your repayment was collected.',
                'success'
            )
            amountField.val('');
            console.log("tx.hash: " + result.transactionHash);
        })
    });

    $('body').on('click', 'button[name="requestInterest"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');

        console.log('requestInterest from ' + address);

        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.requestInterest().encodeABI();
        web3.eth.sendTransaction({ from: coinbase, to: address, data: getData }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result);
        })
    });

    $('body').on('click', 'button[name="refund"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');

        console.log('refund request from ' + address);

        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.refund().encodeABI();
        web3.eth.sendTransaction({ from: coinbase, to: address, data: getData }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result);
        })
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

    $('body').on('click', 'button[name="withdraw"]', function (e) {
        e.preventDefault();
        let address = $(this).attr('data-contract-address');
        let selectedCreditContract = new web3.eth.Contract(creditContractABI, address);
        let getData = selectedCreditContract.methods.withdraw().encodeABI();

        console.log('withdraw ' + address);

        selectedCreditContract.methods.withdraw().call().then(function (result) {
            swal(
                'Success!',
                'Your account was credited.',
                'success'
            )
            console.log(result);
        }).catch(error => console.error(error));
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
            })
            .on('error', function (error) {
                console.error(error);
                showError("Smart contract call failed");
            });

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

        peerToPeerLendingContractInstance.methods.getUserCredits().call().then(function (result) {

            console.log("profile", { result });

            result.forEach(function (index) {
                let creditAddress = index;
                let creditContract = new web3.eth.Contract(creditContractABI, creditAddress);

                creditContract.methods.getCreditInfo.call().then(function (info) {
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

