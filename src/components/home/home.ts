import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import { Track, Artist, ChartData } from '../../models/music.model';
import { ChartSectionComponent } from '../chart-section/chart-section';
import { TrackCardComponent } from '../track-card/track-card';
import { ArtistCardComponent } from '../artist-card/artist-card';

@Component({
  selector: 'ss-home',
  standalone: true,
  imports: [CommonModule, ChartSectionComponent, TrackCardComponent, ArtistCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  chartData = signal<ChartData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed signals for derived state
  hasData = computed(() => this.chartData() !== null);
  isReady = computed(() => !this.loading() && this.hasData());

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.musicService.getChartData().subscribe({
      next: (data) => {
        this.chartData.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        this.error.set('Failed to load music data');
        this.loading.set(false);
      }
    });
  }
}