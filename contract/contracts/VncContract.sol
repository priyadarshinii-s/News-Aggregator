// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./VotingContract.sol";

contract VncContract {
    address public owner;
    uint256 private newsCount;
    VotingContract public votingContract;

    struct News {
        bytes32 newsHash;
        uint256 timestamp;
        bool verified;
    }

    mapping(uint256 => News) public news;
    mapping(address => bool) public verifiers;

    error InvalidUser(address caller);
    error InvalidVerifier(address verifier);

    constructor(address _votingContract) {
        owner = msg.sender;
        votingContract = VotingContract(_votingContract);
    }

    modifier onlyVerifiers {
        require(verifiers[msg.sender], InvalidVerifier(msg.sender));
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
            verified: false
        });

        votingContract.initializeVoting(newsCount);
        newsCount++;
    }

    function verifyNews(bytes1 option, uint256 _newsId) external onlyVerifiers {
        votingContract.vote(option, _newsId, msg.sender);
    }

    function addVerifier(address _addr) external onlyOwner {   
        verifiers[_addr] = true;
    }

    function removeVerifier(address _addr) external onlyOwner {    
        verifiers[_addr] = false;
    }

    function getNews(uint256 _newsId) external view returns (
        News memory newsData,
        uint256 trustworthy,
        uint256 questionable,
        uint256 totalVotes
    ) {
        newsData = news[_newsId];
        (trustworthy, questionable, totalVotes) = votingContract.getVotingResults(_newsId);
    }
}
