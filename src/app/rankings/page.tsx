import { Metadata } from 'next'
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
        </div>

        {/* Global Rankings CTA */}
        <div className="mb-8">
          <div className="bg-bcg-accent/10 dark:bg-bcg-accent/20 rounded-xl p-4 border border-bcg-accent/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  View Global Rankings
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  See how Bodega Cats players stack up against the world&apos;s best
                </p>
              </div>
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
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Current Rankings</h2>
          </div>
          <LeaderboardTable rankings={rankings} />
        </div>
      </div>
    </div>
  )
}
