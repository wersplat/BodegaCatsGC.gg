import { Metadata } from 'next'
import { TeamCard } from '@/components/team-card'
import { getTeams, getAllTeamRosters } from '@/lib/fetchers'

export const metadata: Metadata = {
  title: 'Teams - Bodega Cats Gaming Club',
  description: 'Meet the elite teams of Bodega Cats Gaming Club. From street-smart Bodega Cats to sophisticated Capitol City Cats.',
}

export default async function TeamsPage() {
  const teams = await getTeams()
  const teamRosters = await getAllTeamRosters()

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our Teams
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the elite squads that represent Bodega Cats Gaming Club in competitive play.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teams.map((team) => {
            // Find roster data for this team
            const roster = teamRosters.find(r => r.team_id === team.id)
            return (
              <TeamCard 
                key={team.id} 
                team={team} 
                roster={roster}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
