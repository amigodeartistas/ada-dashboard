import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://hxaiuzxnwbttbqxosdrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4YWl1enhud2J0dGJxeG9zZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODI3MzAsImV4cCI6MjA5MDA1ODczMH0.IJCCqiSyxKoEWQnVLuu2VOr_IVZSEmb4x2ZHzzYzjzE',
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
)
