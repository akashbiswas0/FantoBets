"use client"
import { useRouter } from 'next/navigation'
import Navbar from "../../components/Navbar"

export default function Availablegames() {
  const router = useRouter()

  const games = [
    { id: 1, title: "Real Madrid vs Barcelona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2U-0mOzuEFKxgRKLpq-qABkxvh-9WTq13Q&s" },
  ]

  const handleGameClick = (gameId) => {
    router.push(`/selected-game`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-red-900">
      <Navbar />
      <div className="container mx-auto px-20 py-8 ">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-2xl md:text-4xl text-center font-bold text-white/90 font-sans">
            available sport games for betting
          </h1>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="bg-black/30 border border-gray-700 rounded-lg p-4 cursor-pointer 
                       transform transition-all duration-300 hover:scale-105 hover:border-purple-500"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-white font-medium text-center">{game.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button>Get game id</button>
        </div>
      </div>
    </div>
  )
}