import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { MediaItem } from '@/lib/types'

interface VideoEmbedProps {
  video: MediaItem
}

export function VideoEmbed({ video }: VideoEmbedProps) {
  const getVideoId = (url: string, platform: string) => {
    if (platform === 'youtube') {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      return match ? match[1] : null
    }
    if (platform === 'twitch') {
      const match = url.match(/twitch\.tv\/videos\/(\d+)/)
      return match ? match[1] : null
    }
    return null
  }

  const videoId = getVideoId(video.url, video.platform || 'youtube')
  const embedUrl = video.platform === 'youtube' 
    ? `https://www.youtube.com/embed/${videoId}`
    : `https://clips.twitch.tv/embed?clip=${videoId}&parent=localhost`

  return (
    <Card className="group hover:scale-105 transition-all duration-300">
      <CardHeader>
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
          {videoId ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Video Preview
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between pt-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
            <CardDescription className="mb-3">
              {formatDate(video.date)}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2 capitalize">
            {video.platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-bcg-accent hover:text-bcg-accent/80 transition-colors"
        >
          <span>Watch on {video.platform}</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  )
}
