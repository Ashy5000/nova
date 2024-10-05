// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./stkNOVA.sol";
import "./NOVA.sol";
import "./IChronicle.sol";
import "./ISelfKisser.sol";

contract Pool {
    IERC20 uNOVAToken;
    stkNOVA stkNOVAToken;
    NOVA NOVAToken;

    uint256 collateral;

    mapping(address => uint256) contributions;
    mapping(address => uint256) withdraws;

    IChronicle public ethOracle =
        IChronicle(address(0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603));
    // IChronicle public aaveOracle =
    //     IChronicle(address(0x3F982a82B4B6bd09b1DAF832140F166b595FEF7F));
    // IChronicle public mkrOracle =
    //     IChronicle(address(0xE55afC31AFA140597c581Bc32057BF393ba97c5A));

    ISelfKisser public selfKisser =
        ISelfKisser(address(0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d));

    constructor(address uNOVAAddress) {
        uNOVAToken = IERC20(uNOVAAddress);
        stkNOVAToken = new stkNOVA();
        NOVAToken = new NOVA();

        selfKisser.selfKiss(address(ethOracle));
        // selfKisser.selfKiss(address(aaveOracle));
        // selfKisser.selfKiss(address(mkrOracle));
    }

    function uNOVAValue() public view returns (uint256) {
        uint256 ethVal = ethOracle.read();
        // uint256 aaveVal = aaveOracle.read();
        // uint256 mkrVal = mkrOracle.read();
        // return (ethVal + mkrVal + (aaveVal * 10)) / 1_00000_00000_00000_000;
        return ethVal;
    }

    function calculateCollateralization(
        uint256 latestuNOVAValue,
        address contributor
    ) public view returns (uint256) {
        uint256 collateralVal = 1;
        if (contributions[contributor] < collateral) {
            collateralVal =
                ((collateral -
                    contributions[contributor] +
                    withdraws[contributor]) * latestuNOVAValue) /
                1_00000_00000_00000_000;
        }
        if (collateralVal == 0) {
            collateralVal = 1;
        }
        uint256 stableVal = NOVAToken.totalSupply();
        if (stableVal == 0) {
            stableVal = 1;
        }
        return (collateralVal * 1_000_000) / stableVal;
    }

    function provide(uint256 amount) public {
        uint256 calculateduNOVAValue = uNOVAValue();
        uint256 initialCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        uNOVAToken.transferFrom(msg.sender, address(this), amount);
        collateral += amount;
        uint256 finalCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        contributions[msg.sender] += amount;
        uint256 credit = ((finalCollateralization * 100_000) /
            initialCollateralization) - 100_000;
        stkNOVAToken.credit(msg.sender, credit * 1_00000_00000_00000_000); // Adjust for decimals
    }

    function withdraw(uint256 amount) public {
        uint256 calculateduNOVAValue = uNOVAValue();
        uint256 initialCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        uNOVAToken.transfer(msg.sender, amount);
        collateral -= amount;
        uint256 finalCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        withdraws[msg.sender] += amount;
        uint256 debit = ((initialCollateralization - finalCollateralization) *
            10_000_000) / initialCollateralization;
        stkNOVAToken.debit(msg.sender, debit * 1_00000_00000_00000_000);
    }

    function mintNOVA(uint256 amount) public {
        uint256 calculateduNOVAValue = uNOVAValue();
        uint256 requiredValue = amount * 1_00000_00000_00000_000;
        uint256 requireduNOVA = requiredValue / calculateduNOVAValue;
        uint256 initialCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        uNOVAToken.transferFrom(msg.sender, address(this), requireduNOVA);
        collateral += requireduNOVA;
        NOVAToken.mint(msg.sender, amount);
        uint256 finalCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        contributions[msg.sender] += requireduNOVA;
        uint256 debit = ((initialCollateralization - finalCollateralization) *
            10_000_000) / initialCollateralization;
        stkNOVAToken.debit(msg.sender, debit * 1_00000_00000_00000_000);
    }

    function burnNOVA(uint256 amount) public {
        uint256 calculateduNOVAValue = uNOVAValue();
        uint256 inValue = amount * 1_00000_00000_00000_000;
        uint256 outuNOVA = inValue / uNOVAValue();
        uint256 initialCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        NOVAToken.burn(msg.sender, amount);
        uNOVAToken.transfer(msg.sender, outuNOVA);
        collateral -= outuNOVA;
        uint256 finalCollateralization = calculateCollateralization(
            calculateduNOVAValue,
            msg.sender
        );
        withdraws[msg.sender] += outuNOVA;
        uint256 credit = ((finalCollateralization * 100_000) /
            initialCollateralization) - 100_000;
        stkNOVAToken.credit(msg.sender, credit * 1_00000_00000_00000_000); // Adjust for decimals
    }

    function getAccountCredit(address account) public view returns (uint256) {
        return stkNOVAToken.balanceOf(account);
    }

    function getNOVAContract() public view returns (address) {
        return address(NOVAToken);
    }
}
