pragma solidity 0.8.19;
// SPDX-License-Identifier: AGPL-3.0-only
pragma abicoder v2;

import "forge-std/Test.sol";
import "forge-std/console.sol";

// import contracts

import {IERC20} from "../../src/interfaces/IERC20.sol";
import {IERC7575} from "../../src/interfaces/IERC7575.sol";

// tokens
import {AssetToken, Token} from "../../src/tokens/AssetToken.sol";
import {ShareToken} from "../../src/tokens/ShareToken.sol";

// utils
import {FixedPointMathLib} from "../../src/utils/FixedPointMathLib.sol";
import {SafeTransferLib} from "../../src/utils/SafeTransferLib.sol";

// core contracts
import {Escrow} from "../../src/Escrow.sol";
import {LiquidityPoolFactory, LiquidityPoolFactoryLike} from "../../src/factories/PoolFactory.sol";
import {InvestmentManager, LiquidityPoolLike} from "../../src/InvestmentManager.sol";
import {LiquidityPool} from "../../src/LiquidityPool.sol";

contract LiquidityPoolFactoryTest is Test {
    Token public Token1;
    IERC20 public Token2;

    Escrow public escrow;
    InvestmentManager public investmentManager;
    LiquidityPoolFactory public liquidityPoolFactory;
    LiquidityPool public Pool;

    address investor = makeAddr("investor");
    address nonMember = makeAddr("nonMember");
    address randomUser = makeAddr("randomUser");

    function setUp() public virtual {
        vm.startPrank(investor);
        Token1 = new AssetToken(1000000, "usdss", 18, "usdt");
        vm.stopPrank();
        Token2 = new ShareToken();

        escrow = new Escrow();
        investmentManager = new InvestmentManager(address(escrow));
        liquidityPoolFactory = new LiquidityPoolFactory();
    }

    function test_newLiquidityPool() public {
        bytes16 trancheId = 0x00000000000000000000000000000003;

        address pool_ = liquidityPoolFactory.newLiquidityPool(
            1, trancheId, address(Token1), address(Token2), address(investmentManager), address(escrow)
        );

        Pool = LiquidityPool(pool_);
    }
}
