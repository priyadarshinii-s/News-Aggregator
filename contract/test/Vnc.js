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

    const TWO_HOURS_IN_SECS = 2 * 60 * 60;

    const [owner, verifier, user] = await ethers.getSigners();

    const vncContracctFactory = await ethers.getContractFactory("VncContract");
    const vncContract = await vncContracctFactory.deploy();

    return { vncContract, owner, verifier, user, TWO_HOURS_IN_SECS };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { vncContract, owner } = await loadFixture(deployFixture);

      expect(await vncContract.owner()).to.equal(owner.address);
    });
  });


  describe("Verifier", async function () {
    it("should throw error if not owner", async function () {
      const { vncContract, owner, verifier } = await loadFixture(deployFixture);

      await expect(vncContract.connect(verifier).addVerifier(owner)).to.be.revertedWithCustomError(vncContract, "InvalidUser")
        .withArgs(verifier)
    });

    it("owner should add verifier", async function () {
      const { vncContract, verifier } = await loadFixture(deployFixture);
      await vncContract.addVerifier(verifier);

      expect(await vncContract.verifiers(verifier)).to.equal(true);
    });

    it("owner should remove verifier", async function () {
      const { vncContract, owner, verifier } = await loadFixture(deployFixture);

      vncContract.addVerifier(verifier);
      vncContract.removeVerifier(verifier);

      expect(await vncContract.verifiers(owner)).to.equal(false);
    })
  });


  describe("News", async function () {

    it("should post news", async function () {
        const {vncContract, user} = await loadFixture(deployFixture);

        await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));

        let res = await vncContract.getNews(0);

        expect(res[0]).to.equal("0x9a2cfccaa6ea481b11ea7b0ce76515e545180b09d419b1d426cc4374e7b75fa1")
    })
  });


  describe("News Verification", async function () {

    it("should throw error if not verifier", async function(){
      const {vncContract, user} = await loadFixture(deployFixture);

      await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));

      await expect(vncContract.connect(user).verifyNews(ethers.toUtf8Bytes("0"), 0)).to.be.revertedWithCustomError(vncContract, "InvalidVerifier")
      .withArgs(user.address);
    });
    
    it("should vote for trustworthy", async function(){
      const {vncContract, verifier, user} = await loadFixture(deployFixture);

      await vncContract.addVerifier(verifier);
      await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));
      await vncContract.connect(verifier).verifyNews(ethers.toUtf8Bytes("1"), 0);

      let res =  await vncContract.connect(verifier).getNews(0);

      expect(res[3]).to.equal(1);
    });

    it("should vote for questionable", async function(){
      const {vncContract, verifier, user} = await loadFixture(deployFixture);

      await vncContract.addVerifier(verifier);
      await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));
      await vncContract.connect(verifier).verifyNews(ethers.toUtf8Bytes("0"), 0);

      let res =  await vncContract.connect(verifier).getNews(0);

      expect(res[4]).to.equal(1);
    });

    it("should update total vote count", async function(){
      const {vncContract, verifier, user} = await loadFixture(deployFixture);

      await vncContract.addVerifier(verifier);
      await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));
      await vncContract.connect(verifier).verifyNews(ethers.toUtf8Bytes("0"), 0);
      await vncContract.connect(verifier).verifyNews(ethers.toUtf8Bytes("1"), 0);

      let res =  await vncContract.connect(verifier).getNews(0);

      expect(res[5]).to.equal(2);
    });

    
    it("should revert vote after 2 hours", async function () {
      const { vncContract, verifier, user, TWO_HOURS_IN_SECS } = await loadFixture(deployFixture);

      
      await vncContract.addVerifier(verifier);
      await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));

      await time.increase(TWO_HOURS_IN_SECS + 1);

      await expect(vncContract.connect(verifier).verifyNews(ethers.toUtf8Bytes("1"), 0))
      .to.be.revertedWithCustomError(vncContract, "VotingWindowExpired");
    });

    it("should allow vote just before 2-hour deadline", async function () {
      const { vncContract, user, verifier, TWO_HOURS_IN_SECS } = await loadFixture(deployFixture);

      await vncContract.addVerifier(verifier);
      await vncContract.connect(user).postNews(ethers.keccak256(ethers.toUtf8Bytes(news_content)));

      await time.increase(TWO_HOURS_IN_SECS - 10);

      await expect(vncContract.connect(verifier).verifyNews(ethers.toUtf8Bytes("0"), 0))
        .to.not.be.reverted;

      const news = await vncContract.news(0);
      expect(news.questionable).to.equal(1);
      expect(news.totalVotes).to.equal(1);
    });


  })
});
