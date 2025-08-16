import type { 
  Team, 
  TeamListResponse,
  Tournament, 
  Event, 
  PlayerProfile, 
  RankingRow, 
  MediaItem,
  ApiResponse,
  TeamRosterPlayer
} from './types'
import { mockTeams, mockEvents, mockRankings, mockMedia, mockTeamRoster } from './mock'
import { API_CONFIG, isBuildTime, buildApiUrl } from './config'

// Helper function for API calls with error handling and new response structure
async function apiCall<T>(endpoint: string, fallback: T): Promise<T> {
  // During build time, always return mock data to prevent timeouts
  if (isBuildTime) {
    console.log(`[API] Build time detected, using fallback for ${endpoint}`)
    return fallback
  }

  try {
    const url = buildApiUrl(endpoint)
    console.log(`[API] Making request to: ${url}`)
    
    const response = await fetch(url, {
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    console.log(`[API] Response status: ${response.status} ${response.statusText}`)
    
    if (!response.ok) {
      console.warn(`[API] Call failed for ${endpoint}: ${response.status} ${response.statusText}`)
      return fallback
    }

    const data = await response.json()
    console.log(`[API] Response data:`, data)
    
    // Handle new API response structure
    if (data && typeof data === 'object' && 'data' in data) {
      return data.data || fallback
    }
    
    return data || fallback
  } catch (error) {
    console.warn(`[API] Call error for ${endpoint}:`, error)
    return fallback
  }
}

// Team fetchers
export async function getTeams(): Promise<Team[]> {
  console.log(`[API] Fetching teams from: ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}`)
  
  try {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TEAMS, { items: mockTeams, total: mockTeams.length, page: 1, size: 20, has_more: false })
    
    // Handle backend's paginated response format
    if (response && typeof response === 'object' && 'items' in response && Array.isArray(response.items)) {
      console.log(`[API] Backend returned ${response.items.length} teams`)
      return response.items
    }
    
    // Fallback to direct array if response is already an array
    if (Array.isArray(response)) {
      console.log(`[API] Backend returned ${response.length} teams (direct array)`)
      return response
    }
    
    console.log(`[API] Using fallback mock data`)
    return mockTeams
  } catch (error) {
    console.error(`[API] Error in getTeams:`, error)
    return mockTeams
  }
}

export async function getTeam(id: string): Promise<Team | null> {
  console.log(`[API] Fetching team with ID: ${id}`)
  const teams = await getTeams()
  const team = teams.find(team => team.id === id) || null
  console.log(`[API] Found team:`, team)
  return team
}

// Team roster fetchers
export async function getTeamRoster(teamId: string): Promise<TeamRosterPlayer[]> {
  console.log(`[API] Fetching team roster for team ID: ${teamId}`)
  // For now, filter mock data by team ID. In the future, this would call a backend endpoint
  const roster = mockTeamRoster.filter(player => player.team_id === teamId)
  console.log(`[API] Found ${roster.length} players for team ${teamId}`)
  return roster
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
