// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FootballBetting {
    struct Bet {
        address bettor;
        uint256 amount;
        uint256 predictedScore;
        uint8 teamChoice; 
    }

    struct Game {
        address team1fantokenaddress;
        address team2fantokenaddress;
        uint256 gameId;
        bool isActive;
        uint256 team1ActualScore;
        uint256 team2ActualScore;
        uint256 totalTeam1Bets;
        uint256 totalTeam2Bets;
        bool isFinalized;
        mapping(address => Bet) bets;
        address[] team1Bettors;
        address[] team2Bettors;
    }

    address public platformWallet;
    uint256 public platformFeePercent = 15;
    mapping(uint256 => Game) public games;
    uint256 public currentGameId;

    event BetPlaced(uint256 gameId, address bettor, uint256 amount, uint256 predictedScore, uint8 teamChoice);
    event GameEnded(uint256 gameId, uint256 team1Score, uint256 team2Score);
    event WinningsDistributed(uint256 gameId, address winner, uint256 amount);

    constructor(address _platformWallet) {
        platformWallet = _platformWallet;
    }

    function createGame(address _team1fantokenaddress, address _team2fantokenaddress) external returns (uint256) {
        currentGameId++;
        games[currentGameId].gameId = currentGameId;
        games[currentGameId].isActive = true;
        games[currentGameId].team1fantokenaddress = _team1fantokenaddress;
        games[currentGameId].team2fantokenaddress = _team2fantokenaddress;
        return currentGameId;
    }

    function placeBet(uint256 gameId, uint256 predictedScore, uint8 teamChoice) external payable {
        require(games[gameId].isActive, "Game is not active");
        require(!games[gameId].isFinalized, "Game is already finalized");
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(teamChoice == 1 || teamChoice == 2, "Invalid team choice");
        require(games[gameId].bets[msg.sender].amount == 0, "Already placed a bet");

        Bet memory newBet = Bet({
            bettor: msg.sender,
            amount: msg.value,
            predictedScore: predictedScore,
            teamChoice: teamChoice
        });

        games[gameId].bets[msg.sender] = newBet;

        if (teamChoice == 1) {
            games[gameId].totalTeam1Bets += msg.value;
            games[gameId].team1Bettors.push(msg.sender);
        } else {
            games[gameId].totalTeam2Bets += msg.value;
            games[gameId].team2Bettors.push(msg.sender);
        }

        emit BetPlaced(gameId, msg.sender, msg.value, predictedScore, teamChoice);
    }

    function endGame(uint256 gameId, uint256 team1Score, uint256 team2Score) external {
        require(games[gameId].isActive, "Game is not active");
        require(!games[gameId].isFinalized, "Game already finalized");

        games[gameId].team1ActualScore = team1Score;
        games[gameId].team2ActualScore = team2Score;
        games[gameId].isActive = false;
        games[gameId].isFinalized = true;

        distributePrizes(gameId);
        emit GameEnded(gameId, team1Score, team2Score);
    }

    function distributePrizes(uint256 gameId) internal {
        uint256 totalPool = games[gameId].totalTeam1Bets + games[gameId].totalTeam2Bets;
        uint256 platformFee = (totalPool * platformFeePercent) / 100;
        
        // platform feeees
        (bool success, ) = platformWallet.call{value: platformFee}("");
        require(success, "Platform fee transfer failed");

        // Calculate distributable amount (99% of remaining pool after platform fee)
        uint256 remainingPool = totalPool - platformFee;
        uint256 distributableAmount = (remainingPool * 99) / 100;
        uint256 team1Pool = (distributableAmount * games[gameId].totalTeam1Bets) / totalPool;
        uint256 team2Pool = (distributableAmount * games[gameId].totalTeam2Bets) / totalPool;

        // Distribute to team 1 bettors
        distributeTeamPrizes(gameId, 1, team1Pool);
        // Distribute to team 2 bettors
        distributeTeamPrizes(gameId, 2, team2Pool);
    }

    function distributeTeamPrizes(uint256 gameId, uint8 teamChoice, uint256 teamPool) internal {
        address[] memory bettors = teamChoice == 1 ? games[gameId].team1Bettors : games[gameId].team2Bettors;
        uint256 actualScore = teamChoice == 1 ? games[gameId].team1ActualScore : games[gameId].team2ActualScore;
        
        // Calculate score differences for weight distribution
        uint256[] memory scoreDiffs = new uint256[](bettors.length);
        uint256 totalWeights = 0;
        
        for (uint256 i = 0; i < bettors.length; i++) {
            Bet storage bet = games[gameId].bets[bettors[i]];
            scoreDiffs[i] = abs(bet.predictedScore, actualScore);
            // Inverse the difference so closer predictions get higher weights
            totalWeights += (1000 - scoreDiffs[i]);
        }

        // Distribute prizes based on prediction accuracy
        for (uint256 i = 0; i < bettors.length; i++) {
            Bet storage bet = games[gameId].bets[bettors[i]];
            uint256 weight = 1000 - scoreDiffs[i];
            uint256 prize = (teamPool * weight) / totalWeights;
            
            if (prize > 0) {
                (bool success, ) = bet.bettor.call{value: prize}("");
                require(success, "Prize transfer failed");
                emit WinningsDistributed(gameId, bet.bettor, prize);
            }
        }
    }

    function abs(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a - b : b - a;
    }

    function getBet(uint256 gameId, address bettor) external view returns (
        address, uint256, uint256, uint8
    ) {
        Bet storage bet = games[gameId].bets[bettor];
        return (bet.bettor, bet.amount, bet.predictedScore, bet.teamChoice);
    }

    function getGameStatus(uint256 gameId) external view returns (
        bool isActive,
        bool isFinalized,
        uint256 team1ActualScore,
        uint256 team2ActualScore,
        uint256 totalTeam1Bets,
        uint256 totalTeam2Bets
    ) {
        Game storage game = games[gameId];
        return (
            game.isActive,
            game.isFinalized,
            game.team1ActualScore,
            game.team2ActualScore,
            game.totalTeam1Bets,
            game.totalTeam2Bets
        );
    }
}