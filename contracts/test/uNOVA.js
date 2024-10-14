// Imports
const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const fs = require("fs");

describe("uNOVA", () => {
  async function deployFixture() {
    const [owner] = await ethers.getSigners();
    const token = new ethers.Contract(
      "0x54fDA4D66093eA51E5Be7dfDE77511666401426c",
      uNOVAAbi(),
      owner,
    );
    return { owner, token };
  }
  function uNOVAAbi() {
    const abiString = fs.readFileSync("uNOVAAbi.json");
    const abi = JSON.parse(abiString);
    return abi;
  }
  function erc20Abi() {
    const abiString = fs.readFileSync("erc20abi.json");
    const abi = JSON.parse(abiString);
    return abi;
  }
  it("should begin with a zero balance", async () => {
    const { owner, token } = await loadFixture(deployFixture);
    expect(await token.balanceOf(owner)).to.equal(0);
  });
  it("should wrap tokens correctly", async () => {
    const { owner, token } = await loadFixture(deployFixture);
    const weth = new ethers.Contract(
      "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      erc20Abi(),
      owner,
    );
    await weth.approve(token.getAddress(), BigInt(1));
    await token.wrap(BigInt(1));
    expect(await token.balanceOf(owner)).to.equal(500);
  });
  it("should unwrap tokens correctly", async () => {
    const { owner, token } = await loadFixture(deployFixture);
    const weth = new ethers.Contract(
      "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      erc20Abi(),
      owner,
    );
    const uNOVAInitial = await token.balanceOf(owner);
    const wethInitial = await weth.balanceOf(owner);
    await weth.approve(token.getAddress(), BigInt(1));
    await token.wrap(BigInt(1));
    await token.unwrap(BigInt(500));
    expect(await token.balanceOf(owner)).to.equal(uNOVAInitial);
    expect(await weth.balanceOf(owner)).to.equal(wethInitial);
  });
});
