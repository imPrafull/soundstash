import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Track, Artist, TrackResponse, ArtistResponse } from '../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  baseUrl = 'http://localhost:3000'

  private http = inject(HttpClient)

  getTopTracks() {
    return this.http.get<TrackResponse>(`${this.baseUrl}/track/top?limit=10`).pipe(
      delay(200),
      map(res => res.tracks.track)
    )
  }

  getTopArtists() {
    return this.http.get<ArtistResponse>(`${this.baseUrl}/artist/top?limit=10`).pipe(
      delay(200),
      map(res => res.artists.artist)
    )
  }
}