require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 11155111,
    },
    polygon_pos: {
      url: process.env.POLYGON_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 137,
    },
    base_mainnet: {
      url: process.env.BASE_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 8453,
    },
    neon_devnet: {
      url: process.env.NEON_DEVNET_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 245022926,
    },
  },
};
