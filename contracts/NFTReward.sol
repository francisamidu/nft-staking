// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract NFTReward is ERC20, Ownable, ERC20Burnable {
    mapping(address => bool) controllers; 
    constructor() ERC20("NFTReward","NFTR"){}

    function mint(address to, uint256 amount) external {
        require(controllers[msg.sender], "Only controllers can mint");
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
}
