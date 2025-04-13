const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

news_content = `President Donald Trump exempted smartphones, computers, and other tech devices and components from his reciprocal tariffs, new guidance from U.S. Customs and Border Protection shows.
The guidance, issued late Friday evening, comes after Trump earlier this month imposed 145% tariffs on products from China, a move that threatened to take a toll on tech giants like Apple
, which makes iPhones and most of its other products in China.`


describe("VncContract", function () {

  async function deployFixture() {
    const [owner, verifier, user] = await ethers.getSigners();

    const vncContracctFactory = await ethers.getContractFactory("VncContract");
    const vncContract = await vncContracctFactory.deploy();

    return { vncContract, owner, verifier, user };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { vncContract, owner } = await loadFixture(deployFixture);

      expect(await vncContract.owner()).to.equal(owner.address);
    });
  });


  describe("Verifier", async function () {
    it("Should throw error if not owner", async function () {
      const { vncContract, owner, verifier } = await loadFixture(deployFixture);

      await expect(vncContract.connect(verifier).addVerifier(owner)).to.be.revertedWithCustomError(vncContract, "InvalidUser")
        .withArgs(verifier)
    });

    it("Owner should add verifier", async function () {
      const { vncContract, verifier } = await loadFixture(deployFixture);
      await vncContract.addVerifier(verifier);

      expect(await vncContract.verifiers(verifier)).to.equal(true);
    });

    it("Owner should remove verifier", async function () {
      const { vncContract, owner, verifier } = await loadFixture(deployFixture);

      vncContract.addVerifier(verifier);
      vncContract.removeVerifier(verifier);

      expect(await vncContract.verifiers(owner)).to.equal(false);
    })
  });


  describe("News", async function () {

    it("Should post news", async function () {
        const {vncContract, user} = await loadFixture(deployFixture);

        await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));

        let res = await vncContract.getNews(0);

        expect(res[0]).to.equal("0x9a2cfccaa6ea481b11ea7b0ce76515e545180b09d419b1d426cc4374e7b75fa1")
    })
  });


  describe("News Verification", async function () {
    
  })
});
