const {ethers} = require("hardhat");

async function main() {
    const contractFactory = await ethers.getContractFactory("VncContract");
    const VncContract = await contractFactory.deploy();
    console.log("VncContract deployed to: ", VncContract.target);
}

main()