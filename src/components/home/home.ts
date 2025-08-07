import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import { Track, Artist, ChartData } from '../../models/music.model';
import { ChartSectionComponent } from '../chart-section/chart-section';
import { TrackCardComponent } from '../track-card/track-card';
import { ArtistCardComponent } from '../artist-card/artist-card';
import { forkJoin } from 'rxjs';

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
  
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed signals for overall state
  hasData = computed(() => 
    this.topTracks().length > 0 || 
    this.topArtists().length > 0 || 
    this.newReleases().length > 0 || 
    this.mostLoved().length > 0
  );
  
  isReady = computed(() => !this.loading() && this.hasData());
  
  // Combined chart data for template compatibility
  chartData = computed(() => ({
    topTracks: this.topTracks(),
    topArtists: this.topArtists(),
    topNewReleases: this.newReleases(),
    mostLoved: this.mostLoved()
  }));

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.loading.set(true);
    this.error.set(null);
    
    // Load all sections simultaneously but maintain display order
    forkJoin({
      topTracks: this.musicService.getTopTracks(),
      topArtists: this.musicService.getTopArtists(),
      newReleases: this.musicService.getNewReleases(),
      mostLoved: this.musicService.getMostLoved()
    }).subscribe({
      next: (data) => {
        // Set all data at once to maintain order
        this.topTracks.set(data.topTracks);
        this.topArtists.set(data.topArtists);
        this.newReleases.set(data.newReleases);
        this.mostLoved.set(data.mostLoved);
        
        // Update individual loading states
        this.topTracksLoading.set(false);
        this.topArtistsLoading.set(false);
        this.newReleasesLoading.set(false);
        this.mostLovedLoading.set(false);
        
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        this.error.set('Failed to load music data');
        
        // Set all loading states to false on error
        this.topTracksLoading.set(false);
        this.topArtistsLoading.set(false);
        this.newReleasesLoading.set(false);
        this.mostLovedLoading.set(false);
        
        this.loading.set(false);
      }
    });
  }
}