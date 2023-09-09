import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { configDotenv } from "dotenv";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    base: {
      url: process.env.BASERPC,
      //@ts-ignore
      accounts: [process.env.PRIVATEKEY, process.env.PRIVATEKEY2, process.env.PRIVATEKEY3],
    },
      forking: {
      url: process.env.BASERPC,
    }
  },
  etherscan: {
// Your API key for Etherscan
// Obtain one at https://etherscan.io/
apiKey: process.env.ETHERSCAN_API_KEY
}
 
};

export default config;
