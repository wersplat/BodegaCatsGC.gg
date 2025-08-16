import type { 
  Team, 
  TeamListResponse,
  Tournament, 
  Event, 
  PlayerProfile, 
  RankingRow, 
  MediaItem,
  ApiResponse 
} from './types'
import { mockTeams, mockEvents, mockRankings, mockMedia } from './mock'
import { API_CONFIG, isBuildTime, buildApiUrl } from './config'

// Helper function for API calls with error handling and new response structure
async function apiCall<T>(endpoint: string, fallback: T): Promise<T> {
  // During build time, always return mock data to prevent timeouts
  if (isBuildTime) {
    return fallback
  }

  try {
    const url = buildApiUrl(endpoint)
    const response = await fetch(url, {
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    if (!response.ok) {
      console.warn(`API call failed for ${endpoint}: ${response.status} ${response.statusText}`)
      return fallback
    }

    const data = await response.json()
    
    // Handle new API response structure
    if (data && typeof data === 'object' && 'data' in data) {
      return data.data || fallback
    }
    
    return data || fallback
  } catch (error) {
    console.warn(`API call error for ${endpoint}:`, error)
    return fallback
  }
}

// Team fetchers
export async function getTeams(): Promise<Team[]> {
  return apiCall(API_CONFIG.ENDPOINTS.TEAMS, mockTeams)
}

export async function getTeam(id: string): Promise<Team | null> {
  const teams = await getTeams()
  return teams.find(team => team.id === id) || null
}

// Tournament fetchers
export async function getTournaments(): Promise<Tournament[]> {
  return apiCall(API_CONFIG.ENDPOINTS.TOURNAMENTS, [])
}

export async function getEvents(): Promise<Event[]> {
  // Convert tournaments to events for backward compatibility
  const tournaments = await getTournaments()
  return tournaments.map(tournament => ({
    id: tournament.id,
    title: tournament.name || 'Untitled Tournament',
    description: tournament.description || 'A competitive tournament in the NBA 2K community.',
    date: tournament.start_date || 'TBD',
    image: tournament.banner_url || '/events/default-tournament.jpg',
    url: `/tournaments/${tournament.id}`,
    featured: tournament.tier === 'T1' || tournament.tier === 'T2'
  }))
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events.filter(event => event.featured)
}

// Leaderboard fetchers
export async function getLeaderboard(): Promise<RankingRow[]> {
  return apiCall(API_CONFIG.ENDPOINTS.LEADERBOARD, mockRankings)
}

export async function getRankings(): Promise<RankingRow[]> {
  return getLeaderboard()
}

export async function getPlayerProfiles(): Promise<PlayerProfile[]> {
  // Convert leaderboard data to player profiles for backward compatibility
  const rankings = await getLeaderboard()
  return rankings.map((row, index) => ({
    id: row.id,
    name: row.player,
    player_rp: row.points,
    player_rank_score: row.points * 0.1, // Convert RP to rank score
    wins: row.wins,
    losses: row.losses,
    win_rate: row.winRate,
    rank: row.rank,
    tier: row.points > 1000 ? 'Elite' : row.points > 500 ? 'Pro' : 'Amateur',
    current_team_name: row.team,
  }))
}

// Media fetchers
export async function getMedia(): Promise<MediaItem[]> {
  return apiCall('/v1/media', mockMedia)
}

export async function getVideos(): Promise<MediaItem[]> {
  const media = await getMedia()
  return media.filter(m => m.type === 'video')
}

export async function getImages(): Promise<MediaItem[]> {
  const media = await getMedia()
  return media.filter(m => m.type === 'image')
}

// Player fetchers
export async function getPlayers(): Promise<any[]> {
  return apiCall(API_CONFIG.ENDPOINTS.PLAYERS, [])
}

// Match fetchers
export async function getMatches(): Promise<any[]> {
  return apiCall(API_CONFIG.ENDPOINTS.MATCHES, [])
}

// Player stats fetchers
export async function getPlayerStats(): Promise<any[]> {
  return apiCall(API_CONFIG.ENDPOINTS.PLAYER_STATS, [])
}
