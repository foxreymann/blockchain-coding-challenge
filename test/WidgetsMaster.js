const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Widget Master", function () {
  let widgetsMaster

  beforeEach(async () => {
    try {
      const WidgetsMaster = await ethers.getContractFactory("WidgetsMaster")
      widgetsMaster = await WidgetsMaster.deploy()
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  it("Warehouse manager can add stock to the inventory", async function () {
    const tx = await widgetsMaster.setStock(100)
    await tx.wait()
    expect(await widgetsMaster.stock()).to.equal(100);
  })
});
