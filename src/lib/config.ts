export const config = {
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.bodegacatsgc.gg',
  globalRankingsUrl: process.env.NEXT_PUBLIC_GLOBAL_RANKINGS_URL || 'https://k.siba.gg',
  globalRankingsEmbedUrl: process.env.NEXT_PUBLIC_GLOBAL_RANKINGS_EMBED_URL || 'https://k.siba.gg/embed/leaderboard',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.bodegacatsgc.gg',
} as const

export const { adminUrl, globalRankingsUrl, globalRankingsEmbedUrl, apiUrl } = config
