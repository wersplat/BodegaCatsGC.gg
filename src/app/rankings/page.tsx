import { Metadata } from 'next'
import { RankingsTeaser } from '@/components/rankings-teaser'
import { LeaderboardTable } from '@/components/leaderboard-table'
import { getRankings } from '@/lib/fetchers'

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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track player performance and see where your favorite competitors stand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Rankings Teaser */}
          <div className="lg:col-span-1">
            <RankingsTeaser />
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Current Rankings</h2>
              <LeaderboardTable rankings={rankings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
