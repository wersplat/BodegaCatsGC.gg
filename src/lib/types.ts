export interface Team {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logo: string
  color: string
  players: Player[]
  achievements: Achievement[]
}

export interface Player {
  id: string
  name: string
  role: string
  avatar?: string
  socials?: {
    twitter?: string
    twitch?: string
    youtube?: string
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  tournament?: string
  placement: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  url?: string
  featured?: boolean
}

export interface RankingRow {
  id: string
  rank: number
  player: string
  team: string
  points: number
  wins: number
  losses: number
  winRate: number
}

export interface MediaItem {
  id: string
  title: string
  type: 'video' | 'image'
  url: string
  thumbnail?: string
  platform?: 'youtube' | 'twitch'
  date: string
}
