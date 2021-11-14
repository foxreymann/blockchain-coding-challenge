const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Widget Master", function () {
  let instance
  let manager1, manager2, manager3, customer1, customer2, customer3

  beforeEach(async () => {
    try {
      const WidgetWarehouse = await ethers.getContractFactory("WidgetWarehouse")
      instance = await WidgetWarehouse.deploy()
      [manager1, manager2, manager3, customer1, customer2, customer3] = await ethers.getSigners()
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  it("Warehouse manager can add stock to the inventory", async function () {
    const tx = await instance.setStock(100)
    await tx.wait()
    expect(await instance.stock()).to.equal(100);
  })

  it("Customer can NOT alter stock in inventory", async function () {
  })

  it("Customer can place an order", async function () {

    const tx = await instance.setStock(100)
    await tx.wait()

    const tx = await instance.order(100, {
       value: await instance.price() * 100
    })
    await tx.wait()

    // check orders
  })
});
