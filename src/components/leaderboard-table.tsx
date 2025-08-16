'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import type { RankingRow } from '@/lib/types'
import { formatWinRate } from '@/lib/utils'

interface LeaderboardTableProps {
  rankings: RankingRow[]
}

export function LeaderboardTable({ rankings }: LeaderboardTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof RankingRow>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredAndSortedRankings = useMemo(() => {
    let filtered = rankings.filter(
      (ranking) =>
        ranking.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ranking.team.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    return filtered
  }, [rankings, searchTerm, sortField, sortDirection])

  const handleSort = (field: keyof RankingRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortIcon = ({ field }: { field: keyof RankingRow }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <TrendingUp className="h-4 w-4 ml-1" />
    ) : (
      <TrendingDown className="h-4 w-4 ml-1" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search players or teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th 
                className="text-left py-3 px-4 font-semibold cursor-pointer hover:text-bcg-accent transition-colors"
                onClick={() => handleSort('rank')}
              >
                <div className="flex items-center">
                  Rank
                  <SortIcon field="rank" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold cursor-pointer hover:text-bcg-accent transition-colors"
                onClick={() => handleSort('player')}
              >
                <div className="flex items-center">
                  Player
                  <SortIcon field="player" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold cursor-pointer hover:text-bcg-accent transition-colors"
                onClick={() => handleSort('team')}
              >
                <div className="flex items-center">
                  Team
                  <SortIcon field="team" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold cursor-pointer hover:text-bcg-accent transition-colors"
                onClick={() => handleSort('points')}
              >
                <div className="flex items-center">
                  Points
                  <SortIcon field="points" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold cursor-pointer hover:text-bcg-accent transition-colors"
                onClick={() => handleSort('winRate')}
              >
                <div className="flex items-center">
                  Win Rate
                  <SortIcon field="winRate" />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-semibold">Record</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRankings.map((ranking) => (
              <tr 
                key={ranking.id} 
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <Badge variant={ranking.rank <= 3 ? 'default' : 'outline'}>
                    #{ranking.rank}
                  </Badge>
                </td>
                <td className="py-3 px-4 font-medium">{ranking.player}</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">{ranking.team}</Badge>
                </td>
                <td className="py-3 px-4 font-semibold">{ranking.points.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={ranking.winRate >= 70 ? 'text-green-600 dark:text-green-400' : ''}>
                    {ranking.winRate.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {ranking.wins}W - {ranking.losses}L
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedRankings.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No rankings found matching your search.
        </div>
      )}
    </div>
  )
}
