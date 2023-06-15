const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SpaceCredit Test', function () {
  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const [owner] = await ethers.getSigners();
    console.log(owner.address);

    const SPC = await ethers.deployContract('SpaceCredit');

    const ownerBalance = await SPC.balanceOf(owner.address);
    console.log(ownerBalance);
    expect(await SPC.totalSupply()).to.equal(ownerBalance);
  });

  it('the balance of token should be returned', async function () {
    const [owner] = await ethers.getSigners();
    console.log(owner.address);

    const SPC = await ethers.deployContract('SpaceCredit');

    const tokenBalance = await SPC.getBalanceToken();
    console.log(tokenBalance);
  })
});
