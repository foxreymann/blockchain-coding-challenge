//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "hardhat/console.sol";

contract WidgetWarehouse {
  uint public stock;

  function setStock(uint _stock) public {
    stock = _stock;
  }
}
