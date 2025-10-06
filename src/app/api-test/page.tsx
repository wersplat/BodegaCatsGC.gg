'use client'

import { useEffect, useState } from 'react'
import { getTeams, getTeam, getKnownTeams, getTeamRoster } from '@/lib/fetchers'
import type { Team } from '@/lib/types'

export default function ApiTestPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [knownTeams, setKnownTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testApi() {
      try {
        console.log('Testing API calls...')
        
        // Test getting known teams (Bodega Cats and Capitol City Cats)
        const knownTeamsData = await getKnownTeams()
        console.log('Known teams (Bodega Cats & Capitol City Cats):', knownTeamsData)
        setKnownTeams(knownTeamsData)
        
        // Test getting all teams
        const allTeams = await getTeams()
        console.log('All teams:', allTeams)
        setTeams(allTeams)
        
        // Test getting specific team and roster
        if (knownTeamsData.length > 0) {
          const firstTeam = knownTeamsData[0]
          const team = await getTeam(firstTeam.id)
          console.log('Specific team:', team)
          
          const roster = await getTeamRoster(firstTeam.id)
          console.log('Team roster:', roster)
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
      <h1 className="text-2xl font-bold mb-4">API Test - Real Data Integration</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Known Teams (Bodega Cats & Capitol City Cats): {knownTeams.length}</h2>
        {knownTeams.map((team) => (
          <div key={team.id} className="border p-4 mb-2 rounded bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-lg">{team.name}</h3>
            <p><strong>ID:</strong> {team.id}</p>
            <p><strong>Current RP:</strong> {team.current_rp}</p>
            <p><strong>ELO Rating:</strong> {team.elo_rating?.toFixed(2)}</p>
            <p><strong>Global Rank:</strong> {team.global_rank}</p>
            <p><strong>Tier:</strong> {team.leaderboard_tier}</p>
            <p><strong>Money Won:</strong> ${team.money_won || 0}</p>
            <p><strong>Player Rank Score:</strong> {team.player_rank_score?.toFixed(2)}</p>
            <p><strong>Logo URL:</strong> {team.logo_url ? '✅ Available' : '❌ Not available'}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Teams: {teams.length}</h2>
        <p className="text-gray-600 dark:text-gray-400">Showing first 5 teams from the full database:</p>
        {teams.slice(0, 5).map((team) => (
          <div key={team.id} className="border p-4 mb-2 rounded">
            <h3 className="font-semibold">{team.name}</h3>
            <p>ID: {team.id}</p>
            <p>Current RP: {team.current_rp}</p>
            <p>ELO: {team.elo_rating?.toFixed(2)}</p>
            <p>Global Rank: {team.global_rank}</p>
            <p>Tier: {team.leaderboard_tier}</p>
          </div>
        ))}
        {teams.length > 5 && <p className="text-gray-500">... and {teams.length - 5} more teams</p>}
      </div>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <strong>Success!</strong> API calls are working with real backend data. Check the browser console for detailed logs.
      </div>
    </div>
  )
}
