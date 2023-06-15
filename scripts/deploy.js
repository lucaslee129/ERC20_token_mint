const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const SpaceCredit = await hre.ethers.deployContract('SpaceCredit');

  await SpaceCredit.deployed();
  console.log('SpaceCredit deployed to:', SpaceCredit.address);
  // console.log('SPC address:', await SpaceCredit.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
