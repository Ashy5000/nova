const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("poolModule", (m) => {
  const pool = m.contract("Pool", [
    "0x54fDA4D66093eA51E5Be7dfDE77511666401426c",
  ]);
  return { pool };
});

// Sepolia: 0xBAe4489C0a09A60279cD25215A701F60f0A84b41
