import NFTSTAKEABI from "./artifacts/contracts/NFTStaker.sol/NFTStaker.json";
import NFTCOLLECTIONABI from "./artifacts/contracts/NFTCollection.sol/NFTCollection.json";

const NFT_STAKE_ABI = NFTSTAKEABI.abi;
const NFT_COLLECTION_ABI = NFTCOLLECTIONABI.abi;

// For Development
const NFT_COLLECTION_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
const NFT_STAKE_ADDRESS = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

// For Production
// const NFT_STAKE_ADDRESS = ""
// const NFT_COLLECTION_ADDRESS = ""

export {
  NFT_COLLECTION_ABI,
  NFT_STAKE_ABI,
  NFT_COLLECTION_ADDRESS,
  NFT_STAKE_ADDRESS,
};
