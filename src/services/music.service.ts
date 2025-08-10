import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Track, Artist, ChartData } from '../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly baseUrl = '/data';

  constructor(private http: HttpClient) {}

  getChartData(): Observable<ChartData> {
    // Combine all data sources into a single chart data object
    return this.http.get<Track[]>(`${this.baseUrl}/tracks.json`).pipe(
      map(topTracks => ({
        topTracks,
        topArtists: [], // Will be populated by separate calls
        topNewReleases: [], // Will be populated by separate calls
        mostLoved: [] // Will be populated by separate calls
      })),
      delay(300), // Simulate network delay
      catchError(error => {
        console.error('Error fetching chart data:', error);
        return of({
          topTracks: [],
          topArtists: [],
          topNewReleases: [],
          mostLoved: []
        });
      })
    );
  }

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

  // Additional methods for more realistic API simulation
  getTrackById(id: string): Observable<Track | null> {
    return this.getTopTracks().pipe(
      map(tracks => tracks.find(track => track.id === id) || null),
      catchError(error => {
        console.error(`Error fetching track ${id}:`, error);
        return of(null);
      })
    );
  }

  getArtistById(id: string): Observable<Artist | null> {
    return this.getTopArtists().pipe(
      map(artists => artists.find(artist => artist.id === id) || null),
      catchError(error => {
        console.error(`Error fetching artist ${id}:`, error);
        return of(null);
      })
    );
  }

  searchTracks(query: string): Observable<Track[]> {
    return this.getTopTracks().pipe(
      map(tracks => tracks.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase())
      )),
      delay(300), // Simulate search delay
      catchError(error => {
        console.error('Error searching tracks:', error);
        return of([]);
      })
    );
  }

  searchArtists(query: string): Observable<Artist[]> {
    return this.getTopArtists().pipe(
      map(artists => artists.filter(artist => 
        artist.name.toLowerCase().includes(query.toLowerCase()) ||
        (artist.genre && artist.genre.toLowerCase().includes(query.toLowerCase()))
      )),
      delay(300), // Simulate search delay
      catchError(error => {
        console.error('Error searching artists:', error);
        return of([]);
      })
    );
  }
}