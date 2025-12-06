import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 mb-6">
              <Image 
                src="/teams/bodega-cats-logo.png" 
                alt="Bodega Cats GC Logo" 
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-bcg-accent">Bodega Cats</span>
            <br />
            Gaming Club
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Street-smart gaming, bodega-style. Building something real in the NBA 2K Pro-Am ecosystem.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link href="/teams">View Teams</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-4">
              <Link href="/rankings">See Rankings</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-bcg-accent mb-2">2021</div>
              <div className="text-gray-400">Founded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
