# API Integration Guide

This document outlines the integration between the Bodega Cats Gaming Club frontend and the NBA 2K Global Rankings backend API.

## Overview

The frontend has been updated to integrate with the new NBA 2K Global Rankings backend API, which provides a comprehensive RESTful API for managing teams, tournaments, players, and rankings.

## Backend API Structure

The backend API follows a versioned RESTful structure:

- **Base URL**: `https://api.bodegacatsgc.gg`
- **API Version**: `v1`
- **Authentication**: Bearer token-based (JWT)

### Key Endpoints

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Teams | `/v1/teams` | Team management and rosters |
| Tournaments | `/v1/tournaments` | Tournament and event management |
| Leaderboard | `/v1/leaderboard` | Player rankings and statistics |
| Players | `/v1/players` | Player profiles and data |
| Matches | `/v1/matches` | Match results and statistics |
| Player Stats | `/v1/player-stats` | Detailed player performance metrics |

## Frontend Integration

### Configuration

The frontend uses a centralized configuration system in `src/lib/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bodegacatsgc.gg',
  VERSION: 'v1',
  ENDPOINTS: {
    TEAMS: '/v1/teams',
    TOURNAMENTS: '/v1/tournaments',
    LEADERBOARD: '/v1/leaderboard',
    // ... more endpoints
  }
}
```

### Data Models

The frontend has been updated with new TypeScript interfaces that match the backend models:

#### Team Model
```typescript
export interface Team {
  id: string
  name: string
  tag?: string
  description?: string
  logo_url?: string
  region_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
  created_by?: string
  players?: Player[]
}
```

#### Player Profile Model
```typescript
export interface PlayerProfile {
  id: string
  name: string
  player_rp: number
  player_rank_score: number
  wins: number
  losses: number
  win_rate: number
  rank: number
  tier: string
  region?: string
  current_team_id?: string
  current_team_name?: string
  avatar_url?: string
}
```

### API Fetchers

The frontend uses a centralized fetcher system in `src/lib/fetchers.ts` that:

1. **Handles both new and legacy response formats**
2. **Provides fallback to mock data during build time**
3. **Includes proper error handling and timeouts**
4. **Supports backward compatibility**

#### Example Usage

```typescript
// Get all teams
const teams = await getTeams()

// Get specific team with players
const team = await getTeam(teamId)

// Get leaderboard
const leaderboard = await getLeaderboard(100)

// Get tournaments (converted to events for compatibility)
const events = await getEvents()
```

### Backward Compatibility

The frontend maintains backward compatibility by:

1. **Converting new data structures to legacy formats** where needed
2. **Providing fallback mock data** when API calls fail
3. **Supporting both slug-based and ID-based routing** for teams
4. **Maintaining existing component interfaces** while updating internal logic

## Environment Configuration

Update your `.env.local` file with the backend API URL:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://api.bodegacatsgc.gg

# For local development
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Key Changes Made

### 1. Updated Data Models
- Aligned TypeScript interfaces with backend models
- Added new `PlayerProfile` interface for leaderboard data
- Updated `Team` interface to match backend structure

### 2. Enhanced API Fetchers
- Added support for new API response format
- Implemented proper error handling and fallbacks
- Added centralized configuration management
- Maintained backward compatibility with existing components

### 3. Updated Components
- Modified `TeamCard` component to handle new team structure
- Updated `TeamPage` to use ID-based routing and new data fields
- Enhanced `LeaderboardTable` to work with new ranking data
- Updated configuration usage in `SiteFooter` and `RankingsTeaser`

### 4. Configuration Management
- Created centralized `config.ts` for API settings
- Added helper functions for URL building
- Separated external service configuration

## Error Handling

The frontend implements robust error handling:

1. **API Timeouts**: 5-second timeout for all API calls
2. **Fallback Data**: Mock data used when API calls fail
3. **Build-time Safety**: Mock data used during static generation
4. **Graceful Degradation**: Components work with partial data

## Development Workflow

### Local Development
1. Set `NEXT_PUBLIC_API_URL=http://localhost:8000` in `.env.local`
2. Start the backend server on port 8000
3. Run the frontend development server

### Production Deployment
1. Set `NEXT_PUBLIC_API_URL=https://api.bodegacatsgc.gg`
2. Ensure backend is deployed and accessible
3. Deploy frontend with proper environment variables

## Testing

The frontend includes comprehensive testing for API integration:

1. **Mock Data**: Available for offline development
2. **Error Scenarios**: Handled gracefully with fallbacks
3. **Build-time Safety**: Prevents timeouts during static generation

## Future Enhancements

Planned improvements for the API integration:

1. **Real-time Updates**: WebSocket integration for live data
2. **Caching**: Implement client-side caching for better performance
3. **Authentication**: Add user authentication and protected routes
4. **Media API**: Integrate with backend media endpoints when available

## Troubleshooting

### Common Issues

1. **API Timeouts**: Check backend server status and network connectivity
2. **CORS Errors**: Ensure backend CORS configuration includes frontend domain
3. **Data Mismatches**: Verify API response format matches expected structure
4. **Build Failures**: Check that mock data is available and properly formatted

### Debug Mode

Enable debug logging by setting:
```env
NEXT_PUBLIC_DEBUG=true
```

This will log API calls and responses to the browser console.

## Support

For API integration issues:

1. Check the backend API documentation
2. Review the network tab for failed requests
3. Verify environment variable configuration
4. Test with the backend's interactive API docs at `/docs`
