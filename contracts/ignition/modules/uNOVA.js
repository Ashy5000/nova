const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("uNOVAModule", (m) => {
  const uNOVA = m.contract("uNOVA");
  return { uNOVA };
});
