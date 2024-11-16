export const contractAddress = "0xFd2a097b56606Ac0842eA332271915428840cf97";
export const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_platformWallet",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bettor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "predictedScore",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "teamChoice",
				"type": "uint8"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "createGame",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team1Score",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team2Score",
				"type": "uint256"
			}
		],
		"name": "endGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "team1Score",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "team2Score",
				"type": "uint256"
			}
		],
		"name": "GameEnded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "predictedScore",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "teamChoice",
				"type": "uint8"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WinningsDistributed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "currentGameId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "games",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "team1ActualScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team2ActualScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTeam1Bets",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTeam2Bets",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isFinalized",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bettor",
				"type": "address"
			}
		],
		"name": "getBet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			}
		],
		"name": "getGameStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isFinalized",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "team1ActualScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "team2ActualScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTeam1Bets",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTeam2Bets",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]