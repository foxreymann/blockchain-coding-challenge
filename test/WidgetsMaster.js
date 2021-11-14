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

  it("Should return the new greeting once it's changed", async function () {
    expect(await widgetsMaster.greet()).to.equal("Hello, world!");

    const setGreetingTx = await widgetsMaster.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await widgetsMaster.greet()).to.equal("Hola, mundo!");
  });
});
