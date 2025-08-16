import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Users, Calendar, MapPin } from 'lucide-react'
import { getTeam } from '@/lib/fetchers'
import { formatDate } from '@/lib/utils'

interface TeamPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { slug } = await params
  const team = await getTeam(slug)
  
  if (!team) {
    return {
      title: 'Team Not Found - Bodega Cats Gaming Club',
    }
  }

  return {
    title: `${team.name} - Bodega Cats Gaming Club`,
    description: team.description || `Learn more about ${team.name}, a competitive team in the NBA 2K community.`,
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params
  const team = await getTeam(slug)

  if (!team) {
    notFound()
  }

  // Handle new team structure
  const logoUrl = team.logo_url || '/teams/default-team-logo.png'
  const tagline = team.tag || team.name
  const description = team.description || 'A competitive team in the NBA 2K community.'
  const players = team.players || []

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 mb-6">
            <img 
              src={logoUrl} 
              alt={`${team.name} Logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{team.name}</h1>
          <p className="text-xl text-bcg-accent font-medium mb-4">{tagline}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
          
          {/* Team Status */}
          <div className="mt-6 flex justify-center">
            <Badge variant={team.is_active ? "default" : "outline"}>
              {team.is_active ? 'Active Team' : 'Inactive Team'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Roster */}
          <div>
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 mr-3 text-bcg-accent" />
              <h2 className="text-2xl font-bold">Roster</h2>
              <Badge variant="outline" className="ml-3">{players.length} Players</Badge>
            </div>
            <div className="space-y-4">
              {players.length > 0 ? (
                players.map((player) => (
                  <Card key={player.id} className="hover:scale-105 transition-transform">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                          {player.avatar_url ? (
                            <img 
                              src={player.avatar_url} 
                              alt={player.name}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : (
                            <span className="text-sm font-semibold">
                              {player.name.split(' ').map(word => word[0]).join('')}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {player.role || 'Player'}
                          </p>
                        </div>
                        <Badge variant="outline">{player.role || 'Player'}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      No players currently on this team.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Team Info */}
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="h-6 w-6 mr-3 text-bcg-accent" />
              <h2 className="text-2xl font-bold">Team Information</h2>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Created:</span>
                    <span>{formatDate(team.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span>{formatDate(team.updated_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <Badge variant={team.is_active ? "default" : "outline"}>
                      {team.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  {team.region_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Region ID:</span>
                      <span className="font-mono text-sm">{team.region_id}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
