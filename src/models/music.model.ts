export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration?: string;
  plays?: number;
}

export interface Artist {
  id: string;
  name: string;
  thumbnail: string;
  followers?: number;
  genre?: string;
}