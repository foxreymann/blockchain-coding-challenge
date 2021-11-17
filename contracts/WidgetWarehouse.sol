// SPDX-License-Identifier: Copyright

pragma solidity 0.8.10;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract WidgetWarehouse is AccessControl {
  // TYPE DECLARATIONS
  struct Order {
    address customer;
    uint amount;
    bool shipped;
  }

  // STATE VARIABLES
  uint public stock;
  uint public price = 1 ether;
  Order[] public orders;

  bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
  bytes32 public constant CUSTOMER_ROLE = keccak256("CUSTOMER_ROLE");

  // MODIFIERS

  // EVENTS

  // FUNCTIONS
  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function setStock(uint _stock) public onlyRole(MANAGER_ROLE) {
    stock = _stock;
  }

  function order(uint _amount) public payable onlyRole(CUSTOMER_ROLE) {
    require(stock >= _amount, 'stock is too low to fullfil the order');
    require(msg.value == price * _amount, 'order payment too low');
    Order memory ordr = Order({
      customer: msg.sender,
      amount: _amount,
      shipped: false
    });
    orders.push(ordr);
  }

  function ship(uint _orderId) public onlyRole(MANAGER_ROLE) {
    require(orders.length > _orderId, "order doesn't exist");
    require(orders[_orderId].amount <= stock, "stock is too low to ship");
    require(!orders[_orderId].shipped, "order alrady shipped");
    stock -= orders[_orderId].amount;
    orders[_orderId].shipped = true;
  }
}
