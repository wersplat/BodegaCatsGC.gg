import type {  Event, RankingRow, MediaItem, TeamRosterPlayer } from './types'


// Team roster data for the two teams
export const mockTeamRoster: TeamRosterPlayer[] = [
  // Bodega Cats players
  {
    player_id: '1',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'ShadowPaw',
    position: 'Point Guard',
    salary_tier: 'S',
    monthly_value: 5000,
    is_captain: true,
    is_player_coach: false,
    joined_at: '2023-01-15T00:00:00Z',
  },
  {
    player_id: '2',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'StreetKing',
    position: 'Shooting Guard',
    salary_tier: 'A',
    monthly_value: 4000,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-01-20T00:00:00Z',
  },
  {
    player_id: '3',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'BodegaBeast',
    position: 'Lock',
    salary_tier: 'A',
    monthly_value: 3800,
    is_captain: false,
    is_player_coach: true,
    joined_at: '2023-02-01T00:00:00Z',
  },
  {
    player_id: '4',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'CornerStore',
    position: 'Power Forward',
    salary_tier: 'B',
    monthly_value: 3000,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-02-15T00:00:00Z',
  },
  {
    player_id: '5',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'Neighborhood',
    position: 'Center',
    salary_tier: 'B',
    monthly_value: 3200,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  
  // Capitol City Cats players
  {
    player_id: '6',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'CapitalFlow',
    position: 'Point Guard',
    salary_tier: 'A',
    monthly_value: 4200,
    is_captain: true,
    is_player_coach: false,
    joined_at: '2023-02-20T00:00:00Z',
  },
  {
    player_id: '7',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'DCShooter',
    position: 'Shooting Guard',
    salary_tier: 'B',
    monthly_value: 3500,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  {
    player_id: '8',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'CapitolLock',
    position: 'Lock',
    salary_tier: 'B',
    monthly_value: 3300,
    is_captain: false,
    is_player_coach: true,
    joined_at: '2023-03-10T00:00:00Z',
  },
  {
    player_id: '9',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'PowerDC',
    position: 'Power Forward',
    salary_tier: 'C',
    monthly_value: 2800,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-15T00:00:00Z',
  },
  {
    player_id: '10',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'CenterStage',
    position: 'Center',
    salary_tier: 'C',
    monthly_value: 2600,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-20T00:00:00Z',
  },
]

// Legacy event data (for backward compatibility)
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Spring Championship',
    description: 'The biggest tournament of the spring season',
    date: '2024-04-15',
    image: '/events/spring-championship.jpg',
    url: '/events/spring-championship',
    featured: true,
  },
  {
    id: '2',
    title: 'Summer League',
    description: 'Weekly summer league matches',
    date: '2024-06-01',
    image: '/events/summer-league.jpg',
    url: '/events/summer-league',
    featured: false,
  },
]

// Legacy ranking data (for backward compatibility)
export const mockRankings: RankingRow[] = [
  {
    id: '1',
    rank: 1,
    player: 'ShadowPaw',
    team: 'Bodega Cats',
    points: 1250,
    wins: 45,
    losses: 12,
    winRate: 78.9,
  },
  {
    id: '2',
    rank: 2,
    player: 'CapitalFlow',
    team: 'Capitol City Cats',
    points: 1100,
    wins: 38,
    losses: 15,
    winRate: 71.7,
  },
  {
    id: '3',
    rank: 3,
    player: 'StreetKing',
    team: 'Bodega Cats',
    points: 1050,
    wins: 42,
    losses: 18,
    winRate: 70.0,
  },
]

// Legacy media data (for backward compatibility)
export const mockMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Bodega Cats vs Capitol City Cats',
    url: 'https://youtube.com/watch?v=example1',
    type: 'video',
    thumbnail: '/media/game-highlight-1.jpg',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Team Practice Session',
    url: 'https://youtube.com/watch?v=example2',
    type: 'video',
    thumbnail: '/media/practice-session.jpg',
    date: '2024-01-10',
  },
]
