require('@nomicfoundation/hardhat-toolbox');
// const { createSecretKey } = require('crypto');
//require('@nomicfoundation/hardhat-verify');

let secrets = require('./secret.json');
// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
console.log(secrets);
// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
module.exports = {
  solidity: '0.8.9',
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/e14e866418594599bf7faa569a05b75b', //`https://sepolia.infura.io/v3/${secrets.INFURA_APIKEY}`,
      accounts: [secrets.ACCOUNT_SECRET],
    },
  },
  etherscan: {
    apiKey: secrets.ETHERSCAN_APIKEY,
  },
};
