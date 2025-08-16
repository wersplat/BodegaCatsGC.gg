import Link from 'next/link'
import { Twitter, Twitch, Youtube, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { adminUrl } from '@/lib/config'

const navigation = {
  main: [
    { name: 'Teams', href: '/teams' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'About', href: '/about' },
    { name: 'Media', href: '/media' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/bodegacatsgc',
      icon: Twitter,
    },
    {
      name: 'Twitch',
      href: 'https://twitch.tv/bodegacatsgc',
      icon: Twitch,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@bodegacatsgc',
      icon: Youtube,
    },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-bcg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
              <span className="font-bold text-xl">BodegaCatsGC</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Street-smart gaming, bodega-style. Building something real in the NBA 2K Pro-Am ecosystem since 2021.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-bcg-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Admin */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="space-y-4">
              {/* Social Links */}
              <div className="flex space-x-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-bcg-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Admin Portal */}
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full"
                >
                  <a
                    href={adminUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>Admin Portal</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Bodega Cats Gaming Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
