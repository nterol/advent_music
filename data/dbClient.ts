import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const hasURL = process.env.SUPABASE_URL;
const hasKey = process.env.SUPABASE_KEY;

const dbClient = hasURL && hasKey ? createClient<Database>(hasURL, hasKey) : null;

export default dbClient;
