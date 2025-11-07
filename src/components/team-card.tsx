import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, TrendingUp, DollarSign, Crown, UserCheck } from 'lucide-react'
import type { Team } from '@/lib/types'

interface TeamCardProps {
  team: Team
  featured?: boolean
}

export function TeamCard({ team, featured = false }: TeamCardProps) {
  // Handle real team structure with proper type handling
  const logoUrl: string = team.logo_url ?? '/teams/default-team-logo.png'
  const description = `${team.name} - A competitive team in the NBA 2K community.`
  
  // Real team data with proper null handling
  const currentRp: number = team.current_rp ?? 0
  const eloRating: number = team.elo_rating ?? 0
  const globalRank: number | null = team.global_rank ?? null
  const leaderboardTier: string = team.leaderboard_tier ?? 'Unknown'
  const moneyWon: number = team.money_won ?? 0
  const avgPlayerRating: number = team.player_rank_score ?? 0
  const hybridScore: number = team.hybrid_score ?? 0

  return (
    <Card className={`group hover:scale-105 transition-all duration-300 ${featured ? 'ring-2 ring-bcg-accent' : ''}`}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center">
          <Image 
            src={logoUrl} 
            alt={`${team.name} Logo`}
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
        <CardTitle className="text-xl">{team.name}</CardTitle>
        <CardDescription className="text-bcg-accent font-medium">
          {leaderboardTier} Tier
        </CardDescription>
        
        {/* Team Stats */}
        <div className="flex justify-center space-x-2 mt-2">
          {globalRank && (
            <Badge variant="outline" className="text-xs">
              Rank #{globalRank}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {leaderboardTier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          {description}
        </p>
        
        {/* Current RP */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-4 w-4 mr-2 text-bcg-accent" />
            <span className="text-sm font-semibold">Current RP</span>
          </div>
          <div className="text-2xl font-bold text-bcg-accent">
            {currentRp.toLocaleString()}
          </div>
        </div>
        
        {/* Team Performance Metrics */}
        <div className="mb-4 space-y-2">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-gray-600 dark:text-gray-400 mb-1">ELO Rating</div>
              <div className="font-semibold text-bcg-accent">{eloRating.toLocaleString()}</div>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-gray-600 dark:text-gray-400 mb-1">Avg Player Rating</div>
              <div className="font-semibold text-bcg-accent">{avgPlayerRating.toFixed(1)}</div>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-gray-600 dark:text-gray-400 mb-1">Hybrid Score</div>
              <div className="font-semibold text-bcg-accent">{hybridScore.toFixed(1)}</div>
            </div>
          </div>
        </div>
        
        {/* Team Stats */}
        <div className="flex justify-center space-x-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            ${moneyWon.toLocaleString()}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {leaderboardTier}
          </Badge>
        </div>
        
        <Button asChild className="w-full">
          <Link href={`/teams/${team.id}`}>
            View Team
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

