import type { Team, Event, RankingRow, MediaItem, TeamRosterPlayer } from './types'

// Only the two real teams that should be displayed
export const mockTeams: Team[] = [
  {
    id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    name: 'Bodega Cats',
    logo_url: 'https://qwpxsufrgigpjcxtnery.supabase.co/storage/v1/object/sign/team-logos/bodega-cats.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85Zjk2MmQ4ZS03MDQ3LTRiYzktYmZlMS02YjIyYWYxMWVhZWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLWxvZ29zL2JvZGVnYS1jYXRzLnBuZyIsImlhdCI6MTc1MjkxMzc1OSwiZXhwIjoxNzg0NDQ5NzU5fQ.cDSyXA5AdWfdtrWlPFCNX6yKN2qL8KQuDUDssgMe8dE',
    created_at: '2023-01-15T00:00:00Z',
    current_rp: 0,
    elo_rating: 1685.65,
    global_rank: 16,
    leaderboard_tier: 'D',
    money_won: 0,
    player_rank_score: 0,
  },
  {
    id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    name: 'Capitol City Cats',
    logo_url: 'https://qwpxsufrgigpjcxtnery.supabase.co/storage/v1/object/sign/team-logos/capitol-city-cats-logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85Zjk2MmQ4ZS03MDQ3LTRiYzktYmZlMS02YjIyYWYxMWVhZWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWFtLWxvZ29zL2NhcGl0b2wtY2l0eS1jYXRzLWxvZ28ud2VicCIsImlhdCI6MTc1NTMzMTc3OSwiZXhwIjoxNzg2ODY3Nzc5fQ.am-QUQmZ7mxR84BLJA14AhdN9c0GdCZw2zFcszhiN1U',
    created_at: '2023-02-20T00:00:00Z',
    current_rp: 0,
    elo_rating: 1391.61,
    global_rank: 279,
    leaderboard_tier: 'D',
    money_won: 0,
    player_rank_score: 0,
  },
]

// Team roster data for the two teams
export const mockTeamRoster: TeamRosterPlayer[] = [
  // Bodega Cats players
  {
    player_id: '1',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'Goldenboy YP',
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
    gamertag: 'GK1LLER77',
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
    gamertag: 'OckTheShooter',
    position: 'Shooting Guard',
    salary_tier: 'A',
    monthly_value: 3800,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-02-01T00:00:00Z',
  },
  {
    player_id: '4',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'o_ihoop5_o',
    position: 'Lock',
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
    gamertag: 'Rye vs Rah',
    position: 'Power Forward',
    salary_tier: 'B',
    monthly_value: 3200,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  {
    player_id: '6',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'TaeCP',
    position: 'Power Forward',
    salary_tier: 'B',
    monthly_value: 3200,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  {
    player_id: '7',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'lVlr SyN',
    position: 'Power Forward',
    salary_tier: 'B',
    monthly_value: 3200,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  {
    player_id: '8',
    team_id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
    team_name: 'Bodega Cats',
    gamertag: 'X2E xLOUx X6',
    position: 'Center',
    salary_tier: 'B',
    monthly_value: 3200,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  
  // Capitol City Cats players
  {
    player_id: '9',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'BR0NX 718',
    position: 'Shooting Guard',
    salary_tier: 'A',
    monthly_value: 4200,
    is_captain: true,
    is_player_coach: false,
    joined_at: '2023-02-20T00:00:00Z',
  },
  {
    player_id: '10',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'S0BxSEID',
    position: 'Lock',
    salary_tier: 'B',
    monthly_value: 3500,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-01T00:00:00Z',
  },
  {
    player_id: '11',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'TANdurant',
    position: 'Power Forward',
    salary_tier: 'B',
    monthly_value: 3300,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-10T00:00:00Z',
  },
  {
    player_id: '12',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'S0BxPOUNDCAKE',
    position: 'Power Forward',
    salary_tier: 'C',
    monthly_value: 2800,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-15T00:00:00Z',
  },
  {
    player_id: '13',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'APxKROHM',
    position: 'Center',
    salary_tier: 'C',
    monthly_value: 2600,
    is_captain: false,
    is_player_coach: false,
    joined_at: '2023-03-20T00:00:00Z',
  },
  {
    player_id: '14',
    team_id: 'a66e363f-bc0d-4fbf-82a1-bf9ab1c760f7', // Real Capitol City Cats team ID
    team_name: 'Capitol City Cats',
    gamertag: 'JACKNFO',
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
    rank: 16,
    player: 'Goldenboy YP',
    team: 'Bodega Cats',
    points: 1686,
    wins: 25,
    losses: 15,
    winRate: 62.5,
  },
  {
    id: '2',
    rank: 279,
    player: 'BR0NX 718',
    team: 'Capitol City Cats',
    points: 1392,
    wins: 20,
    losses: 20,
    winRate: 50.0,
  },
  {
    id: '3',
    rank: 17,
    player: 'GK1LLER77',
    team: 'Bodega Cats',
    points: 1650,
    wins: 22,
    losses: 18,
    winRate: 55.0,
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
