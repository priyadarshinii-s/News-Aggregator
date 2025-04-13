const {ethers} = require("hardhat");



news_content = `President Donald Trump exempted smartphones, computers, and other tech devices and components from his reciprocal tariffs, new guidance from U.S. Customs and Border Protection shows.
The guidance, issued late Friday evening, comes after Trump earlier this month imposed 145% tariffs on products from China, a move that threatened to take a toll on tech giants like Apple
, which makes iPhones and most of its other products in China.`

async function main() {
    const contractFactory = await ethers.getContractFactory("VncContract");
    const VncContract = await contractFactory.deploy();
    console.log("VncContract deployed to: ", VncContract.target);
}

main()