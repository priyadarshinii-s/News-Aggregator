// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;


contract VncContract {

    address public owner;
    uint256 private newsCount;

    struct News {
        bytes32 newsHash;
        uint256 timestamp;
        bool verified;
        uint256 trustWorthy;
        uint256 questionable;
        uint256 totalVotes;
    }

    mapping(uint256 => News) public news;
    mapping(address => bool) public verifiers;

    error InvalidUser(address caller);

    constructor (){
        owner = msg.sender;
    }

    modifier onlyVerifiers {
        require(verifiers[msg.sender], InvalidUser(msg.sender));
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, InvalidUser(msg.sender));
        _;
    }

    function postNews(bytes32 _newsHash) external {
        news[newsCount] = News({
            newsHash: _newsHash,
            timestamp: block.timestamp,
            verified: false,
            trustWorthy: 0,
            questionable: 0,
            totalVotes: 0
        });

        newsCount++;
    }

    function verifyNews(bytes1 option, uint256 _newsId) external onlyVerifiers {

        option == "1" ? news[_newsId].trustWorthy++ : news[_newsId].questionable++;

        news[_newsId].totalVotes++;
    }

    function addVerifier(address _addr) external onlyOwner {   
        verifiers[_addr] = true;
    }

    function removeVerifier(address _addr) external onlyOwner {    
        verifiers[_addr] = false;
    }

    function getNews(uint256 _newsId) external view returns (News memory) {
        return news[_newsId];
    }
}

