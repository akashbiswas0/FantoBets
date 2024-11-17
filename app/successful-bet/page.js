'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'

export default function SuccessPage() {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    // Set window dimensions for confetti
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Set up redirection timer
    const redirectTimer = setTimeout(() => {
      router.push('/endgame') // Replace with your desired redirect path
    }, 5000) // 5 seconds

    // Clean up timer on component unmount
    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-red-900 flex items-center justify-center font-mono">
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={900}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Congratulations!</h1>
        <p className="text-xl text-purple-200">Your bet was placed successfully.</p>
        <p className="text-sm text-gray-400 mt-8">Redirecting in a few seconds...</p>
      </div>
    </div>
  )
}