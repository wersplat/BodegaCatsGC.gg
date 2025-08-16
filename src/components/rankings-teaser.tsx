'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EXTERNAL_CONFIG } from '@/lib/config'
import { TrendingUp, ExternalLink } from 'lucide-react'

export function RankingsTeaser() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Global Rankings
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how Bodega Cats players stack up against the world&apos;s best in the NBA 2K Global Rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Rankings Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-bcg-accent rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Real-time Rankings</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Updated live as matches are played
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-bcg-accent rounded-full"></div>
                <span>Global leaderboard with thousands of players</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-bcg-accent rounded-full"></div>
                <span>Detailed statistics and performance metrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-bcg-accent rounded-full"></div>
                <span>Tournament and league-specific rankings</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a 
                  href={EXTERNAL_CONFIG.GLOBAL_RANKINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>View Full Rankings</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg">
                <a 
                  href="/rankings"
                  className="flex items-center space-x-2"
                >
                  <span>Our Rankings</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Rankings Embed */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Live Rankings</CardTitle>
              <CardDescription>
                Current top players in the global rankings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-b-lg">
                <EmbedFrame src={EXTERNAL_CONFIG.GLOBAL_RANKINGS_EMBED_URL} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function EmbedFrame({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      className="w-full h-full border-0"
      title="NBA 2K Global Rankings"
      loading="lazy"
    />
  )
}
