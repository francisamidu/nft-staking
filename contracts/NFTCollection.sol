// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTCollection is ERC721Enumerable, Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Counters for Counters.Counter;
  Counters.Counter public _tokenId;

  string baseURI;
  string public baseExtension = ".json";
  uint256 private _cost;
  uint256 private _totalSupply;
  uint256 private maxSup;
  uint256 constant MAX_SUPPLY = 46*10**18;

  mapping(address=>uint256) private _balances;

  event TokenMinted(uint256 tokenId);

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    uint256 _newCost
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setCost(_newCost);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function setCost(uint256 newCost) public onlyOwner {
    _cost = newCost;
  }

  function cost() public view returns(uint256){
    return _cost;
  }

  // Mints new NFTs to the 
  function mint(address to, uint256 amount) public payable onlyOwner nonReentrant {
    _tokenId.increment();

    require(msg.value >= _cost,"Not enough funds to mint");
    require((maxSup+amount) <= MAX_SUPPLY, "Maximum supply reached");
    _totalSupply = _totalSupply.add(amount);
    maxSup = maxSup.add(amount);
    _balances[to] = _balances[to].add(amount);
    for (uint256 i = 1; i <= amount; i++) {
      _mint(to, i);
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, Strings.toString(tokenId), baseExtension))
        : "";
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function totalSupply() public override view returns(uint256){
      return _totalSupply;
  }

  function maxSupply() public pure returns(uint256){
      return MAX_SUPPLY;
  }

  function withdraw() public nonReentrant {
     (bool os, ) = payable(owner()).call{value: address(this).balance}('');
     require(os);    
  }
}