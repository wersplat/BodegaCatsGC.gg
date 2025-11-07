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
  supabaseUrl || 'https://qwpxsufrgigpjcxtnery.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cHhzdWZyZ2lncGpjeHRuZXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzI1MjksImV4cCI6MjA2NzQ0ODUyOX0.ujcyEXDgpIJVaNb7IeFZV9Yrl2l41xHq-TdEut-Wxg0',
  {
    auth: {
      persistSession: false,
    },
  }
)

