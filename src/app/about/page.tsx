import { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Award } from 'lucide-react'
import { Timeline } from '@/components/timeline'

export const metadata: Metadata = {
  title: 'About - Bodega Cats Gaming Club',
  description: 'Learn about the history, mission, and vision of Bodega Cats GC. From our foundation in 2021 to our current projects including proamrank.gg, UPA World Championships, and Legends Basketball Association.',
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

        {/* Current Projects */}
        <div className="bg-bcg-accent text-white rounded-3xl p-8 md:p-12 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Current Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">proamrank.gg</h3>
                <p className="text-sm opacity-90">
                  Overview of the proamrank.gg project
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">UPA World Championships</h3>
                <p className="text-sm opacity-90">
                  July 24-26, 2026 at Hyper X Arena in Las Vegas
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Legends Basketball Association</h3>
                <p className="text-sm opacity-90">
                  lba.gg
                </p>
              </div>
            </div>
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
                  <span>Leading proamrank.gg, UPA World Championships, and Legends Basketball Association</span>
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
              <div className="w-48 h-48 rounded-3xl mx-auto overflow-hidden">
                <Image 
                  src="/founder/cager.jpg" 
                  alt="Christian 'Cager' Werwaiss" 
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
