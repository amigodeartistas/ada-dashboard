import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxaiuzxnwbttbqxosdrx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4YWl1enhud2J0dGJxeG9zZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODI3MzAsImV4cCI6MjA5MDA1ODczMH0.IJCCqiSyxKoEWQnVLuu2VOr_IVZSEmb4x2ZHzzYzjzE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
