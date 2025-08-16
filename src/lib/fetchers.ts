import type { Team, Event, RankingRow, MediaItem } from './types'
import { mockTeams, mockEvents, mockRankings, mockMedia } from './mock'

// TODO: Replace these functions with actual API calls to your existing services
// Example: const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`)

export async function getTeams(): Promise<Team[]> {
  // TODO: Replace with: return fetch('/api/teams').then(res => res.json())
  return Promise.resolve(mockTeams)
}

export async function getTeam(slug: string): Promise<Team | null> {
  // TODO: Replace with: return fetch(`/api/teams/${slug}`).then(res => res.json())
  const team = mockTeams.find(t => t.slug === slug)
  return Promise.resolve(team || null)
}

export async function getEvents(): Promise<Event[]> {
  // TODO: Replace with: return fetch('/api/events').then(res => res.json())
  return Promise.resolve(mockEvents)
}

export async function getFeaturedEvents(): Promise<Event[]> {
  // TODO: Replace with: return fetch('/api/events?featured=true').then(res => res.json())
  return Promise.resolve(mockEvents.filter(e => e.featured))
}

export async function getRankings(): Promise<RankingRow[]> {
  // TODO: Replace with: return fetch('/api/rankings').then(res => res.json())
  return Promise.resolve(mockRankings)
}

export async function getMedia(): Promise<MediaItem[]> {
  // TODO: Replace with: return fetch('/api/media').then(res => res.json())
  return Promise.resolve(mockMedia)
}

export async function getVideos(): Promise<MediaItem[]> {
  // TODO: Replace with: return fetch('/api/media?type=video').then(res => res.json())
  return Promise.resolve(mockMedia.filter(m => m.type === 'video'))
}

export async function getImages(): Promise<MediaItem[]> {
  // TODO: Replace with: return fetch('/api/media?type=image').then(res => res.json())
  return Promise.resolve(mockMedia.filter(m => m.type === 'image'))
}
