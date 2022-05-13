// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract NFTReward is ERC20, Ownable, ERC20Burnable {
    using SafeMath for uint256;
    mapping(address => uint256 ) private _balances;
    mapping(address => bool) controllers; 

    uint256 private _totalSupply;
    uint256 private maxSup;
    uint256 constant MAX_SUPPLY = 1000000*10**18;

    constructor() ERC20("NFTReward","NFTR"){
        _mint(msg.sender, 1000000*10**18);
    }

    function mint(address to, uint256 amount) external {
        require((maxSup+amount) <= MAX_SUPPLY, "Maximum supply reached");
        require(controllers[msg.sender], "Only controllers can mint");
        _totalSupply = _totalSupply.add(amount);
        maxSup = maxSup.add(amount);
        _balances[to] = _balances[to].add(amount);
        _mint(to,amount);
    }

    function burnFrom(address account, uint256 amount) public override {
        require(controllers[msg.sender], "Only controllers can mint");
        if(controllers[msg.sender]){
            _burn(account, amount);
        }else{
            super.burnFrom(account, amount);
        }
    }

    function addController(address controller) external onlyOwner{
        controllers[controller] = true;
    }

    function removeController(address controller) external onlyOwner{
        controllers[controller] = false;
    }

    function totalSupply() public override view returns(uint256){
        return _totalSupply;
    }

    function maxSupply() public pure returns(uint256){
        return MAX_SUPPLY;
    }
}
