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
import { supabase } from './supabase'

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

// Legacy function - kept for backward compatibility but now uses getTeam
async function getTeamById(teamId: string): Promise<Team | null> {
  return getTeam(teamId)
}

// Team fetchers - using team_analytics_mart for richer data
export async function getTeams(): Promise<Team[]> {
  console.log(`[DB] Fetching teams from team_analytics_mart`)
  
  // During build time, use mock data
  if (isBuildTime) {
    console.log(`[DB] Build time detected, using mock data`)
    return mockTeams
  }
  
  try {
    // Use team_analytics_mart for comprehensive team data
    const { data, error } = await supabase
      .from('team_analytics_mart')
      .select('*')
      .order('team_name', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching teams from mart:`, error)
      // Fallback to teams table
      return await getTeamsFallback()
    }
    
    if (data && data.length > 0) {
      console.log(`[DB] Successfully fetched ${data.length} teams from team_analytics_mart`)
      // Map mart data to Team interface
      return data.map(team => ({
        id: team.team_id || '',
        name: team.team_name || '',
        logo_url: team.logo_url,
        created_at: null,
        current_rp: team.current_rp,
        elo_rating: team.elo_rating,
        global_rank: null, // Not in mart, would need to join
        leaderboard_tier: team.rp_tier,
        money_won: team.total_prize_money,
        player_rank_score: team.avg_player_rating,
        hybrid_score: team.hybrid_score,
        is_active: true,
        team_twitter: team.team_twitter,
      })) as Team[]
    }
    
    console.log(`[DB] No teams found in mart, trying fallback`)
    return await getTeamsFallback()
  } catch (error) {
    console.error(`[DB] Exception in getTeams:`, error)
    return await getTeamsFallback()
  }
}

// Fallback to teams table if mart is unavailable
async function getTeamsFallback(): Promise<Team[]> {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching teams from fallback:`, error)
      return mockTeams
    }
    
    if (data && data.length > 0) {
      console.log(`[DB] Successfully fetched ${data.length} teams from teams table`)
      return data as Team[]
    }
    
    return mockTeams
  } catch (error) {
    console.error(`[DB] Exception in getTeamsFallback:`, error)
    return mockTeams
  }
}

export async function getTeam(id: string): Promise<Team | null> {
  console.log(`[DB] Fetching team with ID: ${id}`)
  
  // During build time, use mock data
  if (isBuildTime) {
    console.log(`[DB] Build time detected, using mock data`)
    const mockTeam = mockTeams.find(t => t.id === id)
    return mockTeam || null
  }
  
  try {
    // Try team_analytics_mart first for richer data
    const { data: martData, error: martError } = await supabase
      .from('team_analytics_mart')
      .select('*')
      .eq('team_id', id)
      .single()
    
    if (!martError && martData) {
      console.log(`[DB] Successfully fetched team from team_analytics_mart: ${martData.team_name}`)
      return {
        id: martData.team_id || id,
        name: martData.team_name || '',
        logo_url: martData.logo_url,
        created_at: null,
        current_rp: martData.current_rp,
        elo_rating: martData.elo_rating,
        global_rank: null,
        leaderboard_tier: martData.rp_tier,
        money_won: martData.total_prize_money,
        player_rank_score: martData.avg_player_rating,
        hybrid_score: martData.hybrid_score,
        is_active: true,
        team_twitter: martData.team_twitter,
      } as Team
    }
    
    // Fallback to teams table
    console.log(`[DB] Mart query failed, trying teams table`)
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`[DB] Error fetching team ${id}:`, error)
      const mockTeam = mockTeams.find(t => t.id === id)
      return mockTeam || null
    }
    
    if (data) {
      console.log(`[DB] Successfully fetched team from teams table: ${data.name}`)
      return data as Team
    }
    
    const mockTeam = mockTeams.find(t => t.id === id)
    return mockTeam || null
  } catch (error) {
    console.error(`[DB] Exception in getTeam:`, error)
    const mockTeam = mockTeams.find(t => t.id === id)
    return mockTeam || null
  }
}

// New function to get the specific known teams directly - using team_analytics_mart
export async function getKnownTeams(): Promise<Team[]> {
  console.log(`[DB] Fetching known teams directly by ID from team_analytics_mart`)
  
  // During build time, always use mock data
  if (isBuildTime) {
    console.log(`[DB] Build time detected, using mock data for known teams`)
    return mockTeams
  }
  
  const knownTeamIds = [
    'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Bodega Cats
    'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7'  // Capitol City Cats
  ]
  
  try {
    // Try team_analytics_mart first
    const { data: martData, error: martError } = await supabase
      .from('team_analytics_mart')
      .select('*')
      .in('team_id', knownTeamIds)
      .order('team_name', { ascending: true })
    
    if (!martError && martData && martData.length > 0) {
      console.log(`[DB] Successfully fetched ${martData.length} known teams from team_analytics_mart`)
      return martData.map(team => ({
        id: team.team_id || '',
        name: team.team_name || '',
        logo_url: team.logo_url,
        created_at: null,
        current_rp: team.current_rp,
        elo_rating: team.elo_rating,
        global_rank: null,
        leaderboard_tier: team.rp_tier,
        money_won: team.total_prize_money,
        player_rank_score: team.avg_player_rating,
        hybrid_score: team.hybrid_score,
        is_active: true,
        team_twitter: team.team_twitter,
      })) as Team[]
    }
    
    // Fallback to teams table
    console.log(`[DB] Mart query failed, trying teams table`)
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .in('id', knownTeamIds)
      .order('name', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching known teams:`, error)
      return mockTeams
    }
    
    if (data && data.length > 0) {
      console.log(`[DB] Successfully fetched ${data.length} known teams from teams table`)
      return data as Team[]
    }
    
    console.log(`[DB] No teams found, using fallback mock data`)
    return mockTeams
  } catch (error) {
    console.error(`[DB] Exception in getKnownTeams:`, error)
    return mockTeams
  }
}

// Team roster fetchers - using Supabase directly, ensuring no duplicates
export async function getTeamRoster(teamId: string): Promise<TeamRosterPlayer[]> {
  console.log(`[DB] Fetching team roster for team ID: ${teamId}`)
  
  // During build time, use mock data
  if (isBuildTime) {
    console.log(`[DB] Build time detected, using mock data`)
    return mockTeamRoster.filter(player => player.team_id === teamId)
  }
  
  try {
    const { data, error } = await supabase
      .from('team_roster_current')
      .select('*')
      .eq('team_id', teamId)
      .order('gamertag', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching team roster:`, error)
      return mockTeamRoster.filter(player => player.team_id === teamId)
    }
    
    if (data && data.length > 0) {
      // Remove duplicates by player_id - keep the first occurrence
      const uniquePlayers = new Map<string, TeamRosterPlayer>()
      data.forEach((player: any) => {
        if (player.player_id && !uniquePlayers.has(player.player_id)) {
          uniquePlayers.set(player.player_id, player as TeamRosterPlayer)
        }
      })
      
      const uniquePlayersArray = Array.from(uniquePlayers.values())
      console.log(`[DB] Successfully fetched ${uniquePlayersArray.length} unique players for team ${teamId} (${data.length} total rows)`)
      return uniquePlayersArray
    }
    
    console.log(`[DB] No players found, using fallback mock data`)
    return mockTeamRoster.filter(player => player.team_id === teamId)
  } catch (error) {
    console.error(`[DB] Exception in getTeamRoster:`, error)
    return mockTeamRoster.filter(player => player.team_id === teamId)
  }
}

export async function getAllTeamRosters(): Promise<{ team_id: string; team_name: string; players: TeamRosterPlayer[]; total_players: number; captains: TeamRosterPlayer[]; coaches: TeamRosterPlayer[] }[]> {
  console.log(`[DB] Fetching all team rosters`)
  
  // During build time, use mock data
  if (isBuildTime) {
    console.log(`[DB] Build time detected, using mock data`)
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
  }
  
  try {
    const { data, error } = await supabase
      .from('team_roster_current')
      .select('*')
      .order('team_name', { ascending: true })
      .order('gamertag', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching all team rosters:`, error)
      return []
    }
    
    if (data && data.length > 0) {
      console.log(`[DB] Successfully fetched ${data.length} roster entries`)
      
      // Group by team and remove duplicate players
      const teamsMap = new Map<string, { team_id: string; team_name: string; players: TeamRosterPlayer[]; captains: TeamRosterPlayer[]; coaches: TeamRosterPlayer[]; playerIds: Set<string> }>()
      
      data.forEach((player: any) => {
        const teamId = player.team_id
        if (!teamId || !player.player_id) return
        
        if (!teamsMap.has(teamId)) {
          teamsMap.set(teamId, {
            team_id: teamId,
            team_name: player.team_name || 'Unknown Team',
            players: [],
            captains: [],
            coaches: [],
            playerIds: new Set()
          })
        }
        
        const team = teamsMap.get(teamId)!
        
        // Only add if player_id hasn't been seen for this team
        if (!team.playerIds.has(player.player_id)) {
          team.playerIds.add(player.player_id)
          team.players.push(player as TeamRosterPlayer)
          
          if (player.is_captain) {
            team.captains.push(player as TeamRosterPlayer)
          }
          if (player.is_player_coach) {
            team.coaches.push(player as TeamRosterPlayer)
          }
        }
      })
      
      return Array.from(teamsMap.values()).map(team => ({
        team_id: team.team_id,
        team_name: team.team_name,
        players: team.players,
        captains: team.captains,
        coaches: team.coaches,
        total_players: team.players.length
      }))
    }
    
    console.log(`[DB] No roster data found`)
    return []
  } catch (error) {
    console.error(`[DB] Exception in getAllTeamRosters:`, error)
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

// Leaderboard fetchers - using player_performance_mart for real rankings data
// Only shows players from specified teams (Bodega Cats and Capitol City Cats)
// Calculates actual wins/losses from match results
export async function getLeaderboard(): Promise<RankingRow[]> {
  console.log(`[DB] Fetching leaderboard from player_performance_mart (filtered by team)`)
  
  // During build time, use mock data
  if (isBuildTime) {
    console.log(`[DB] Build time detected, using mock data`)
    return mockRankings
  }
  
  // Only show players from these teams
  const knownTeamIds = [
    'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Bodega Cats
    'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7'  // Capitol City Cats
  ]
  
  try {
    // Fetch players from specified teams using player_performance_mart
    // Ordered by player_rp (ranking points) descending
    const { data: players, error: playersError } = await supabase
      .from('player_performance_mart')
      .select('*')
      .in('current_team_id', knownTeamIds)
      .not('player_rp', 'is', null)
      .order('player_rp', { ascending: false })
    
    if (playersError) {
      console.error(`[DB] Error fetching players:`, playersError)
      return mockRankings.filter(ranking => {
        return ranking.team === 'Bodega Cats' || ranking.team === 'Capitol City Cats'
      })
    }
    
    if (!players || players.length === 0) {
      console.log(`[DB] No players found for specified teams, using filtered mock data`)
      return mockRankings.filter(ranking => {
        return ranking.team === 'Bodega Cats' || ranking.team === 'Capitol City Cats'
      })
    }
    
    console.log(`[DB] Successfully fetched ${players.length} players, calculating wins/losses from matches`)
    
    // Fetch matches for these teams to calculate actual wins/losses
    // Query matches where either team_a_id or team_b_id is one of our teams
    const teamAQuery = knownTeamIds.map(id => `team_a_id.eq.${id}`).join(',')
    const teamBQuery = knownTeamIds.map(id => `team_b_id.eq.${id}`).join(',')
    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select('team_a_id, team_b_id, winner_id')
      .or(`${teamAQuery},${teamBQuery}`)
      .not('winner_id', 'is', null)
    
    if (matchesError) {
      console.warn(`[DB] Error fetching matches, using estimated wins/losses:`, matchesError)
    }
    
    // Create a map to count wins/losses per player
    const playerStats = new Map<string, { wins: number; losses: number }>()
    
    // Initialize all players with 0 wins/losses
    players.forEach((player: any) => {
      if (player.player_id && player.current_team_id) {
        playerStats.set(player.player_id, { wins: 0, losses: 0 })
      }
    })
    
    // Calculate wins/losses from matches
    if (matches && matches.length > 0) {
      matches.forEach((match: any) => {
        const winnerId = match.winner_id
        const teamAId = match.team_a_id
        const teamBId = match.team_b_id
        
        // Count wins for players on winning team
        if (winnerId && knownTeamIds.includes(winnerId)) {
          players.forEach((player: any) => {
            if (player.player_id && player.current_team_id === winnerId) {
              const stats = playerStats.get(player.player_id)
              if (stats) {
                stats.wins++
              }
            }
          })
        }
        
        // Count losses for players on losing team
        const losingTeamId = winnerId === teamAId ? teamBId : teamAId
        if (losingTeamId && knownTeamIds.includes(losingTeamId)) {
          players.forEach((player: any) => {
            if (player.player_id && player.current_team_id === losingTeamId) {
              const stats = playerStats.get(player.player_id)
              if (stats) {
                stats.losses++
              }
            }
          })
        }
      })
    }
    
    // Map to RankingRow format with actual wins/losses
    const rankings: RankingRow[] = players.map((player: any, index: number) => {
      const rank = index + 1
      const stats = playerStats.get(player.player_id || '') || { wins: 0, losses: 0 }
      const gamesPlayed = stats.wins + stats.losses || player.games_played || 0
      
      // Use actual wins/losses if available, otherwise fall back to games_played
      const wins = stats.wins > 0 ? stats.wins : (gamesPlayed > 0 ? Math.round(gamesPlayed * 0.5) : 0)
      const losses = stats.losses > 0 ? stats.losses : (gamesPlayed - wins)
      const winRate = gamesPlayed > 0 ? (wins / gamesPlayed) * 100 : 0
      
      return {
        id: player.player_id || `player-${rank}`,
        rank,
        player: player.gamertag || 'Unknown Player',
        team: player.team_name || 'Free Agent',
        points: player.player_rp || 0,
        wins,
        losses,
        winRate,
      }
    })
    
    console.log(`[DB] Successfully calculated rankings with actual wins/losses for ${rankings.length} players`)
    return rankings
  } catch (error) {
    console.error(`[DB] Exception in getLeaderboard:`, error)
    return mockRankings.filter(ranking => {
      return ranking.team === 'Bodega Cats' || ranking.team === 'Capitol City Cats'
    })
  }
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
