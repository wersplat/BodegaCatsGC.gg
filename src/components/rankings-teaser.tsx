import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, BarChart3 } from 'lucide-react'
import { globalRankingsUrl, globalRankingsEmbedUrl } from '@/lib/config'

export function RankingsTeaser() {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto mb-4 w-16 h-16 bg-bcg-accent rounded-2xl flex items-center justify-center">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Global Rankings</CardTitle>
        <CardDescription className="text-lg">
          View the complete global leaderboard and track player performance across all tournaments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400">
          Our rankings are powered by the global gaming community. See where your favorite players stand and track their progress over time.
        </p>
        
        <Button asChild size="lg" className="w-full">
          <a
            href={globalRankingsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2"
          >
            <span>View Global Rankings</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>

        {/* Optional Embed Demo - Commented out by default */}
        {/*
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Live Rankings</h3>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
            <EmbedFrame src={globalRankingsEmbedUrl} />
          </div>
        </div>
        */}
      </CardContent>
    </Card>
  )
}

// EmbedFrame component for future use
function EmbedFrame({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      className="w-full h-full rounded-2xl"
      title="Global Rankings"
      frameBorder="0"
    />
  )
}
