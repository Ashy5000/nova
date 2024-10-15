// Imports
const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const fs = require("fs");

describe("Pool", () => {
  async function deployFixture() {
    const [owner] = await ethers.getSigners();
    const uNOVA = new ethers.Contract(
      "0x54fDA4D66093eA51E5Be7dfDE77511666401426c",
      uNOVAAbi(),
      owner,
    );
    const Pool = await ethers.getContractFactory("Pool");
    const pool = await Pool.deploy(uNOVA.getAddress());
    const unovaAbiString = fs.readFileSync("erc20abi.json");
    const unovaAbi = JSON.parse(unovaAbiString);
    const weth = new ethers.Contract(
      "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      unovaAbi,
      owner,
    );
    await weth.approve(uNOVA.getAddress(), BigInt(1));
    await uNOVA.wrap(BigInt(1));
    const novaAbiString = fs.readFileSync("NOVAabi.json");
    const novaAbi = JSON.parse(novaAbiString);
    const nova = new ethers.Contract(
      await pool.getNOVAContract(),
      novaAbi,
      owner,
    );
    return { owner, uNOVA, pool, nova };
  }
  function uNOVAAbi() {
    const abiString = fs.readFileSync("uNOVAAbi.json");
    const abi = JSON.parse(abiString);
    return abi;
  }
  it("should begin with a zero credit", async () => {
    const { owner, token, pool } = await loadFixture(deployFixture);
    const credit = await pool.getAccountCredit(owner);
    expect(credit).to.equal(0);
  });
  it("should begin with 100% collateralization", async () => {
    const { owner, token, pool } = await loadFixture(deployFixture);
    const collateralization = await pool.calculateCollateralization(0, owner);
    expect(collateralization).to.equal(1_000_000);
  });
  it("should calculate a nonzero uNOVA price", async () => {
    const { owner, token, pool } = await loadFixture(deployFixture);
    const price = await pool.uNOVAValue();
    expect(price).to.not.equal(0);
  });
  it("should correctly implement deposits", async () => {
    const { owner, uNOVA, pool, nova } = await loadFixture(deployFixture);
    const balanceInitial = await uNOVA.balanceOf(owner);
    await uNOVA.approve(pool, 1);
    await pool.provide(1);
    const credit = await pool.getAccountCredit(owner);
    expect(credit).to.not.equal(0);
    const balanceFinal = await uNOVA.balanceOf(owner);
    expect(balanceFinal).to.equal(balanceInitial - BigInt(1));
  });
  it("should correctly implement withdraws", async () => {
    const { owner, uNOVA, pool, nova } = await loadFixture(deployFixture);
    const balanceInitial = await uNOVA.balanceOf(owner);
    const initialCredit = await pool.getAccountCredit(owner);
    await uNOVA.approve(pool, 1);
    await pool.provide(1);
    await pool.withdraw(1);
    const credit = await pool.getAccountCredit(owner);
    expect(credit).to.equal(initialCredit);
    const balanceFinal = await uNOVA.balanceOf(owner);
    expect(balanceFinal).to.equal(balanceInitial);
  });
  it("should correctly implement minting", async () => {
    const { owner, uNOVA, pool, nova } = await loadFixture(deployFixture);
    const uNOVABalanceInitial = await uNOVA.balanceOf(owner);
    await uNOVA.approve(pool, 10);
    await pool.provide(10);
    await pool.mintNOVA(1);
    const uNOVABalanceFinal = await uNOVA.balanceOf(owner);
    expect(uNOVABalanceFinal).to.be.lessThan(uNOVABalanceInitial);
    const novaBalance = await nova.balanceOf(owner);
    expect(novaBalance).to.equal(1);
  });
  it("should correctly implement burning", async () => {
    const { owner, uNOVA, pool, nova } = await loadFixture(deployFixture);
    await uNOVA.approve(pool, 10);
    await pool.provide(10);
    const uNOVABalanceInitial = await uNOVA.balanceOf(owner);
    await pool.mintNOVA(1);
    await pool.burnNOVA(1);
    const uNOVABalanceFinal = await uNOVA.balanceOf(owner);
    expect(uNOVABalanceFinal).to.equal(uNOVABalanceInitial);
    const novaBalance = await nova.balanceOf(owner);
    expect(novaBalance).to.equal(0);
  });
});
