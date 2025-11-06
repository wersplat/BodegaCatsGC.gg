import { Metadata } from 'next'
import { RankingsTeaser } from '@/components/rankings-teaser'
import { LeaderboardTable } from '@/components/leaderboard-table'
import { getRankings } from '@/lib/fetchers'
import { EXTERNAL_CONFIG } from '@/lib/config'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rankings - Bodega Cats Gaming Club',
  description: 'View player rankings and leaderboards for Bodega Cats Gaming Club. Track performance across all tournaments.',
}

export default async function RankingsPage() {
  const rankings = await getRankings()

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Rankings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Track player performance and see where your favorite competitors stand.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <a 
                href={EXTERNAL_CONFIG.GLOBAL_RANKINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <span>View Full Rankings on ProAmRank.gg</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Rankings Teaser */}
          <div className="lg:col-span-1">
            <RankingsTeaser />
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Current Rankings</h2>
                <Button asChild variant="outline" size="sm">
                  <a 
                    href={EXTERNAL_CONFIG.GLOBAL_RANKINGS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>View on ProAmRank.gg</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
              <LeaderboardTable rankings={rankings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
