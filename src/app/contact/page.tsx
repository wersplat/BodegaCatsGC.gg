import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Twitter, Twitch, Youtube, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - Bodega Cats Gaming Club',
  description: 'Get in touch with Bodega Cats Gaming Club. Connect with us for partnerships, media inquiries, or just to say hello.',
}

const contactMethods = [
  {
    name: 'Email',
    description: 'Send us an email for business inquiries, partnerships, or general questions.',
    icon: Mail,
    href: 'mailto:hello@bodegacatsgc.gg',
    label: 'hello@bodegacatsgc.gg',
  },
  {
    name: 'Twitter',
    description: 'Follow us for the latest updates, announcements, and community news.',
    icon: Twitter,
    href: 'https://twitter.com/bodegacatsgc',
    label: '@bodegacatsgc',
  },
  {
    name: 'Twitch',
    description: 'Watch our live streams, tournaments, and behind-the-scenes content.',
    icon: Twitch,
    href: 'https://twitch.tv/bodegacatsgc',
    label: 'twitch.tv/bodegacatsgc',
  },
  {
    name: 'YouTube',
    description: 'Subscribe to our channel for highlights, tutorials, and exclusive content.',
    icon: Youtube,
    href: 'https://youtube.com/@bodegacatsgc',
    label: 'youtube.com/@bodegacatsgc',
  },
]

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a question, want to partner with us, or just want to say hello? We&apos;d love to hear from you.
            </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method) => (
            <Card key={method.name} className="hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-bcg-accent rounded-2xl flex items-center justify-center">
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{method.name}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>{method.label}</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-bcg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect with fellow gamers, stay updated on tournaments, and be part of the Bodega Cats family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a
                  href="https://discord.gg/bodegacatsgc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Discord
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="https://twitter.com/bodegacatsgc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Twitter
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
