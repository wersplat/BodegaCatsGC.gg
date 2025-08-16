// API Configuration
export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bodegacatsgc.gg',
  
  // API version
  VERSION: 'v1',
  
  // Endpoints
  ENDPOINTS: {
    TEAMS: '/v1/teams',
    TOURNAMENTS: '/v1/tournaments',
    LEADERBOARD: '/v1/leaderboard',
    PLAYERS: '/v1/players',
    MATCHES: '/v1/matches',
    PLAYER_STATS: '/v1/player-stats',
    AUTH: '/auth',
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    TIMEOUT: 5000,
    HEADERS: {
      'Content-Type': 'application/json',
    },
  },
} as const

// External services configuration
export const EXTERNAL_CONFIG = {
  ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.bodegacatsgc.gg',
  GLOBAL_RANKINGS_URL: process.env.NEXT_PUBLIC_GLOBAL_RANKINGS_URL || 'https://k.siba.gg',
  GLOBAL_RANKINGS_EMBED_URL: process.env.NEXT_PUBLIC_GLOBAL_RANKINGS_EMBED_URL || 'https://k.siba.gg/embed/leaderboard',
} as const

// Build environment check
export const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined'

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
