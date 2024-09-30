// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract uNOVA is ERC20 {
    IERC20 weth;
    IERC20 aave;
    IERC20 mkr;

    constructor() ERC20("uNOVA", "uNOVA") {
        // Production:
        weth = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
        aave = IERC20(0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9);
        mkr = IERC20(0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2);
        // Testnet:
        // weth = IERC20(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14);
    }

    function wrap(uint256 ethAmount) public {
        assert(weth.allowance(msg.sender, address(this)) >= ethAmount);
        assert(aave.allowance(msg.sender, address(this)) >= ethAmount * 10);
        assert(mkr.allowance(msg.sender, address(this)) >= ethAmount);
        weth.transferFrom(msg.sender, address(this), ethAmount);
        aave.transferFrom(msg.sender, address(this), ethAmount * 10);
        mkr.transferFrom(msg.sender, address(this), ethAmount);
        _mint(msg.sender, ethAmount * 500);
    }

    function unwrap(uint256 uNOVAAmount) public {
        assert(balanceOf(msg.sender) >= uNOVAAmount);
        _burn(msg.sender, uNOVAAmount);
        weth.transferFrom(address(this), msg.sender, uNOVAAmount / 500);
        aave.transferFrom(address(this), msg.sender, uNOVAAmount / 50);
        mkr.transferFrom(address(this), msg.sender, uNOVAAmount / 500);
    }
}
