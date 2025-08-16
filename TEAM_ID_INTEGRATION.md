# Team ID Integration

This document outlines the integration of real team IDs from the backend into the frontend.

## Real Team IDs

### Bodega Cats
- **Team ID**: `ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca`
- **Name**: Bodega Cats
- **Tier**: Elite
- **Global Rank**: 15

## Updated Mock Data

The mock data has been updated to use the real Bodega Cats team ID:

### Team Data
```typescript
{
  id: 'ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca', // Real Bodega Cats team ID
  name: 'Bodega Cats',
  logo_url: '/teams/bodega-cats-logo.png',
  created_at: '2023-01-15T00:00:00Z',
  current_rp: 1250,
  elo_rating: 1850,
  global_rank: 15,
  leaderboard_tier: 'Elite',
  money_won: 5000,
  player_rank_score: 85.5,
}
```

### Team Roster
All Bodega Cats players now reference the real team ID:
- ShadowPaw (Captain, Point Guard, S Tier)
- MidnightMeow (Shooting Guard, A Tier)
- WhiskerShot (Lock, A Tier)

## Environment Configuration

The environment configuration includes a reference to the team ID:
```bash
# Team IDs (for reference)
# Bodega Cats: ed3e6f8d-3176-4c15-a20f-0ccfe04a99ca
```

## Benefits

1. **Real Data Integration**: Frontend now uses actual team IDs from the backend
2. **Seamless API Connection**: When connected to the real API, team data will match exactly
3. **Consistent References**: All team-related data uses the same team ID
4. **Easy Testing**: Mock data reflects real backend structure

## Next Steps

When additional team IDs are available from the backend, they can be easily integrated by:
1. Updating the mock data with real team IDs
2. Adding team ID references to the environment configuration
3. Testing the integration with the real API

## API Integration

When the frontend connects to the real backend API, it will:
- Fetch team data using the real team ID
- Display actual team statistics and roster information
- Show real player data associated with the team
- Maintain consistency with the backend database
