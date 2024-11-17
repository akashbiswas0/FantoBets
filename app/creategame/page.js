'use client';

import { useState } from 'react';
import Navbar from "../../components/Navbar";
import { createGame } from "../../utils"; // Import createGame function

export default function Creategame() {
  const [formData, setFormData] = useState({
    team1Token: '',
    team2Token: '',
    gameName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTransactionHash('');
    setError('');

    try {
      const { gameName, team1Token, team2Token } = formData;

      // Call the createGame function and pass the form data
      const receipt = await createGame(gameName, team1Token, team2Token);

      console.log('Transaction successful:', receipt);
      setTransactionHash(receipt.transactionHash); // Show the transaction hash
    } catch (err) {
      console.error('Error creating game:', err);
      setError(err.message || 'An error occurred while creating the game.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-red-900 font-mono">
      <Navbar />
      <div className="flex flex-row w-full">
        <div className="w-1/2 p-8 py-10 ml-20">
          <h1 className="text-5xl text-white mb-3 mt-16 font-bold text-center">Create Games</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-900 p-10 rounded-lg"
          >
            <div className="space-y-4">
              <input
                type="text"
                name="gameName"
                value={formData.gameName}
                onChange={handleChange}
                placeholder="Game Name"
                className="w-full bg-transparent border border-purple-700/50 rounded-lg px-4 py-2 
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         bg-slate-300"
                required
              />

              <input
                type="text"
                name="team1Token"
                value={formData.team1Token}
                onChange={handleChange}
                placeholder="Team 1 Fan Token"
                className="w-full bg-transparent border border-purple-700/50 rounded-lg px-4 py-2 
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         bg-slate-300"
                required
              />

              <input
                type="text"
                name="team2Token"
                value={formData.team2Token}
                onChange={handleChange}
                placeholder="Team 2 Fan Token"
                className="w-full bg-transparent border border-purple-700/50 rounded-lg px-4 py-2 
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         bg-slate-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/2 border border-green-700/50 rounded-lg px-4 py-2 text-white
                       hover:bg-green-900/30 transition-colors duration-200
                       focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                       bg-black/20 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating Game...' : 'Create Game'}
            </button>
          </form>

          {transactionHash && (
            <p className="text-green-500 text-center mt-4">
              Game created successfully! Transaction Hash: {transactionHash}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center mt-4">
              Error: {error}
            </p>
          )}
        </div>

        <div className="w-3/4">
          <h1 className="text-center text-5xl font-bold mt-40">
            Fan token gated betting on <br /> Chiliz sports network
          </h1>
        </div>
      </div>
    </div>
  );
}
