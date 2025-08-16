// Backend API Response Structure
export interface ApiResponse<T> {
  data: T
  meta?: {
    count?: number
    limit?: number
    offset?: number
    page?: number
    size?: number
    has_more?: boolean
  }
  error?: {
    code: string
    message: string
    details?: any
  } | null
}

// Team Models (matching backend)
export interface Team {
  id: string
  name: string
  tag?: string
  description?: string
  logo_url?: string
  region_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
  created_by?: string
  players?: Player[]
}

export interface TeamListResponse {
  items: Team[]
  total: number
  page: number
  size: number
  has_more: boolean
}

export interface Player {
  id: string
  name: string
  role?: string
  avatar_url?: string
  current_team_id?: string
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

// Tournament/Event Models (matching backend)
export interface Tournament {
  id: string
  name: string
  description?: string
  status: string
  tier: string
  console: string
  game_year: string
  start_date: string
  end_date: string
  organizer_id?: string
  organizer_logo_url?: string
  banner_url?: string
  rules_url?: string
  place?: string
  prize_pool?: number
  max_rp?: number
  decay_days?: number
  champion?: string
  runner_up?: string
  sponsor?: string
  sponsor_logo?: string
  created_at: string
  updated_at: string
}

// Legacy Event interface for backward compatibility
export interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  url?: string
  featured?: boolean
}

// Leaderboard Models (matching backend)
export interface PlayerProfile {
  id: string
  name: string
  player_rp: number
  player_rank_score: number
  wins: number
  losses: number
  win_rate: number
  rank: number
  tier: string
  region?: string
  current_team_id?: string
  current_team_name?: string
  avatar_url?: string
}

// Legacy RankingRow interface for backward compatibility
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
