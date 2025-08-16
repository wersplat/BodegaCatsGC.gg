import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Users, Calendar, MapPin, TrendingUp, Award, DollarSign, Target } from 'lucide-react'
import { getTeam } from '@/lib/fetchers'
import { formatDate } from '@/lib/utils'
import { mockTeamRoster } from '@/lib/mock'

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
    description: `Learn more about ${team.name}, a competitive team in the NBA 2K community.`,
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params
  const team = await getTeam(slug)

  if (!team) {
    notFound()
  }

  // Handle real team structure
  const logoUrl = team.logo_url || '/teams/default-team-logo.png'
  const description = `${team.name} - A competitive team in the NBA 2K community.`
  
  // Get team roster (in real app, this would come from API)
  const teamRoster = mockTeamRoster.filter(player => player.team_id === team.id)
  const playerCount = teamRoster.length

  // Real team data
  const currentRp = team.current_rp || 0
  const eloRating = team.elo_rating || 0
  const globalRank = team.global_rank
  const leaderboardTier = team.leaderboard_tier || 'Unknown'
  const moneyWon = team.money_won || 0
  const playerRankScore = team.player_rank_score || 0
  const createdAt = team.created_at

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
          <p className="text-xl text-bcg-accent font-medium mb-4">{leaderboardTier} Tier</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
          
          {/* Team Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {globalRank && (
              <Badge variant="outline">
                Global Rank #{globalRank}
              </Badge>
            )}
            <Badge variant="outline">
              {leaderboardTier} Tier
            </Badge>
            <Badge variant="outline">
              ELO: {eloRating}
            </Badge>
            <Badge variant="outline">
              ${moneyWon.toLocaleString()} Won
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Stats */}
          <div className="lg:col-span-1">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Team Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Current Performance</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Current RP: <span className="font-bold">{currentRp.toLocaleString()}</span></div>
                    <div>ELO Rating: <span className="font-bold">{eloRating}</span></div>
                    <div>Global Rank: <span className="font-bold">{globalRank || 'N/A'}</span></div>
                    <div>Player Score: <span className="font-bold">{playerRankScore.toFixed(1)}</span></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Financial</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Money Won: <span className="font-bold">${moneyWon.toLocaleString()}</span></div>
                    <div>Tier: <span className="font-bold">{leaderboardTier}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Team Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span>{createdAt ? formatDate(createdAt) : 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tier:</span>
                  <span>{leaderboardTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Global Rank:</span>
                  <span>{globalRank || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ELO Rating:</span>
                  <span>{eloRating}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roster */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 mr-3 text-bcg-accent" />
              <h2 className="text-2xl font-bold">Roster</h2>
              <Badge variant="outline" className="ml-3">{playerCount} Players</Badge>
            </div>
            <div className="space-y-4">
              {playerCount > 0 ? (
                teamRoster.map((player) => (
                  <Card key={player.player_id} className="hover:scale-105 transition-transform">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold">
                            {player.gamertag?.split(' ').map(word => word[0]).join('') || '??'}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{player.gamertag}</h3>
                            {player.is_captain && (
                              <Badge variant="default" className="text-xs">
                                Captain
                              </Badge>
                            )}
                            {player.is_player_coach && (
                              <Badge variant="default" className="text-xs">
                                Coach
                              </Badge>
                            )}
                            {player.position && (
                              <Badge variant="outline" className="text-xs">
                                {player.position}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                            {player.salary_tier && (
                              <div>Salary Tier: <span className="font-medium">{player.salary_tier}</span></div>
                            )}
                            {player.monthly_value && (
                              <div>Monthly Value: <span className="font-medium">${player.monthly_value.toLocaleString()}</span></div>
                            )}
                            {player.joined_at && (
                              <div>Joined: <span className="font-medium">{formatDate(player.joined_at)}</span></div>
                            )}
                          </div>
                          
                          {/* Player Stats */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <h4 className="font-semibold text-sm mb-2">Player Information</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                              <div>Position: <span className="font-bold">{player.position || 'N/A'}</span></div>
                              <div>Salary Tier: <span className="font-bold">{player.salary_tier || 'N/A'}</span></div>
                              <div>Monthly Value: <span className="font-bold">${player.monthly_value?.toLocaleString() || '0'}</span></div>
                              <div>Role: <span className="font-bold">{player.is_captain ? 'Captain' : player.is_player_coach ? 'Coach' : 'Player'}</span></div>
                            </div>
                          </div>
                        </div>
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
        </div>
      </div>
    </div>
  )
}
