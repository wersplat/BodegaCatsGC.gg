import { Hero } from '@/components/hero'
import { TeamCard } from '@/components/team-card'
import { EventCard } from '@/components/event-card'
import { getTeams, getFeaturedEvents } from '@/lib/fetchers'

export default async function HomePage() {
  const teams = await getTeams()
  const featuredEvents = await getFeaturedEvents()

  return (
    <div>
      <Hero />
      
      {/* Team Highlights */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Elite Teams
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet the squads that represent the Bodega Cats Gaming Club in competitive play.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don&apos;t miss out on the latest tournaments and community events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bcg-accent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join the Bodega Cats Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Follow us on social media and stay updated with the latest news, tournaments, and behind-the-scenes content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://twitter.com/bodegacatsgc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-bcg-accent font-semibold rounded-2xl hover:bg-gray-100 transition-colors"
            >
              Follow on Twitter
            </a>
            <a
              href="https://twitch.tv/bodegacatsgc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-bcg-accent transition-colors"
            >
              Watch on Twitch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
