"use client";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./contractRef";

export let signer = null;
export let provider;

export async function connectWithMetamask() {
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
    } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        return await provider.send("eth_requestAccounts", []);
    }
}

connectWithMetamask();

// Create a new game
export async function createGame(team1TokenAddress, team2TokenAddress) {
    try {
      const signer = await connectWithMetamask();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      const tx = await contract.createGame(team1TokenAddress, team2TokenAddress);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error("Error in createGame:", error);
      throw error; 
    }
  }

// Place a bet on a game
export async function placeBet(gameId, predictedScore, teamChoice, betAmount) {
    try {
        await connectWithMetamask();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.placeBet(
            gameId,
            predictedScore,
            teamChoice,
            { value: ethers.parseEther(betAmount.toString()) }
        );
        const receipt = await tx.wait();
        return receipt;
    } catch (error) {
        console.error("Error in placeBet:", error);
        throw error;
    }
}

// End a game and set final scores
export async function endGame(gameId, team1Score, team2Score) {
    try {
        await connectWithMetamask();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.endGame(gameId, team1Score, team2Score);
        const receipt = await tx.wait();
        return receipt;
    } catch (error) {
        console.error("Error in endGame:", error);
        throw error;
    }
}

// Get bet details for a specific bettor
export async function getBet(gameId, bettorAddress) {
    try {
        await connectWithMetamask();
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const betDetails = await contract.getBet(gameId, bettorAddress);
        return {
            bettor: betDetails[0],
            amount: ethers.formatEther(betDetails[1]),
            predictedScore: Number(betDetails[2]),
            teamChoice: Number(betDetails[3])
        };
    } catch (error) {
        console.error("Error in getBet:", error);
        throw error;
    }
}

// Get game status and details
export async function getGameStatus(gameId) {
    try {
        await connectWithMetamask();
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const status = await contract.getGameStatus(gameId);
        return {
            isActive: status[0],
            isFinalized: status[1],
            team1ActualScore: Number(status[2]),
            team2ActualScore: Number(status[3]),
            totalTeam1Bets: ethers.formatEther(status[4]),
            totalTeam2Bets: ethers.formatEther(status[5])
        };
    } catch (error) {
        console.error("Error in getGameStatus:", error);
        throw error;
    }
}

// Listen to events
export async function setupEventListeners(callback) {
    try {
        await connectWithMetamask();
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);

        // Listen for bet placed events on chiliz
        contract.on("BetPlaced", (gameId, bettor, amount, predictedScore, teamChoice) => {
            callback({
                event: "BetPlaced",
                gameId: Number(gameId),
                bettor,
                amount: ethers.formatEther(amount),
                predictedScore: Number(predictedScore),
                teamChoice: Number(teamChoice)
            });
        });

        // Listen for game ended events
        contract.on("GameEnded", (gameId, team1Score, team2Score) => {
            callback({
                event: "GameEnded",
                gameId: Number(gameId),
                team1Score: Number(team1Score),
                team2Score: Number(team2Score)
            });
        });

        // Listen for winnings distributed events
        contract.on("WinningsDistributed", (gameId, winner, amount) => {
            callback({
                event: "WinningsDistributed",
                gameId: Number(gameId),
                winner,
                amount: ethers.formatEther(amount)
            });
        });
    } catch (error) {
        console.error("Error in setupEventListeners:", error);
        throw error;
    }
}