import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/music.model';

@Component({
  selector: 'ss-track-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-card.html',
  styleUrls: ['./track-card.css']
})
export class TrackCardComponent {
  @Input() track!: Track;
  
  // Signals for component state
  isHovered = signal(false);
  
  // Computed signals for derived values
  hasMetadata = computed(() => !!(this.track?.duration || this.track?.plays));
  formattedPlays = computed(() => {
    if (!this.track?.plays) return '';
    const plays = this.track.plays;
    if (plays >= 1000000) {
      return (plays / 1000000).toFixed(1) + 'M';
    } else if (plays >= 1000) {
      return (plays / 1000).toFixed(0) + 'K';
    }
    return plays.toString();
  });
}