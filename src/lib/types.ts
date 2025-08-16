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

// Real Backend Schema Types (matching new_schema_types.ts)

// Enums from backend
export type PlayerPosition = "Point Guard" | "Shooting Guard" | "Lock" | "Power Forward" | "Center"
export type SalaryTier = "S" | "A" | "B" | "C" | "D"
export type Console = "Cross Play" | "Playstation" | "Xbox"
export type GameYear = "2K16" | "2K17" | "2K18" | "2K19" | "2K20" | "2K21" | "2K22" | "2K23" | "2K24" | "2K25" | "2K26"
export type EventTier = "T1" | "T2" | "T3" | "T4"
export type Status = "scheduled" | "in progress" | "completed" | "under review" | "reviewed" | "approved"
export type Stage = "Regular Season" | "Group Play" | "Round 1" | "Round 2" | "Round 3" | "Round 4" | "Semi Finals" | "Finals" | "Grand Finals" | "L1" | "L2" | "L3" | "L4" | "L5" | "W1" | "W2" | "W3" | "W4" | "LF" | "WF"

// Team Model (matching backend teams table)
export interface Team {
  id: string
  name: string
  logo_url?: string | null
  created_at?: string | null
  current_rp?: number | null
  elo_rating?: number | null
  global_rank?: number | null
  leaderboard_tier?: string | null
  money_won?: number | null
  player_rank_score?: number | null
}

export interface TeamListResponse {
  items: Team[]
  total: number
  page: number
  size: number
  has_more: boolean
}

// Player Model (matching backend players table)
export interface Player {
  id: string
  gamertag: string
  alternate_gamertag?: string | null
  created_at?: string | null
  current_team_id?: string | null
  discord_id?: string | null
  is_rookie?: boolean | null
  monthly_value?: number | null
  performance_score?: number | null
  player_rank_score?: number | null
  player_rp?: number | null
  position?: PlayerPosition | null
  salary_tier?: SalaryTier | null
  twitter_id?: string | null
}

// Team Roster View (matching backend team_roster_current view)
export interface TeamRosterPlayer {
  player_id?: string | null
  team_id?: string | null
  team_name?: string | null
  gamertag?: string | null
  position?: PlayerPosition | null
  salary_tier?: SalaryTier | null
  monthly_value?: number | null
  is_captain?: boolean | null
  is_player_coach?: boolean | null
  joined_at?: string | null
}

// Tournament Model (matching backend tournaments table)
export interface Tournament {
  id: string
  name?: string | null
  description?: string | null
  banner_url?: string | null
  console?: Console | null
  created_at: string
  decay_days?: number | null
  end_date?: string | null
  game_year?: GameYear | null
  max_rp?: number | null
  organizer_id?: string | null
  organizer_logo_url?: string | null
  place?: string | null
  prize_pool?: number | null
  processed_at?: string | null
  rules_url?: string | null
  runner_up?: string | null
  sponsor?: string | null
  sponsor_logo?: string | null
  start_date?: string | null
  status?: Status | null
  tier?: EventTier | null
  champion?: string | null
}

// Match Model (matching backend matches table)
export interface Match {
  id: string
  boxscore_url?: string | null
  game_number?: number | null
  league_id?: string | null
  league_season?: string | null
  played_at?: string | null
  score_a?: number | null
  score_b?: number | null
  stage?: Stage | null
  team_a_id?: string | null
  team_a_name?: string | null
  team_b_id?: string | null
  tournament_id?: string | null
  winner_id?: string | null
}

// Player Stats Model (matching backend player_stats table)
export interface PlayerStats {
  id: string
  match_id: string
  player_id: string
  player_name?: string | null
  team_id: string
  points?: number | null
  rebounds?: number | null
  assists?: number | null
  steals?: number | null
  blocks?: number | null
  fgm?: number | null
  fga?: number | null
  ftm?: number | null
  fta?: number | null
  three_points_made?: number | null
  three_points_attempted?: number | null
  turnovers?: number | null
  fouls?: number | null
  plus_minus?: number | null
  ps?: number | null
  created_at?: string | null
  updated_at?: string | null
}

// Legacy interfaces for backward compatibility
export interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  url?: string
  featured?: boolean
}

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

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  tournament?: string
  placement: number
}
