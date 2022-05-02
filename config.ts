import NFTSTAKEABI from "./artifacts/contracts/NFTStaker.sol/NFTStaker.json";
import NFTCOLLECTIONABI from "./artifacts/contracts/NFTCollection.sol/NFTCollection.json";

const NFT_STAKE_ABI = NFTSTAKEABI.abi;
const NFT_COLLECTION_ABI = NFTCOLLECTIONABI.abi;

// For Development
const NFT_STAKE_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const NFT_COLLECTION_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// For Production
// const NFT_STAKE_ADDRESS = ""
// const NFT_COLLECTION_ADDRESS = ""

export {
  NFT_COLLECTION_ABI,
  NFT_STAKE_ABI,
  NFT_COLLECTION_ADDRESS,
  NFT_STAKE_ADDRESS,
};
