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
  
  try {
    // Use team_analytics_mart for comprehensive team data
    // Explicitly select columns that exist in the mart (is_active is not in the mart)
    const { data, error } = await supabase
      .from('team_analytics_mart')
      .select('team_id,team_name,logo_url,elo_rating,current_rp,rp_tier,total_prize_money,avg_player_rating,hybrid_score,team_twitter')
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
    
    // Empty result is valid - return empty array instead of mock data
    console.log(`[DB] No teams found in mart (empty result), trying fallback`)
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
      return []
    }
    
    if (data && data.length > 0) {
      console.log(`[DB] Successfully fetched ${data.length} teams from teams table`)
      return data as Team[]
    }
    
    // Empty result is valid - return empty array
    console.warn(`[DB] No teams found in fallback query - returning empty array`)
    return []
  } catch (error) {
    console.error(`[DB] Exception in getTeamsFallback:`, error)
    return []
  }
}

export async function getTeam(id: string): Promise<Team | null> {
  console.log(`[DB] Fetching team with ID: ${id}`)
  
  try {
    // Try team_analytics_mart first for richer data
    // Explicitly select columns that exist in the mart (is_active is not in the mart)
    const { data: martData, error: martError } = await supabase
      .from('team_analytics_mart')
      .select('team_id,team_name,logo_url,elo_rating,current_rp,rp_tier,total_prize_money,avg_player_rating,hybrid_score,team_twitter')
      .eq('team_id', id)
      .single()
    
    if (!martError && martData) {
      console.log(`[DB] Successfully fetched team from team_analytics_mart: ${martData.team_name}`)
      
      // Calculate global rank by fetching all teams ordered by hybrid_score
      let globalRank: number | null = null
      
      // Only calculate rank if the team has a hybrid_score
      if (martData.hybrid_score !== null && martData.hybrid_score !== undefined) {
        try {
          console.log(`[DB] Calculating global rank for team ${id} with hybrid_score ${martData.hybrid_score}`)
          const { data: allTeams, error: rankError } = await supabase
            .from('team_analytics_mart')
            .select('team_id,hybrid_score')
            .not('hybrid_score', 'is', null)
            .order('hybrid_score', { ascending: false })
          
          if (rankError) {
            console.error(`[DB] Error fetching teams for rank calculation:`, rankError)
            console.error(`[DB] Rank error code: ${rankError.code}, message: ${rankError.message}`)
            console.error(`[DB] Rank error details:`, JSON.stringify(rankError, null, 2))
          } else if (allTeams && allTeams.length > 0) {
            console.log(`[DB] Found ${allTeams.length} teams with hybrid_score for ranking`)
            const rankIndex = allTeams.findIndex(team => team.team_id === id)
            if (rankIndex !== -1) {
              globalRank = rankIndex + 1
              console.log(`[DB] ✓ Calculated global rank for ${martData.team_name}: ${globalRank} (out of ${allTeams.length} teams)`)
            } else {
              console.warn(`[DB] ⚠ Team ${id} (${martData.team_name}) not found in ranking list - may have been filtered out`)
            }
          } else {
            console.warn(`[DB] ⚠ No teams found for rank calculation - query returned empty array`)
          }
        } catch (rankError) {
          console.error(`[DB] ✗ Exception calculating global rank:`, rankError)
          if (rankError instanceof Error) {
            console.error(`[DB] Rank error name: ${rankError.name}`)
            console.error(`[DB] Rank error message: ${rankError.message}`)
            console.error(`[DB] Rank error stack: ${rankError.stack}`)
          }
        }
      } else {
        console.warn(`[DB] Team ${martData.team_name} has no hybrid_score (${martData.hybrid_score}), skipping rank calculation`)
      }
      
      return {
        id: martData.team_id || id,
        name: martData.team_name || '',
        logo_url: martData.logo_url,
        created_at: null,
        current_rp: martData.current_rp,
        elo_rating: martData.elo_rating,
        global_rank: globalRank,
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
      return null
    }
    
    if (data) {
      console.log(`[DB] Successfully fetched team from teams table: ${data.name}`)
      return data as Team
    }
    
    return null
  } catch (error) {
    console.error(`[DB] Exception in getTeam:`, error)
    return null
  }
}

// New function to get the specific known teams directly - using team_analytics_mart
export async function getKnownTeams(): Promise<Team[]> {
  console.log(`[DB] Fetching known teams directly by ID from team_analytics_mart`)
  
  const knownTeamIds = [
    'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Bodega Cats
    'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7'  // Capitol City Cats
  ]
  
  try {
    // Try team_analytics_mart first
    // Explicitly select columns that exist in the mart (is_active is not in the mart)
    const { data: martData, error: martError } = await supabase
      .from('team_analytics_mart')
      .select('team_id,team_name,logo_url,elo_rating,current_rp,rp_tier,total_prize_money,avg_player_rating,hybrid_score,team_twitter')
      .in('team_id', knownTeamIds)
      .order('team_name', { ascending: true })
    
    if (martError) {
      console.error(`[DB] Error fetching known teams from mart:`, martError)
      // Try fallback to teams table
      console.log(`[DB] Mart query failed, trying teams table`)
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .in('id', knownTeamIds)
        .order('name', { ascending: true })
      
      if (error) {
        console.error(`[DB] Error fetching known teams from fallback:`, error)
        return []
      }
      
      if (data && data.length > 0) {
        console.log(`[DB] Successfully fetched ${data.length} known teams from teams table`)
        return data as Team[]
      }
      
      // Empty result - return empty array
      console.warn(`[DB] No teams found in fallback query - returning empty array`)
      return []
    }
    
    if (martData && martData.length > 0) {
      console.log(`[DB] Successfully fetched ${martData.length} known teams from team_analytics_mart`)
      
      // Calculate global ranks for all teams based on hybrid_score
      let globalRanks: Map<string, number> = new Map()
      try {
        const { data: allTeams, error: rankError } = await supabase
          .from('team_analytics_mart')
          .select('team_id,hybrid_score')
          .not('hybrid_score', 'is', null)
          .order('hybrid_score', { ascending: false })
        
        if (rankError) {
          console.error(`[DB] Error fetching teams for rank calculation:`, rankError)
        } else if (allTeams && allTeams.length > 0) {
          allTeams.forEach((team, index) => {
            if (team.team_id) {
              globalRanks.set(team.team_id, index + 1)
            }
          })
          console.log(`[DB] Calculated global ranks for ${globalRanks.size} teams based on hybrid_score`)
        } else {
          console.warn(`[DB] No teams found for rank calculation`)
        }
      } catch (rankError) {
        console.error(`[DB] Exception calculating global ranks:`, rankError)
        if (rankError instanceof Error) {
          console.error(`[DB] Rank error details: ${rankError.message}`)
        }
      }
      
      return martData.map(team => ({
        id: team.team_id || '',
        name: team.team_name || '',
        logo_url: team.logo_url,
        created_at: null,
        current_rp: team.current_rp,
        elo_rating: team.elo_rating,
        global_rank: team.team_id ? globalRanks.get(team.team_id) || null : null,
        leaderboard_tier: team.rp_tier,
        money_won: team.total_prize_money,
        player_rank_score: team.avg_player_rating,
        hybrid_score: team.hybrid_score,
        is_active: true,
        team_twitter: team.team_twitter,
      })) as Team[]
    }
    
    // Empty result from mart - try fallback
    console.log(`[DB] No teams found in mart (empty result), trying teams table`)
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .in('id', knownTeamIds)
      .order('name', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching known teams from fallback:`, error)
      return []
    }
    
    if (data && data.length > 0) {
      console.log(`[DB] Successfully fetched ${data.length} known teams from teams table`)
      return data as Team[]
    }
    
    // Empty result is valid - return empty array
    console.warn(`[DB] No teams found in fallback query - returning empty array`)
    return []
  } catch (error) {
    console.error(`[DB] Exception in getKnownTeams:`, error)
    return []
  }
}

// Team roster fetchers - using Supabase directly, ensuring no duplicates
export async function getTeamRoster(teamId: string): Promise<TeamRosterPlayer[]> {
  console.log(`[DB] Fetching team roster for team ID: ${teamId}`)
  
  try {
    const { data, error } = await supabase
      .from('team_roster_current')
      .select('*')
      .eq('team_id', teamId)
      .order('gamertag', { ascending: true })
    
    if (error) {
      console.error(`[DB] Error fetching team roster:`, error)
      return []
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
    
    console.log(`[DB] No players found - returning empty array`)
    return []
  } catch (error) {
    console.error(`[DB] Exception in getTeamRoster:`, error)
    return []
  }
}

export async function getAllTeamRosters(): Promise<{ team_id: string; team_name: string; players: TeamRosterPlayer[]; total_players: number; captains: TeamRosterPlayer[]; coaches: TeamRosterPlayer[] }[]> {
  console.log(`[DB] Fetching all team rosters`)
  
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
// Uses calculate_player_win_loss function to get accurate win/loss records
export async function getLeaderboard(): Promise<RankingRow[]> {
  console.log(`[DB] Fetching leaderboard from player_performance_mart (filtered by team)`)
  
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
      return []
    }
    
    if (!players || players.length === 0) {
      console.log(`[DB] No players found for specified teams - returning empty array`)
      return []
    }
    
    console.log(`[DB] Successfully fetched ${players.length} players, calculating wins/losses using calculate_player_win_loss function`)
    
    // Create a map to store win/loss stats for each player
    const playerStats = new Map<string, { wins: number; losses: number; totalGames: number; winRate: number }>()
    
    // Call calculate_player_win_loss for each player in parallel for better performance
    const winLossPromises = players
      .filter(player => player.player_id)
      .map(async (player) => {
        try {
          const { data: winLossData, error: winLossError } = await supabase.rpc(
            'calculate_player_win_loss',
            {
              player_id_param: player.player_id!,
              include_ties: false
            }
          )
          
          if (winLossError) {
            console.warn(`[DB] Error calculating win/loss for player ${player.player_id}:`, winLossError)
            // Fallback to 0 wins/losses if function call fails
            return { playerId: player.player_id!, stats: { wins: 0, losses: 0, totalGames: 0, winRate: 0 } }
          }
          
          if (winLossData && winLossData.length > 0) {
            const stats = winLossData[0]
            return {
              playerId: player.player_id!,
              stats: {
                wins: stats.wins || 0,
                losses: stats.losses || 0,
                totalGames: stats.total_games || 0,
                winRate: stats.win_percentage || 0
              }
            }
          } else {
            // No data returned, use defaults
            return { playerId: player.player_id!, stats: { wins: 0, losses: 0, totalGames: 0, winRate: 0 } }
          }
        } catch (error) {
          console.warn(`[DB] Exception calculating win/loss for player ${player.player_id}:`, error)
          return { playerId: player.player_id!, stats: { wins: 0, losses: 0, totalGames: 0, winRate: 0 } }
        }
      })
    
    // Wait for all RPC calls to complete
    const winLossResults = await Promise.all(winLossPromises)
    
    // Populate the stats map
    winLossResults.forEach(({ playerId, stats }) => {
      playerStats.set(playerId, stats)
    })
    
    // Map to RankingRow format with win/loss data from function
    const rankings: RankingRow[] = players.map((player: any, index: number) => {
      const rank = index + 1
      const stats = playerStats.get(player.player_id || '') || { wins: 0, losses: 0, totalGames: 0, winRate: 0 }
      // Use total_games from the function result instead of calculating wins + losses
      const gamesPlayed = stats.totalGames > 0 ? stats.totalGames : (stats.wins + stats.losses)
      
      return {
        id: player.player_id || `player-${rank}`,
        rank,
        player: player.gamertag || 'Unknown Player',
        team: player.team_name || 'Free Agent',
        points: player.player_rp || 0,
        wins: stats.wins,
        losses: stats.losses,
        winRate: gamesPlayed > 0 ? stats.winRate : 0,
        position: player.position || null,
        gamesPlayed: stats.totalGames > 0 ? stats.totalGames : (player.games_played || gamesPlayed || null),
        avgPoints: player.avg_points || null,
        avgAssists: player.avg_assists || null,
        avgRebounds: player.avg_rebounds || null,
        avgSteals: player.avg_steals || null,
        avgBlocks: player.avg_blocks || null,
        fgPct: player.avg_fg_pct || null,
        performanceScore: player.avg_performance_score || null,
      }
    })
    
    console.log(`[DB] Successfully calculated rankings with win/loss data from calculate_player_win_loss for ${rankings.length} players`)
    return rankings
  } catch (error) {
    console.error(`[DB] Exception in getLeaderboard:`, error)
    return []
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

