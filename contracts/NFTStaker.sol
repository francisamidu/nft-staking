// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./NFTCollection.sol";
import "./NFTReward.sol";

contract NFTStaker is Ownable, IERC721Receiver {

    struct Stake
    {
        uint24 tokenId;
        uint48 timestamp;
        address owner;
    }

    // NFT Collection and NFTs token
    NFTCollection nft;
    NFTReward token;

    // Keeps track of total staked tokens by user
    uint256 public totalStaked;

    // Keeps track of stakes
    mapping(uint256=>Stake) public vault;

    event NFTStaked(uint256 tokenId,uint256 timestamp,address owner);
    event NFTUnStaked(uint256 tokenId,uint256 timestamp,address owner);
    event NFTClaimed(address owner, uint256 amount);

    constructor(NFTCollection _nft, NFTReward _token){
        nft = _nft;
        token = _token;
    }

    // Adds tokens to the staking vault
    function stake(uint256[] calldata tokenIds) external {
        uint256 tokenId;
        totalStaked += tokenIds.length;
        for (uint i = 0; i < tokenIds.length; i++)
        {
            tokenId = tokenIds[i];
            address owner = nft.ownerOf(tokenId);        
            require(owner == msg.sender, "Error: Not your token");
            require(vault[tokenId].tokenId == 0, "Error: Token already staked");

            nft.safeTransferFrom(msg.sender, address(this), tokenId);            
            emit NFTStaked(tokenId, block.timestamp,msg.sender);

            vault[tokenId] = Stake({
                owner: msg.sender,
                tokenId: uint24(tokenId),
                timestamp: uint48(block.timestamp)
            });
        }
    } 

    // Removes tokens from vault
    function _unstakeMany(address account, uint256[] calldata tokenIds) internal {
        uint256 tokenId;
        totalStaked += tokenIds.length;

        for (uint i = 0; i < tokenIds.length; i++)
        {
            tokenId = tokenIds[i];
            Stake memory _stake = vault[tokenId];
            require(_stake.owner == msg.sender, "Error: Not your token");

            delete vault[tokenId];
            nft.transferFrom(address(this), account, tokenId);
            emit NFTUnStaked(tokenId,block.timestamp,account);
        }
    }

    // Retrieve rewards
    function _claim(address account, uint256[] calldata tokenIds, bool _unstake) internal {
        uint256 tokenId;
        uint256 earned = 0;

        for (uint i = 0; i < tokenIds.length; i++)
        {
            tokenId = tokenIds[i];
            Stake memory _stake = vault[tokenId];
            require(_stake.owner == msg.sender, "Error: Not your token");
            uint256 stakedAt = _stake.timestamp;
            earned += 10000 ether * (block.timestamp - stakedAt)/ 1 minutes;

             vault[tokenId] = Stake({
                owner: msg.sender,
                tokenId: uint24(tokenId),
                timestamp: uint48(block.timestamp)
            });

        }

        if(earned > 0){
            earned = earned / 10000;
            token.mint(account, earned);
        }

        if(_unstake){
            _unstakeMany(account, tokenIds);
        }

        emit NFTClaimed(account, earned);
    }

    // Retrieve staking information
    function earningInfo(uint256[] calldata tokenIds) external view returns (uint256[2] memory info){
        uint256 tokenId;
        uint256 earned = 0;
        for (uint i = 0; i < tokenIds.length; i++)
        {
            Stake memory _stake = vault[tokenId];
            uint256 stakedAt = _stake.timestamp;
            earned += 15 wei * (block.timestamp - stakedAt) / 1 days;
            uint256 tempEarned = earned * 1 days;
            return [earned,tempEarned];   
        }
    }

    // Balance of rewards
    function balanceOf(address account) public view returns(uint256 _balance){
        uint256 balance = 0;        
        uint256 supply = nft._tokenIds();

        for (uint i = 0; i < supply; i++)
        {
            if(vault[i].owner == account){
                balance += 1;
            }
        }
        return balance;
    }

    // Tokens of owner
    function tokensOfOwner(address account) public view returns(uint256[] memory ownerTokens){

        uint256 supply = nft._tokenIds();        
        uint256[] memory tmp = new uint256[](supply);

        uint256 index = 0;
        for (uint tokenId = 0; tokenId <= supply; tokenId++)
        {
            if(vault[tokenId].owner == account){
                tmp[index] = vault[tokenId].tokenId;
                index += 1;
            }
        }

        uint256[] memory tokens = new uint256[](index);
        for (uint i = 0; i < index; i++)
        {
            tokens[i] = tmp[i];
        }

        return tokens;

    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4){        
        return IERC721Receiver.onERC721Received.selector;
    }    
}