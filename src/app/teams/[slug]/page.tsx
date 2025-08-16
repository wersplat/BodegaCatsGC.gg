import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Users, Calendar } from 'lucide-react'
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
    description: team.description,
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params
  const team = await getTeam(slug)

  if (!team) {
    notFound()
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-6">
            <span className="text-4xl font-bold" style={{ color: team.color }}>
              {team.name.split(' ').map(word => word[0]).join('')}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{team.name}</h1>
          <p className="text-xl text-bcg-accent font-medium mb-4">{team.tagline}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {team.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Roster */}
          <div>
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 mr-3 text-bcg-accent" />
              <h2 className="text-2xl font-bold">Roster</h2>
            </div>
            <div className="space-y-4">
              {team.players.map((player) => (
                <Card key={player.id} className="hover:scale-105 transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {player.name.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{player.role}</p>
                      </div>
                      <Badge variant="outline">{player.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 mr-3 text-bcg-accent" />
              <h2 className="text-2xl font-bold">Achievements</h2>
            </div>
            <div className="space-y-4">
              {team.achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {achievement.description}
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="ml-2">
                        #{achievement.placement}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(achievement.date)}
                      {achievement.tournament && (
                        <span className="ml-2 text-bcg-accent">
                          • {achievement.tournament}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
