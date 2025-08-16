import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Award } from 'lucide-react'
import { Timeline } from '@/components/timeline'

export const metadata: Metadata = {
  title: 'About - Bodega Cats Gaming Club',
  description: 'Learn about the history, mission, and vision of Bodega Cats GC. From our foundation in 2021 to the upcoming 2K26 Tournament Series with $52,000 prize pool.',
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
                <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About Bodega Cats GC
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From the bodega to the global stage, we&apos;re building something real in the NBA 2K Pro-Am ecosystem.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-bcg-accent rounded-2xl flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Build something real in the Pro-Am ecosystem—rooted in culture, structure, and purpose. We prioritize long-term growth, personal development, and ecosystem health.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-bcg-accent-2 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Player-First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Every team under the Bodega banner is structured, scouted, and supported. We help players compete at the highest level—not just in-game, but as part of their broader career journey.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-bcg-accent rounded-2xl flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Culture & Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                We believe competitive 2K thrives when everyone has a path to grow. Through tournaments, grassroots support, and creative partnerships, we expand access and visibility across the scene.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* History Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From humble beginnings to global recognition, here&apos;s how we&apos;ve grown.
            </p>
          </div>
          <Timeline />
        </div>

        {/* 2K26 Tournament Series */}
        <div className="bg-bcg-accent text-white rounded-3xl p-8 md:p-12 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">2K26 Tournament Series</h2>
            <p className="text-xl mb-6 opacity-90">
              $52,000. 11 Months. One Community. Starting October 2025.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">11</div>
                <div className="text-sm opacity-80">Monthly Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">$52K</div>
                <div className="text-sm opacity-80">Total Prize Pool</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">1</div>
                <div className="text-sm opacity-80">Unified Community</div>
              </div>
            </div>
            <p className="text-lg mt-6 opacity-90 max-w-3xl mx-auto">
              Featuring monthly events from October through August—including March Madness, Locals, and the World Championship—this series delivers nonstop action and community-first competition.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Founder & Creative Director</Badge>
              <h2 className="text-3xl font-bold mb-4">Christian &quot;Cager&quot;</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                A native New Yorker with a background in both competitive sports and digital strategy, Cager launched Bodega Cats in 2021 with a clear mission: build something real in the Pro-Am ecosystem — something rooted in culture, structure, and purpose.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-bcg-accent rounded-full mr-3" />
                  <span>Player-first, community-minded leadership</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-bcg-accent rounded-full mr-3" />
                  <span>Architect of the 2K26 Tournament Series</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-bcg-accent rounded-full mr-3" />
                  <span>Wears every hat — coach, designer, GM, and storyteller</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 italic">
                &quot;The bodega&apos;s open&quot; isn&apos;t just a tagline — it&apos;s Cagers&apos;s way of saying that everyone is welcome to compete, create, and build together.
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl mx-auto flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Christian &quot;Cager&quot; 
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
