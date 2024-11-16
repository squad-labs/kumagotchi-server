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
    base_sepolia: {
      url: process.env.BASE_SEPOLIA_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 84532,
    },
    neon_devnet: {
      url: process.env.NEON_DEVNET_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 245022926,
    },
    zircuit_testnet: {
      url: process.env.ZIRCUIT_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 48899,
    },
    mantle_testnet: {
      url: process.env.MANTLE_TESTNET_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 5003,
    },
    scroll_testnet: {
      url: process.env.SCROLL_TESTNET_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 534351,
    },
    morph_holesky: {
      url: process.env.MORPH_HOLESKY_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 2810,
    },
    linea_testnet: {
      url: process.env.LINEA_TESTNET_RPC,
      accounts: [process.env.SEVICE_KEY],
      chainId: 59141,
    },
  },
};
