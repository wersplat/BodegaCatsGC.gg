import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Image as ImageIcon, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { MediaItem } from '@/lib/types'

interface ImageTileProps {
  image: MediaItem
}

export function ImageTile({ image }: ImageTileProps) {
  return (
    <Card className="group hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Image Preview
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{image.title}</CardTitle>
            <CardDescription>
              {formatDate(image.date)}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            Image
          </Badge>
        </div>
        <a
          href={image.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-bcg-accent hover:text-bcg-accent/80 transition-colors"
        >
          <span>View Image</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  )
}
