import { createClient } from '@supabase/supabase-js';

let supabaseServerClient: ReturnType<typeof createClient> | null = null;

const getSupabaseConfig = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase server client is not configured.');
  }

  return {
    supabaseUrl,
    supabaseKey,
  };
};

export const getSupabaseServerClient = () => {
  if (supabaseServerClient) {
    return supabaseServerClient;
  }

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  supabaseServerClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabaseServerClient;
};
