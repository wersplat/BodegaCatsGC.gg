import type { Team, Event, RankingRow, MediaItem } from './types'

export const mockTeams: Team[] = [
  {
    id: '1',
    slug: 'bodega-cats',
    name: 'Bodega Cats',
    tagline: 'Street-smart gaming, bodega-style',
    description: 'The original crew from the streets, bringing that authentic bodega energy to competitive NBA 2K Pro-Am gaming.',
    logo: '/teams/bodega-cats-logo.png',
    color: '#FF4D00',
    players: [
      {
        id: '1',
        name: 'ShadowPaw',
        role: 'Captain',
        avatar: '/players/shadowpaw.jpg',
        socials: {
          twitter: 'https://twitter.com/shadowpaw',
          twitch: 'https://twitch.tv/shadowpaw',
        },
      },
      {
        id: '2',
        name: 'MidnightMeow',
        role: 'Support',
        avatar: '/players/midnightmeow.jpg',
        socials: {
          twitter: 'https://twitter.com/midnightmeow',
          youtube: 'https://youtube.com/@midnightmeow',
        },
      },
      {
        id: '3',
        name: 'WhiskerShot',
        role: 'DPS',
        avatar: '/players/whiskershot.jpg',
        socials: {
          twitch: 'https://twitch.tv/whiskershot',
        },
      },
    ],
    achievements: [
      {
        id: '1',
        title: 'Regional Champions',
        description: 'First place in Northeast Regional Tournament',
        date: '2023-12-15',
        tournament: 'Northeast Regional',
        placement: 1,
      },
      {
        id: '2',
        title: 'Community Choice Award',
        description: 'Voted best team by the gaming community',
        date: '2023-11-20',
        placement: 1,
      },
    ],
  },
  {
    id: '2',
    slug: 'capitol-city-cats',
    name: 'Capitol City Cats',
    tagline: 'Elite precision, political strategy',
    description: 'The sophisticated squad from the capital, combining strategic thinking with elite NBA 2K Pro-Am skills.',
    logo: '/teams/capitol-city-cats-logo.png',
    color: '#00d4ff',
    players: [
      {
        id: '4',
        name: 'SenatorPaws',
        role: 'Captain',
        avatar: '/players/senatorpaws.jpg',
        socials: {
          twitter: 'https://twitter.com/senatorpaws',
          twitch: 'https://twitch.tv/senatorpaws',
        },
      },
      {
        id: '5',
        name: 'DiplomatKitty',
        role: 'Tank',
        avatar: '/players/diplomatkitty.jpg',
        socials: {
          twitter: 'https://twitter.com/diplomatkitty',
          youtube: 'https://youtube.com/@diplomatkitty',
        },
      },
      {
        id: '6',
        name: 'AmbassadorClaw',
        role: 'Flex',
        avatar: '/players/ambassadorclaw.jpg',
        socials: {
          twitch: 'https://twitch.tv/ambassadorclaw',
        },
      },
    ],
    achievements: [
      {
        id: '3',
        title: 'National Finalists',
        description: 'Second place in National Championship',
        date: '2024-01-10',
        tournament: 'National Championship',
        placement: 2,
      },
      {
        id: '4',
        title: 'Strategy Award',
        description: 'Best strategic gameplay in tournament',
        date: '2023-12-01',
        placement: 1,
      },
    ],
  },
]

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '2K26 Tournament Series',
    description: 'A yearlong competitive ecosystem with $52,000 prize pool, running from October through August',
    date: '2025-10-01',
    image: '/events/2k26-series.jpg',
    url: '/events/2k26-series',
    featured: true,
  },
  {
    id: '2',
    title: 'Road to $25K Series',
    description: 'Our long-running league series that evolved into the UPA Summer Championships',
    date: '2025-06-15',
    image: '/events/road-to-25k.jpg',
    featured: true,
  },
  {
    id: '3',
    title: 'March Madness Tournament',
    description: 'Special themed bracket as part of the 2K26 Tournament Series',
    date: '2026-03-01',
    image: '/events/march-madness.jpg',
  },
]

export const mockRankings: RankingRow[] = [
  {
    id: '1',
    rank: 1,
    player: 'ShadowPaw',
    team: 'Bodega Cats',
    points: 2850,
    wins: 45,
    losses: 12,
    winRate: 78.9,
  },
  {
    id: '2',
    rank: 2,
    player: 'SenatorPaws',
    team: 'Capitol City Cats',
    points: 2780,
    wins: 42,
    losses: 15,
    winRate: 73.7,
  },
  {
    id: '3',
    rank: 3,
    player: 'MidnightMeow',
    team: 'Bodega Cats',
    points: 2650,
    wins: 38,
    losses: 18,
    winRate: 67.9,
  },
  {
    id: '4',
    rank: 4,
    player: 'DiplomatKitty',
    team: 'Capitol City Cats',
    points: 2520,
    wins: 35,
    losses: 20,
    winRate: 63.6,
  },
  {
    id: '5',
    rank: 5,
    player: 'WhiskerShot',
    team: 'Bodega Cats',
    points: 2400,
    wins: 32,
    losses: 22,
    winRate: 59.3,
  },
]

export const mockMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Bodega Cats vs Capitol City Cats - Championship Match',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: '/media/championship-match.jpg',
    platform: 'youtube',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Behind the Scenes: Team Practice',
    type: 'video',
    url: 'https://www.twitch.tv/videos/123456789',
    thumbnail: '/media/team-practice.jpg',
    platform: 'twitch',
    date: '2024-01-10',
  },
  {
    id: '3',
    title: 'Tournament Highlights',
    type: 'image',
    url: '/media/tournament-highlights.jpg',
    thumbnail: '/media/tournament-highlights-thumb.jpg',
    date: '2024-01-05',
  },
]
