import { createClient } from '@supabase/supabase-js'
import { env } from '@/env'

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
})

export const supabaseStorageURL =
  'https://rrwachssijquieilblet.supabase.co/storage/v1/object/public/videos'
