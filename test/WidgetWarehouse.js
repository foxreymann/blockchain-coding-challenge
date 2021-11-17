const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Widget Master", function () {
  let instance
  let manager1, manager2, manager3, customer1, customer2, customer3

  beforeEach(async () => {
    try {
      const WidgetWarehouse = await ethers.getContractFactory("WidgetWarehouse");
      instance = await WidgetWarehouse.deploy()
      await instance.deployed();
      [manager1, manager2, manager3, customer1, customer2, customer3] = await ethers.getSigners()

      const managerRole = await instance.MANAGER_ROLE();
      await instance.grantRole(managerRole, manager1.address);
      await instance.grantRole(managerRole, manager2.address);
      await instance.grantRole(managerRole, manager3.address);

      const customerRole = await instance.CUSTOMER_ROLE();
      await instance.grantRole(cusotmerRole, customer1.address);
      await instance.grantRole(cusotmerRole, customer2.address);
      await instance.grantRole(cusotmerRole, customer3.address);

    } catch (err) {
      console.error(err)
      throw err
    }
  })

  it("Warehouse manager can add stock to the inventory", async function () {
    const tx = await instance.connect(manager1).setStock(100)
    await tx.wait()
    expect(await instance.stock()).to.equal(100);
  })

  it("Customer can NOT alter stock in inventory", async function () {
  })

  it("Customer can place an order", async function () {
    const orderSize = 100

    let tx = await instance.setStock(orderSize)
    await tx.wait()

    tx = await instance.connect(customer1).order(orderSize, {
       value: (await instance.price()).mul(ethers.BigNumber.from(orderSize))
    })
    await tx.wait()

    // check orders
    const order = await instance.orders(0)
    expect(order.customer).to.equal(customer1.address)
    expect(order.amount).to.equal(orderSize)
    expect(order.shipped).to.equal(false)
  })

  it("Warehouse manager can ship a customer order", async function () {
    const orderSize = 100

    let tx = await instance.setStock(orderSize)
    await tx.wait()

    tx = await instance.connect(customer1).order(orderSize, {
       value: (await instance.price()).mul(ethers.BigNumber.from(orderSize))
    })
    await tx.wait()

    // ship
    tx = await instance.connect(manager1).ship(0)
    await tx.wait()

    const order = await instance.orders(0)
    expect(order.customer).to.equal(customer1.address)
    expect(order.amount).to.equal(orderSize)
    expect(order.shipped).to.equal(true)

    // check stock
    expect(await instance.stock()).to.equal(0)

  })
});
