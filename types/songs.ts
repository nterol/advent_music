import { Database } from './database';

export type TCoverSong = {
  cover_url: string | null;
  name: string | null;
  published_date: string | null;
};

export type SongRow = Database['public']['Tables']['songs']['Row'];
