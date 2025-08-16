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
      console.warn(`API call failed for ${endpoint}:`, response.status, response.statusText)
      return fallback
    }
    
    const result = await response.json()
    
    // Handle new API response structure
    if (result && typeof result === 'object' && 'data' in result) {
      return result.data || fallback
    }
    
    // Handle legacy response structure
    return result || fallback
  } catch (error) {
    console.warn(`API call error for ${endpoint}:`, error)
    return fallback
  }
}

// Teams API
export async function getTeams(): Promise<Team[]> {
  const result = await apiCall<TeamListResponse>(`${API_CONFIG.ENDPOINTS.TEAMS}?size=100`, { items: mockTeams, total: mockTeams.length, page: 1, size: 100, has_more: false })
  return result.items || mockTeams
}

export async function getTeam(id: string): Promise<Team | null> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockTeams.find(t => t.id === id) || null
  }

  try {
    const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.TEAMS}/${id}`, { include_players: 'true' })
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    if (!response.ok) {
      console.warn(`Team not found: ${id}`)
      return mockTeams.find(t => t.id === id) || null
    }
    
    const result = await response.json()
    
    // Handle new API response structure
    if (result && typeof result === 'object' && 'data' in result) {
      return result.data || null
    }
    
    return result || null
  } catch (error) {
    console.warn(`API call error for team ${id}:`, error)
    return mockTeams.find(t => t.id === id) || null
  }
}

// Tournaments/Events API
export async function getTournaments(): Promise<Tournament[]> {
  const result = await apiCall<Tournament[]>(`${API_CONFIG.ENDPOINTS.TOURNAMENTS}?limit=100`, [])
  return result || []
}

export async function getEvents(): Promise<Event[]> {
  // Convert tournaments to events for backward compatibility
  const tournaments = await getTournaments()
  return tournaments.map(tournament => ({
    id: tournament.id,
    title: tournament.name,
    description: tournament.description || '',
    date: tournament.start_date,
    image: tournament.banner_url || '',
    url: tournament.rules_url,
    featured: tournament.tier === 'T1' // T1 tournaments are considered featured
  }))
}

export async function getFeaturedEvents(): Promise<Event[]> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockEvents.filter(e => e.featured)
  }

  try {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.TOURNAMENTS, { tier: 'T1', limit: 10 })
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    if (!response.ok) {
      return mockEvents.filter(e => e.featured)
    }
    
    const result = await response.json()
    const tournaments = result.data || result || []
    
    return tournaments.map((tournament: Tournament) => ({
      id: tournament.id,
      title: tournament.name,
      description: tournament.description || '',
      date: tournament.start_date,
      image: tournament.banner_url || '',
      url: tournament.rules_url,
      featured: true
    }))
  } catch (error) {
    console.warn(`API call error for featured events:`, error)
    return mockEvents.filter(e => e.featured)
  }
}

// Leaderboard API
export async function getLeaderboard(limit: number = 100): Promise<PlayerProfile[]> {
  const result = await apiCall<PlayerProfile[]>(`${API_CONFIG.ENDPOINTS.LEADERBOARD}?limit=${limit}`, [])
  return result || []
}

export async function getRankings(): Promise<RankingRow[]> {
  // Convert PlayerProfile to RankingRow for backward compatibility
  const leaderboard = await getLeaderboard()
  return leaderboard.map((player, index) => ({
    id: player.id,
    rank: player.rank || index + 1,
    player: player.name,
    team: player.current_team_name || 'Free Agent',
    points: player.player_rp,
    wins: player.wins,
    losses: player.losses,
    winRate: player.win_rate
  }))
}

// Media API (placeholder - backend doesn't seem to have media endpoints yet)
export async function getMedia(): Promise<MediaItem[]> {
  return apiCall('/media', mockMedia)
}

export async function getVideos(): Promise<MediaItem[]> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockMedia.filter(m => m.type === 'video')
  }

  try {
    const url = buildApiUrl('/media', { type: 'video' })
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    if (!response.ok) {
      return mockMedia.filter(m => m.type === 'video')
    }
    
    const result = await response.json()
    return result.data || result || mockMedia.filter(m => m.type === 'video')
  } catch (error) {
    console.warn(`API call error for videos:`, error)
    return mockMedia.filter(m => m.type === 'video')
  }
}

export async function getImages(): Promise<MediaItem[]> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockMedia.filter(m => m.type === 'image')
  }

  try {
    const url = buildApiUrl('/media', { type: 'image' })
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    if (!response.ok) {
      return mockMedia.filter(m => m.type === 'image')
    }
    
    const result = await response.json()
    return result.data || result || mockMedia.filter(m => m.type === 'image')
  } catch (error) {
    console.warn(`API call error for images:`, error)
    return mockMedia.filter(m => m.type === 'image')
  }
}
