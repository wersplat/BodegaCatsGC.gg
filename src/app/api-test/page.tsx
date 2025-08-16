'use client'

import { useEffect, useState } from 'react'
import { getTeams, getTeam } from '@/lib/fetchers'
import type { Team } from '@/lib/types'

export default function ApiTestPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testApi() {
      try {
        console.log('Testing API calls...')
        
        // Test getting all teams
        const allTeams = await getTeams()
        console.log('All teams:', allTeams)
        setTeams(allTeams)
        
        // Test getting specific team
        if (allTeams.length > 0) {
          const firstTeam = allTeams[0]
          const team = await getTeam(firstTeam.id)
          console.log('Specific team:', team)
        }
        
        setLoading(false)
      } catch (err) {
        console.error('API test error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    testApi()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">API Test</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">API Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Teams Found: {teams.length}</h2>
        {teams.map((team) => (
          <div key={team.id} className="border p-4 mb-2 rounded">
            <h3 className="font-semibold">{team.name}</h3>
            <p>ID: {team.id}</p>
            <p>Current RP: {team.current_rp}</p>
            <p>ELO: {team.elo_rating}</p>
            <p>Global Rank: {team.global_rank}</p>
            <p>Tier: {team.leaderboard_tier}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <strong>Success!</strong> API calls are working. Check the browser console for detailed logs.
      </div>
    </div>
  )
}
