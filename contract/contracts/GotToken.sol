// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GotToken is ERC20, Ownable {
    uint256 public constant RATE = 1;
    
    constructor() ERC20("Kumagotchi", "GOT") Ownable(msg.sender) {}
    
    receive() external payable {
        require(msg.value > 0, "Send ETH to receive tokens");
        uint256 tokensToMint = msg.value;
        _mint(msg.sender, tokensToMint);
    }

    function withdrawETH() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Failed to withdraw ETH");
    }
}