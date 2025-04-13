const {ethers, toUtf8Bytes} = require("ethers");

function generateHash(news_content) {
    let hs = ethers.keccak256(toUtf8Bytes(news_content));
    return hs;
}

module.exports = {generateHash};

