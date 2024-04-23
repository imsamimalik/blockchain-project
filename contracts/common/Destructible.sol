// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";

contract Destructible is Ownable {
    constructor() {}

    function destroy() public onlyOwner {
        selfdestruct(payable(owner));
    }

    function destroyAndSend(address _recipient) public onlyOwner {
        selfdestruct(payable(_recipient));
    }
}
