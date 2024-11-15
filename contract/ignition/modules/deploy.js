const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GotTokenModule", (m) => {
  const token = m.contract("GotToken");
  return { token };
});
