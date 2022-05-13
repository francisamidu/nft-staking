const hre = require("hardhat");

async function main() {
  const [{ 1: deployer }] = await hre.ethers.getSigners();

  // We get the contract to deploy
  let NFTCollection = await hre.ethers.getContractFactory("NFTCollection");
  let NFTReward = await hre.ethers.getContractFactory("NFTReward");
  let NFTStaker = await hre.ethers.getContractFactory("NFTStaker");

  NFTCollection = await NFTCollection.deploy(
    "ShakkaNFT",
    "SNFT",
    "http://bafybeibsgtidoin6yrjq4ta5uirrvbxto27zqpfynbge5ea426y4hmunem.ipfs.localhost:8080/",
    hre.ethers.utils.parseEther("0.03")
  );
  NFTReward = await NFTReward.deploy();

  await NFTCollection.deployed();
  await NFTReward.deployed();
  NFTStaker = await NFTStaker.deploy(NFTCollection.address, NFTReward.address);

  console.log("NFT Collection deployed to:", NFTCollection.address);
  console.log("NFT Staker deployed to:", NFTStaker.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
