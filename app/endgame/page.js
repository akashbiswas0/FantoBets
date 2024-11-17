'use client'

import { useState } from 'react'
import Navbar from "../../components/Navbar"
import { endGame } from "../../utils" // Import the ethers.js function

export default function Endgame() {
  const [formData, setFormData] = useState({
    gameId: '',
    team1Score: '',
    team2Score: ''
  })

  const [loading, setLoading] = useState(false) // To manage button state
  const [message, setMessage] = useState('') // To display success or error messages
  const [txHash, setTxHash] = useState(null) // Store transaction hash

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('') // Clear any previous messages
    setTxHash(null) // Reset transaction hash

    // Validate form data
    const { gameId, team1Score, team2Score } = formData
    if (!gameId || !team1Score || !team2Score) {
      setMessage('All fields are required')
      setLoading(false)
      return
    }

    try {
      // Call the Ethers.js function with parsed integers
      const receipt = await endGame(parseInt(gameId), parseInt(team1Score), parseInt(team2Score))

      // Display success message with block explorer link
      setTxHash(receipt.transactionHash)
      setMessage('Game has been ended successfully!')
    } catch (error) {
      console.error('Error in ending the game:', error)
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const explorerBaseUrl = "https://testnet.chiliscan.com/tx/" // Update for your network, e.g., BNB Chain, Polygon

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-red-900 font-mono">
      <Navbar />
      <div className="w-full flex flex-row p-8">

        <div className="w-1/2">
          <h1 className="text-center text-5xl font-bold mt-40">
            Fan token gated betting <br /> on Chiliz sports network
          </h1>
        </div>

        <div className="w-1/2">
          <h1 className="text-5xl font-extrabold text-white mb-8 mt-20 text-center">End game</h1> 
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-10">
            <div className="space-y-4">
              <input
                type="number"
                name="gameId"
                value={formData.gameId}
                onChange={handleChange}
                placeholder="game Id"
                className="w-full border border-purple-700/50 rounded-lg px-4 py-2 
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         bg-black/20"
              />
              
              <input
                type="number"
                name="team1Score"
                value={formData.team1Score}
                onChange={handleChange}
                placeholder="team 1 score"
                className="w-full border border-purple-700/50 rounded-lg px-4 py-2 
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         bg-black/20"
              />
              
              <input
                type="number"
                name="team2Score"
                value={formData.team2Score}
                onChange={handleChange}
                placeholder="team 2 score"
                className="w-full border border-purple-700/50 rounded-lg px-4 py-2 
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                         bg-black/20"
              />
            </div>
            
            <button
              type="submit"
              className={`w-1/2 border border-red-700/50 rounded-lg px-4 py-2 text-white
                       ${loading ? 'bg-red-900/50 cursor-not-allowed' : 'hover:bg-red-900/30'}
                       transition-colors duration-200
                       focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
                       bg-black/20`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'End the Game'}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-white">
              {message}
            </p>
          )}

          {txHash && (
            <p className="mt-2 text-center text-green-400">
              View on Block Explorer: <a href={`${explorerBaseUrl}${txHash}`} target="_blank" className="underline">
                {txHash}
              </a>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}
