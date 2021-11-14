// SPDX-License-Identifier: Copyright

pragma solidity 0.8.10;

import "hardhat/console.sol";

contract WidgetWarehouse {
  // TYPE DECLARATIONS
  struct Order {
    address customer;
    uint amount;
    bool shipped;
  }

  Order[] public orders;

  // STATE VARIABLES
  uint public stock;
  uint public price = 1 ether;

  function setStock(uint _stock) public {
    stock = _stock;
  }
}
