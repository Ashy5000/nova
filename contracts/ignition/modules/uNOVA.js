const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("uNOVAModule", (m) => {
  const uNOVA = m.contract("uNOVA");
  return { uNOVA };
});
// Sepolia: 0x54fDA4D66093eA51E5Be7dfDE77511666401426c
