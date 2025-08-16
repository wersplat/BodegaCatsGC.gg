import { Metadata } from 'next'
import { VideoEmbed } from '@/components/video-embed'
import { ImageTile } from '@/components/image-tile'
import { Badge } from '@/components/ui/badge'
import { getVideos, getImages } from '@/lib/fetchers'

export const metadata: Metadata = {
  title: 'Media - Bodega Cats Gaming Club',
  description: 'Watch our latest videos, tournament highlights, and behind-the-scenes content from Bodega Cats Gaming Club.',
}

export default async function MediaPage() {
  const videos = await getVideos()
  const images = await getImages()

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Media
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch our latest videos, tournament highlights, and behind-the-scenes content.
          </p>
        </div>

        {/* Video Gallery */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Videos</h2>
            <Badge variant="outline">{videos.length} videos</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoEmbed key={video.id} video={video} />
            ))}
          </div>

          {videos.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No videos available at the moment.</p>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Images</h2>
            <Badge variant="outline">{images.length} images</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageTile key={image.id} image={image} />
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No images available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
