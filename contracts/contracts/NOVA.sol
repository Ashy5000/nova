// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NOVA is ERC20 {
    address owner;

    constructor() ERC20("NOVA", "NOVA") {
        owner = msg.sender;
    }

    // NOVA can be burned and minted by the pool contract

    function mint(address to, uint256 value) public returns (bool) {
        assert(msg.sender == owner);
        _mint(to, value);
    }

    function burn(address to, uint256 value) public returns (bool) {
        assert(msg.sender == owner);
        _burn(to, value);
    }
}
