const { ethers } = require("hardhat");
const { expect } = require("chai");
const chalk = require("chalk");

const log = (prefix, value) => {
  console.log(`${prefix}: ${chalk.rgb(6, 129, 169)(value)}`);
};

describe("NFTStaking", function () {
  let NFTStaker = null;
  let NFTCollection = null;
  let NFTReward = null;

  before("Should deploy all contracts", async () => {
    NFTCollection = await ethers.getContractFactory("NFTCollection");
    NFTReward = await ethers.getContractFactory("NFTReward");
    NFTStaker = await ethers.getContractFactory("NFTStaker");
    NFTCollection = await NFTCollection.deploy("ShakkaNFT", "SNFT");
    NFTReward = await NFTReward.deploy();
    NFTStaker = await NFTStaker.deploy(
      NFTCollection.address,
      NFTReward.address
    );

    await NFTReward.deployed();
    await NFTCollection.deployed();
    await NFTStaker.deployed();
  });

  it("Should stake a new token", async () => {
    const { 0: _ } = await ethers.getSigners();
    const deployer = _.address;
    await NFTCollection.mint(deployer, "ipfshas/1.jpg", Date.now());
    await NFTCollection.mint(deployer, "ipfshas/1.jpg", Date.now());
    await NFTCollection.mint(deployer, "ipfshas/1.jpg", Date.now());

    let deployerBalance = await ethers.provider.getBalance(deployer);
    deployerBalance = ethers.utils.formatEther(deployerBalance);
    log("Deployer Balance", deployerBalance);
    const tx1 = await NFTCollection.setApprovalForAll(NFTStaker.address, true);
    await tx1.wait();

    const tx2 = await NFTReward.addController(NFTStaker.address);
    await tx2.wait();
    let tokenCount = await NFTCollection._tokenIds();
    tokenCount = tokenCount.toString();
    const tokenIds = [];

    for (let index = 1; index <= tokenCount; index++) {
      let item = await NFTCollection.idToTokenItem(index);
      tokenIds.push(item._tokenId.toNumber());
    }
    const newStake = await NFTStaker.stake(tokenIds);
    await newStake.wait();

    const earnings = await NFTStaker.earningInfo(tokenIds);
    console.log({
      earning: ethers.utils.formatEther(earnings[0].toString()),
      earningDay: ethers.utils.formatEther(earnings[1].toString()),
    });

    await NFTStaker.claim(deployer, tokenIds);
    deployerBalance = await NFTReward.balanceOf(deployer);
    deployerBalance = ethers.utils.formatEther(deployerBalance);
    log("Deployer Balance", deployerBalance);
  });
});
