import type { Team, Event, RankingRow, MediaItem } from './types'
import { mockTeams, mockEvents, mockRankings, mockMedia } from './mock'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.bodegacatsgc.gg'

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined'

// Helper function for API calls with error handling
async function apiCall<T>(endpoint: string, fallback: T): Promise<T> {
  // During build time, always return mock data to prevent timeouts
  if (isBuildTime) {
    return fallback
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000)
    })
    if (!response.ok) {
      console.warn(`API call failed for ${endpoint}:`, response.status, response.statusText)
      return fallback
    }
    return await response.json()
  } catch (error) {
    console.warn(`API call error for ${endpoint}:`, error)
    return fallback
  }
}

export async function getTeams(): Promise<Team[]> {
  return apiCall('/teams', mockTeams)
}

export async function getTeam(slug: string): Promise<Team | null> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockTeams.find(t => t.slug === slug) || null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/teams/${slug}`, {
      signal: AbortSignal.timeout(5000)
    })
    if (!response.ok) {
      console.warn(`Team not found: ${slug}`)
      return mockTeams.find(t => t.slug === slug) || null
    }
    return await response.json()
  } catch (error) {
    console.warn(`API call error for team ${slug}:`, error)
    return mockTeams.find(t => t.slug === slug) || null
  }
}

export async function getEvents(): Promise<Event[]> {
  return apiCall('/events', mockEvents)
}

export async function getFeaturedEvents(): Promise<Event[]> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockEvents.filter(e => e.featured)
  }

  try {
    const response = await fetch(`${API_BASE_URL}/events?featured=true`, {
      signal: AbortSignal.timeout(5000)
    })
    if (!response.ok) {
      return mockEvents.filter(e => e.featured)
    }
    return await response.json()
  } catch (error) {
    console.warn(`API call error for featured events:`, error)
    return mockEvents.filter(e => e.featured)
  }
}

export async function getRankings(): Promise<RankingRow[]> {
  return apiCall('/rankings', mockRankings)
}

export async function getMedia(): Promise<MediaItem[]> {
  return apiCall('/media', mockMedia)
}

export async function getVideos(): Promise<MediaItem[]> {
  // During build time, always return mock data
  if (isBuildTime) {
    return mockMedia.filter(m => m.type === 'video')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/media?type=video`, {
      signal: AbortSignal.timeout(5000)
    })
    if (!response.ok) {
      return mockMedia.filter(m => m.type === 'video')
    }
    return await response.json()
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
    const response = await fetch(`${API_BASE_URL}/media?type=image`, {
      signal: AbortSignal.timeout(5000)
    })
    if (!response.ok) {
      return mockMedia.filter(m => m.type === 'image')
    }
    return await response.json()
  } catch (error) {
    console.warn(`API call error for images:`, error)
    return mockMedia.filter(m => m.type === 'image')
  }
}
