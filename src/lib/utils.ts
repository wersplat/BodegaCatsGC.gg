import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatWinRate(wins: number, losses: number) {
  const total = wins + losses
  if (total === 0) return '0.0%'
  return `${((wins / total) * 100).toFixed(1)}%`
}
