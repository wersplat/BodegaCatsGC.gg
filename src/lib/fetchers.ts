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
import { API_CONFIG, isBuildTime, buildApiUrl, buildTeamUrl } from './config'

// Helper function for API calls with error handling and new response structure
async function apiCall<T>(endpoint: string, fallback: T): Promise<T> {
  // During build time, always return mock data to prevent timeouts
  if (isBuildTime) {
    console.log(`[API] Build time detected, using fallback for ${endpoint}`)
    console.log(`[API] Build time check: NODE_ENV=${process.env.NODE_ENV}, window=${typeof window}, NEXT_PHASE=${process.env.NEXT_PHASE}, ENABLE_API_CALLS=${process.env.NEXT_PUBLIC_ENABLE_API_CALLS}`)
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
    if (error instanceof Error) {
      console.warn(`[API] Error details: ${error.name} - ${error.message}`)
    }
    return fallback
  }
}

// New function to get a specific team by ID directly from API
async function getTeamById(teamId: string): Promise<Team | null> {
  console.log(`[API] Fetching team by ID: ${teamId}`)
  
  try {
    const url = buildTeamUrl(teamId)
    console.log(`[API] Making direct team request to: ${url}`)
    
    const response = await fetch(url, {
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_CONFIG.TIMEOUT),
      headers: API_CONFIG.REQUEST_CONFIG.HEADERS
    })
    
    console.log(`[API] Team response status: ${response.status} ${response.statusText}`)
    
    if (!response.ok) {
      console.warn(`[API] Team call failed for ${teamId}: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    console.log(`[API] Team response data:`, data)
    
    // Handle API response structure
    if (data && typeof data === 'object' && 'data' in data) {
      return data.data || null
    }
    
    return data || null
  } catch (error) {
    console.warn(`[API] Team call error for ${teamId}:`, error)
    return null
  }
}

// Team fetchers
export async function getTeams(): Promise<Team[]> {
  console.log(`[API] Fetching teams from: ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}`)
  
  try {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TEAMS, mockTeams)
    
    // Handle backend's direct array response format
    if (Array.isArray(response)) {
      console.log(`[API] Backend returned ${response.length} teams (direct array)`)
      return response
    }
    
    // Handle backend's paginated response format
    if (response && typeof response === 'object' && 'items' in response && Array.isArray(response.items)) {
      console.log(`[API] Backend returned ${response.items.length} teams`)
      return response.items
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
  
  // Try to get team directly from API first
  const apiTeam = await getTeamById(id)
  if (apiTeam) {
    console.log(`[API] Found team via API:`, apiTeam)
    return apiTeam
  }
  
  // Fallback to fetching all teams and filtering
  console.log(`[API] API call failed, falling back to getTeams() for team ${id}`)
  const teams = await getTeams()
  const team = teams.find(team => team.id === id) || null
  console.log(`[API] Found team via fallback:`, team)
  return team
}

// New function to get the specific known teams directly
export async function getKnownTeams(): Promise<Team[]> {
  console.log(`[API] Fetching known teams directly by ID`)
  
  const knownTeamIds = [
    'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Bodega Cats
    'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7'  // Capitol City Cats
  ]
  
  const teams: Team[] = []
  
  for (const teamId of knownTeamIds) {
    try {
      const team = await getTeamById(teamId)
      if (team) {
        teams.push(team)
        console.log(`[API] Successfully fetched team: ${team.name}`)
      } else {
        console.warn(`[API] Failed to fetch team with ID: ${teamId}`)
        // Fallback to mock data for this team
        const mockTeam = mockTeams.find(t => t.id === teamId)
        if (mockTeam) {
          teams.push(mockTeam)
          console.log(`[API] Using mock data for team: ${mockTeam.name}`)
        }
      }
    } catch (error) {
      console.error(`[API] Error fetching team ${teamId}:`, error)
      // Fallback to mock data for this team
      const mockTeam = mockTeams.find(t => t.id === teamId)
      if (mockTeam) {
        teams.push(mockTeam)
        console.log(`[API] Using mock data for team: ${mockTeam.name}`)
      }
    }
  }
  
  console.log(`[API] Successfully fetched ${teams.length} teams from API`)
  return teams
}

// Team roster fetchers
export async function getTeamRoster(teamId: string): Promise<TeamRosterPlayer[]> {
  console.log(`[API] Fetching team roster for team ID: ${teamId}`)
  
  try {
    const response = await apiCall(API_CONFIG.ENDPOINTS.TEAM_ROSTER, mockTeamRoster.filter(player => player.team_id === teamId))
    
    // Handle the new backend response structure - filter by team ID
    if (Array.isArray(response)) {
      const teamPlayers = response.filter((player: any) => player.team_id === teamId)
      console.log(`[API] Backend returned ${teamPlayers.length} players for team ${teamId}`)
      return teamPlayers
    }
    
    // Handle the new backend response structure
    if (response && typeof response === 'object' && 'players' in response && Array.isArray(response.players)) {
      const teamPlayers = response.players.filter((player: any) => player.team_id === teamId)
      console.log(`[API] Backend returned ${teamPlayers.length} players for team ${teamId}`)
      return teamPlayers
    }
    
    console.log(`[API] Using fallback mock data`)
    return mockTeamRoster.filter(player => player.team_id === teamId)
  } catch (error) {
    console.error(`[API] Error in getTeamRoster:`, error)
    return mockTeamRoster.filter(player => player.team_id === teamId)
  }
}

export async function getAllTeamRosters(): Promise<{ team_id: string; team_name: string; players: TeamRosterPlayer[]; total_players: number; captains: TeamRosterPlayer[]; coaches: TeamRosterPlayer[] }[]> {
  console.log(`[API] Fetching all team rosters`)
  
  try {
    const response = await apiCall(`/v1/team-roster-current/teams`, [])
    
    if (Array.isArray(response)) {
      console.log(`[API] Backend returned ${response.length} teams with rosters`)
      return response
    }
    
    console.log(`[API] Using fallback mock data`)
    // Group mock data by team
    const teamsMap = new Map<string, { team_id: string; team_name: string; players: TeamRosterPlayer[]; captains: TeamRosterPlayer[]; coaches: TeamRosterPlayer[] }>()
    
    mockTeamRoster.forEach(player => {
      if (!player.team_id) return
      
      if (!teamsMap.has(player.team_id)) {
        teamsMap.set(player.team_id, {
          team_id: player.team_id,
          team_name: player.team_name || 'Unknown Team',
          players: [],
          captains: [],
          coaches: []
        })
      }
      
      const team = teamsMap.get(player.team_id)!
      team.players.push(player)
      
      if (player.is_captain) {
        team.captains.push(player)
      }
      if (player.is_player_coach) {
        team.coaches.push(player)
      }
    })
    
    return Array.from(teamsMap.values()).map(team => ({
      ...team,
      total_players: team.players.length
    }))
  } catch (error) {
    console.error(`[API] Error in getAllTeamRosters:`, error)
    return []
  }
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
