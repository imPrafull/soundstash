import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/music.model';

@Component({
  selector: 'ss-artist-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-card.html',
  styleUrls: ['./artist-card.css']
})
export class ArtistCardComponent {
  @Input() artist!: Artist;
  
  // Signals for component state
  isHovered = signal(false);
  
  // Computed signal for formatted followers
  formattedFollowers = computed(() => {
    if (!this.artist?.followers) return '';
    const followers = this.artist.followers;
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + 'M';
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(0) + 'K';
    }
    return followers.toString();
  });
}