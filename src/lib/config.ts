// API Configuration
export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bodegacatsgc.gg',
  
  // API version
  VERSION: 'v1',
  
  // Endpoints
  ENDPOINTS: {
    TEAMS: '/teams/v1/teams/',
    TEAM_BY_ID: '/teams/v1/teams/{team_id}', // Individual team endpoint
    TEAM_ROSTER: '/views/team-roster-current', // Team roster endpoint
    TOURNAMENTS: '/tournaments/v1/tournaments/',
    LEADERBOARD: '/leaderboard/v1/leaderboard/',
    PLAYERS: '/players/',
    MATCHES: '/v1/matches',
    PLAYER_STATS: '/v1/player-stats/{player_id}',
    AUTH: '/auth',
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    TIMEOUT: 15000, // Increased timeout for better reliability
    HEADERS: {
      'Content-Type': 'application/json',
    },
  },
} as const

// External services configuration
export const EXTERNAL_CONFIG = {
  ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.bodegacatsgc.gg',
  GLOBAL_RANKINGS_URL: process.env.NEXT_PUBLIC_GLOBAL_RANKINGS_URL || 'https://proamrank.gg',
  GLOBAL_RANKINGS_EMBED_URL: process.env.NEXT_PUBLIC_GLOBAL_RANKINGS_EMBED_URL || 'https://proamrank.gg/embed/leaderboard',
} as const

// Build environment check - only return true during actual build, not runtime
export const isBuildTime = process.env.NODE_ENV === 'production' && 
                          typeof window === 'undefined' && 
                          process.env.NEXT_PHASE === 'phase-production-build' &&
                          !process.env.NEXT_PUBLIC_ENABLE_API_CALLS

// Helper function to build API URLs
export function buildApiUrl(endpoint: string, params?: Record<string, string | number>): string {
  const url = new URL(endpoint, API_CONFIG.BASE_URL)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }
  
  return url.toString()
}

// Helper function to build team-specific URLs
export function buildTeamUrl(teamId: string): string {
  return buildApiUrl(API_CONFIG.ENDPOINTS.TEAM_BY_ID.replace('{team_id}', teamId))
}
