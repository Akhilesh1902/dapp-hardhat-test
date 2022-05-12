const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Manager", function () {
  let Manager, manager;

  before(async function () {
    Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    await manager.deployed();
  });

  it("Should create a new Ticket", async function () {
    await manager.createTicket("akhil");

    let tickets = await manager.getTickets();
    // console.log(tickets);

    expect(tickets[0].name).to.equal("akhil");
  });

  it("Should update ticket name", async function () {
    await manager.updateTicket(0, "new Akhil");
    let tickets = await manager.getTickets();
    expect(tickets[0].name).to.equal("new Akhil");
  });
  it("Should update ticket status", async function () {
    await manager.updateStatus(0, 3);
    let tickets = await manager.getTickets();
    expect(tickets[0].status).to.equal(3);
  });
  it("Should return length of ticket ", async function () {
    await manager.createTicket("my NEw Ticket");
    await manager.createTicket("my NEw Ticket 2");
    await manager.createTicket("my NEw Ticket 3");
    let tickets = await manager.getTickets();
    expect(tickets.length).to.equal(4);
  });
});
