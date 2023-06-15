
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.3;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SpaceCredit is ERC20{

    uint256 constant initialSupply = 1000000000*(10**18);

    // Constructor will be called on contract creation
    constructor() ERC20("SpaceCredit", "SPC") {
        _mint(msg.sender, initialSupply);
    }
}