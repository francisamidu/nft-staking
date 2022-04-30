import NFTSTAKEABI from "./artifacts/contracts/NFTStaker.sol/NFTStaker.json";
import NFTCOLLECTIONABI from "./artifacts/contracts/NFTCollection.sol/NFTCollection.json";

const NFT_STAKE_ABI = NFTSTAKEABI.abi;
const NFT_COLLECTION_ABI = NFTCOLLECTIONABI.abi;

// For Development
const NFT_STAKE_ADDRESS = "";
const NFT_COLLECTION_ADDRESS = "";

// For Production
// const NFT_STAKE_ADDRESS = ""
// const NFT_COLLECTION_ADDRESS = ""

export {
  NFT_COLLECTION_ABI,
  NFT_STAKE_ABI,
  NFT_COLLECTION_ADDRESS,
  NFT_STAKE_ADDRESS,
};
