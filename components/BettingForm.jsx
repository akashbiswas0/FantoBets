"use client"
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { placeBet } from "../utils"

const BettingForm = () => {
  const [gameId, setGameId] = useState('');
  const [predictedScore, setPredictedScore] = useState('');
  const [teamChoice, setTeamChoice] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!gameId || !predictedScore || !teamChoice || !betAmount) {
        throw new Error('Please fill in all fields');
      }

      const receipt = await placeBet(
        parseInt(gameId),
        parseInt(predictedScore),
        parseInt(teamChoice),
        parseFloat(betAmount)
      );

      setSuccess('Bet placed successfully!');
      // Reset form
      setGameId('');
      setPredictedScore('');
      setTeamChoice('');
      setBetAmount('');
    } catch (err) {
      setError(err.message || 'An error occurred while placing the bet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-1/2 mx-auto ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="gameId-input"
          type="number"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter the gameId"
          className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-lg px-4 py-2
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    placeholder-pink-500 text-purple-200"
        />
        
        <input
          id="predictedScore-input"
          type="number"
          value={predictedScore}
          onChange={(e) => setPredictedScore(e.target.value)}
          placeholder="Enter your predicted score"
          className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-lg px-4 py-2
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    placeholder-pink-500 text-purple-200"
        />
        
        <input
          id="teamChoice-input"
          type="number"
          value={teamChoice}
          onChange={(e) => setTeamChoice(e.target.value)}
          placeholder="Enter your team choice"
          className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-lg px-4 py-2
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    placeholder-pink-500 text-purple-200"
        />

        <input
          id="betAmount-input"
          type="number"
          step="0.01"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Enter bet amount in CHZ"
          className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-lg px-4 py-2
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    placeholder-pink-500 text-purple-200"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full border border-green-700 rounded-lg px-6 py-2
                    hover:bg-green-900 hover:bg-opacity-50 transition-colors duration-200
                    focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                    bg-black bg-opacity-30 text-green-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Placing Bet...' : 'Place Bet'}
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        
        {success && (
          <div className="text-green-500 text-sm mt-2">{success}</div>
        )}
      </form>
    </div>
  );
};

export default BettingForm;