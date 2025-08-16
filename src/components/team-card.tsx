import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Team } from '@/lib/types'

interface TeamCardProps {
  team: Team
  featured?: boolean
}

export function TeamCard({ team, featured = false }: TeamCardProps) {
  return (
    <Card className={`group hover:scale-105 transition-all duration-300 ${featured ? 'ring-2 ring-bcg-accent' : ''}`}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center">
          <img 
            src={team.logo} 
            alt={`${team.name} Logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <CardTitle className="text-xl">{team.name}</CardTitle>
        <CardDescription className="text-bcg-accent font-medium">
          {team.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {team.description}
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          <Badge variant="outline">{team.players.length} Players</Badge>
          <Badge variant="outline">{team.achievements.length} Achievements</Badge>
        </div>
        <Button asChild className="w-full">
          <Link href={`/teams/${team.slug}`}>
            View Team
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Simple Badge component for the team card
function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'outline' }) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  const variantClasses = variant === 'outline' 
    ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
    : 'bg-bcg-accent text-white'
  
  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {children}
    </span>
  )
}
