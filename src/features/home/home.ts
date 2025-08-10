import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from './services/music.service';
import { Track, Artist } from '../../models/music.model';
import { ChartSectionComponent } from './components/chart-section/chart-section';
import { TrackCardComponent } from './components/track-card/track-card';
import { ArtistCardComponent } from './components/artist-card/artist-card';

@Component({
  selector: 'ss-home',
  standalone: true,
  imports: [CommonModule, ChartSectionComponent, TrackCardComponent, ArtistCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  // Individual section signals to maintain order
  topTracks = signal<Track[]>([]);
  topArtists = signal<Artist[]>([]);
  newReleases = signal<Track[]>([]);
  mostLoved = signal<Track[]>([]);
  
  // Loading states for each section
  topTracksLoading = signal(true);
  topArtistsLoading = signal(true);
  newReleasesLoading = signal(true);
  mostLovedLoading = signal(true);
  
  error = signal<string | null>(null);

  // Overall loading state - true if any section is still loading
  loading = computed(() => 
    this.topTracksLoading() || 
    this.topArtistsLoading() || 
    this.newReleasesLoading() || 
    this.mostLovedLoading()
  );

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadTopTracks();
    this.loadTopArtists();
    this.loadNewReleases();
    this.loadMostLoved();
  }

  private loadTopTracks(): void {
    this.topTracksLoading.set(true);
    this.musicService.getTopTracks().subscribe({
      next: (data) => {
        this.topTracks.set(data);
        this.topTracksLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading top tracks:', error);
        this.topTracksLoading.set(false);
      }
    });
  }

  private loadTopArtists(): void {
    this.topArtistsLoading.set(true);
    this.musicService.getTopArtists().subscribe({
      next: (data) => {
        this.topArtists.set(data);
        this.topArtistsLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading top artists:', error);
        this.topArtistsLoading.set(false);
      }
    });
  }

  private loadNewReleases(): void {
    this.newReleasesLoading.set(true);
    this.musicService.getNewReleases().subscribe({
      next: (data) => {
        this.newReleases.set(data);
        this.newReleasesLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading new releases:', error);
        this.newReleasesLoading.set(false);
      }
    });
  }

  private loadMostLoved(): void {
    this.mostLovedLoading.set(true);
    this.musicService.getMostLoved().subscribe({
      next: (data) => {
        this.mostLoved.set(data);
        this.mostLovedLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading most loved:', error);
        this.mostLovedLoading.set(false);
      }
    });
  }
}