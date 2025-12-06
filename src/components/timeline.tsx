import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TimelineItem {
  year: string
  title: string
  description: string
  highlight?: boolean
}

const timelineData: TimelineItem[] = [
  {
    year: '2021',
    title: 'Born in the Bodega',
    description: 'Bodega Cats GC was founded in late 2021 with a vision to build something real for the NBA 2K scene—rooted in culture, competitive excellence, and community.',
    highlight: true,
  },
  {
    year: '2022-2023',
    title: 'From Team to Brand',
    description: 'Evolved from a single roster into a multi-team brand, competing in leagues like WR, MPBA, TPL, and UPA, regularly making deep playoff runs.',
  },
  {
    year: '2024',
    title: 'Building Infrastructure',
    description: 'Stepped into a new role—not just competing, but actively shaping the competitive landscape through league formats, rulesets, and creative partnerships.',
  },
  {
    year: '2025',
    title: 'From Players to Promoters',
    description: 'Fully transitioned to respected organizers and creative producers. The Road to $25K series evolved into the UPA Summer Championships.',
  },
  {
    year: '2026',
    title: 'New Horizons',
    description: 'Leading proamrank.gg project, organizing the UPA World Championships (July 24-26, 2026 at Hyper X Arena in Las Vegas), and launching the Legends Basketball Association (lba.gg).',
    highlight: true,
  },
]

export function Timeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
      
      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timeline dot */}
            <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 ${
              item.highlight ? 'bg-bcg-accent' : 'bg-gray-400'
            }`} />
            
            {/* Content */}
            <div className="ml-16 flex-1">
              <Card className={`${item.highlight ? 'ring-2 ring-bcg-accent' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={item.highlight ? 'default' : 'outline'}>
                      {item.year}
                    </Badge>
                    {item.highlight && (
                      <Badge variant="secondary">Milestone</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
