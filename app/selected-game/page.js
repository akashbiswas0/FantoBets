'use client'

import { useState } from 'react';
import Navbar from "../../components/Navbar"
import BettingForm from "../../components/BettingForm";

export default function SelectedGames() {
  const [intent, setIntent] = useState('')
  const [gameId, setGameId] = useState('')
  const [predictedScore, setPredictedScore] = useState('')
  const [teamChoice, setTeamChoice] = useState('')
  
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log('Intent submitted:', intent)
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-red-900 text-white font-mono ">
        <Navbar />  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-20 mt-10">
        <div className="space-y-6">
          <div className=" border-purple-700 rounded-lg overflow-hidden">
          </div>
          <div className="border-2 hover:border border-purple-700 rounded-md aspect-square w-full max-w-md relative bg-black bg-opacity-30">
            <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="https://i.pinimg.com/736x/08/28/2c/08282c74547b4fd6540c0619f65b136a.jpg" 
              alt="Match Banner" 
              className="w-full h-full object-cover"
            />
            </div>
          </div>
          <div className="text-purple-200 max-w-md bg-black bg-opacity-30 p-4 rounded-lg">
            <p className=''>details about the game where the user will give intent for betting</p>
            <div className="mt-4 space-y-2">
              {/* <p>Game ID: #12345</p>
              <p>Type: Football Match</p>
              <p>Teams: Team A vs Team B</p>
              <p>Start Time: 20:00 UTC</p>
              <p>Minimum Bet: 0.1 ETH</p> */}
            </div>
          </div>
        </div>
        <div className="space-y-6">
        <h1 className='text-purple-200 mt-6 text-xl'>Place your bet below</h1>
        
       <BettingForm />
                <div className='border border-white'></div>
          <p className="text-purple-200 mt-16 text-xl">Enter your intent below for the betting</p>
            <form className="space-y-4">
              <input
              id="intent-input"
              type="text"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="enter your intent"
              className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-lg px-4 py-2 
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                       placeholder-blue-500 text-purple-200"
            />
            
            <button
              type="submit"
              className="border border-green-700 rounded-lg px-6 py-2 
                       hover:bg-green-900 hover:bg-opacity-50 transition-colors duration-200
                       focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                       bg-black bg-opacity-30 text-green-300"
            >
              approve this intent
            </button>
          </form>
          <div className="mt-8 text-sm text-purple-400 bg-black bg-opacity-30 p-4 rounded-lg">
            <p>* Your intent will be approved</p>
           
          </div>
        </div>
      </div>
    </div>
  )
}