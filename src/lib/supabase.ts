import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../db.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️  Supabase credentials are missing!')
  console.warn('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  console.warn('The app will use mock data until credentials are configured.')
}

// Create Supabase client - will use placeholder values if env vars are missing
// Queries will fail gracefully and fetchers will fall back to mock data
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: false,
    },
  }
)

