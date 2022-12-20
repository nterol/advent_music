export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      songs: {
        Row: {
          id: number
          created_at: string | null
          youtube_url: string | null
          spotify_url: string | null
          deezer_url: string | null
          published_date: string | null
          cover_url: string | null
          artists: string[] | null
          name: string | null
          album: string | null
          publisher: string | null
          comment: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          youtube_url?: string | null
          spotify_url?: string | null
          deezer_url?: string | null
          published_date?: string | null
          cover_url?: string | null
          artists?: string[] | null
          name?: string | null
          album?: string | null
          publisher?: string | null
          comment?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          youtube_url?: string | null
          spotify_url?: string | null
          deezer_url?: string | null
          published_date?: string | null
          cover_url?: string | null
          artists?: string[] | null
          name?: string | null
          album?: string | null
          publisher?: string | null
          comment?: string | null
        }
      }
      users: {
        Row: {
          id: string
          created_at: string | null
          phone: string | null
          name: string | null
          surname: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          phone?: string | null
          name?: string | null
          surname?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          phone?: string | null
          name?: string | null
          surname?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      a_song_per_day: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      test: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
