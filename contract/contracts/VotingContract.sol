// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract VotingContract {
    struct VotingData {
        uint256 trustworthy;
        uint256 questionable;
        uint256 totalVotes;
        uint256 deadline;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => VotingData) private votingRecords;

    error VotingWindowExpired(uint256 deadline, uint256 currentTime);
    error AlreadyVoted(address voter);
    error InvalidNewsId(uint256 newsId);

    function initializeVoting(uint256 _newsId) external {
        VotingData storage voting = votingRecords[_newsId];
        voting.deadline = block.timestamp + 2 hours;
    }

    function vote(bytes1 option, uint256 _newsId, address _voter) external {
        VotingData storage voting = votingRecords[_newsId];

        if (voting.deadline == 0) {
            revert InvalidNewsId(_newsId);
        }

        if (voting.hasVoted[_voter]) {
            revert AlreadyVoted(_voter);
        }

        if (block.timestamp > voting.deadline) {
            revert VotingWindowExpired(voting.deadline, block.timestamp);
        }

        option == "1" ? voting.trustworthy++ : voting.questionable++;
        voting.totalVotes++;
        voting.hasVoted[_voter] = true;
    }

    function hasVoted(address _user, uint256 _newsId) external view returns (bool) {
        return votingRecords[_newsId].hasVoted[_user];
    }

    function getVotingResults(uint256 _newsId) external view returns (
        uint256 trustworthy,
        uint256 questionable,
        uint256 totalVotes
    ) {
        VotingData storage voting = votingRecords[_newsId];
        return (voting.trustworthy, voting.questionable, voting.totalVotes);
    }
}
