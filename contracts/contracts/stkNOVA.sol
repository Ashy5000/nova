// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract stkNOVA is ERC20 {
    address owner;

    constructor() ERC20("stkNOVA", "stkNOVA") {
        owner = msg.sender;
    }

    // stkNOVA is non-transferable

    function transfer(
        address to,
        uint256 value
    ) public virtual override returns (bool) {
        return false;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual override returns (bool) {
        return false;
    }

    // stkNOVA serves as pool credit

    function credit(address to, uint256 value) public returns (bool) {
        assert(msg.sender == owner);
        _mint(to, value);
    }

    function debit(address to, uint256 value) public returns (bool) {
        assert(msg.sender == owner);
        _burn(to, value);
    }
}
