'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EXTERNAL_CONFIG } from '@/lib/config'
import { TrendingUp, ExternalLink } from 'lucide-react'

export function RankingsTeaser() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-bcg-accent" />
          <span>Global Rankings</span>
        </CardTitle>
        <CardDescription>
          See how Bodega Cats players stack up against the world&apos;s best in the NBA 2K Global Rankings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-bcg-accent rounded-full"></div>
            <span className="text-sm">Global leaderboard with thousands of players</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-bcg-accent rounded-full"></div>
            <span className="text-sm">Detailed statistics and performance metrics</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-bcg-accent rounded-full"></div>
            <span className="text-sm">Tournament and league-specific rankings</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <a 
              href={EXTERNAL_CONFIG.GLOBAL_RANKINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2"
            >
              <span>View Full Rankings</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <a href="/rankings">
              <span>Our Rankings</span>
            </a>
          </Button>
        </div>

        {/* Rankings Embed */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">Live Rankings Preview</p>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <EmbedFrame src={EXTERNAL_CONFIG.GLOBAL_RANKINGS_EMBED_URL} />
          </div>
        </div>
      </CardContent>
    </Card>
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
