export interface TrackResponse {
  tracks: TrackWrapper;
}

export interface TrackWrapper {
  track: Track[];
  "@attr": Attr;
}

export interface Track {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: ArtistSummary;
  image: Image[];
}

export interface Streamable {
  "#text": string;
  fulltrack: string;
}

export interface ArtistSummary {
  name: string;
  mbid: string;
  url: string;
}

export interface Attr {
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

export interface ArtistResponse {
  artists: ArtistWrapper;
}

export interface ArtistWrapper {
  artist: Artist[];
  "@attr": Attr;
}

export interface Artist {
  name:       string;
  playcount:  string;
  listeners:  string;
  mbid:       string;
  url:        string;
  streamable: string;
  image:      Image[];
}

export interface Image {
  "#text": string;
  size:    string;
}

export interface ChartData {
  topTracks: Track[];
  topArtists: Artist[];
  topNewReleases: Track[];
  mostLoved: Track[];
}