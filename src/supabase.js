import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxaiuzxnwbttbqxosdrx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_rS9ArlwrxU-01xX5_4UVyg__Dpn1Xa2'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
