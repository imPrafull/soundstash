import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Track, Artist } from '../../../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly baseUrl = './data';

  constructor(private http: HttpClient) {}

  getTopTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.baseUrl}/tracks.json`).pipe(
      delay(Math.random() * 500 + 200), // Random delay between 200-700ms
      catchError(error => {
        console.error('Error fetching top tracks:', error);
        return of([]);
      })
    );
  }

  getTopArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.baseUrl}/artists.json`).pipe(
      delay(Math.random() * 500 + 200), // Random delay between 200-700ms
      catchError(error => {
        console.error('Error fetching top artists:', error);
        return of([]);
      })
    );
  }

  getNewReleases(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.baseUrl}/new-releases.json`).pipe(
      delay(Math.random() * 500 + 200), // Random delay between 200-700ms
      catchError(error => {
        console.error('Error fetching new releases:', error);
        return of([]);
      })
    );
  }

  getMostLoved(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.baseUrl}/most-loved.json`).pipe(
      delay(Math.random() * 500 + 200), // Random delay between 200-700ms
      catchError(error => {
        console.error('Error fetching most loved tracks:', error);
        return of([]);
      })
    );
  }
}