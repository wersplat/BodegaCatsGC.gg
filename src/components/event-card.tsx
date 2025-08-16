import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Event } from '@/lib/types'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group hover:scale-105 transition-all duration-300">
      <CardHeader>
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl mb-4 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Event Image
          </span>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
            <CardDescription className="mb-3">
              {event.description}
            </CardDescription>
          </div>
          {event.featured && (
            <Badge variant="default" className="ml-2">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(event.date)}
        </div>
        {event.url && (
          <Button asChild variant="outline" className="w-full">
            <Link href={event.url} className="flex items-center justify-center">
              <span>Learn More</span>
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
