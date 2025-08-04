import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Track, Artist, ChartData } from '../models/music.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly dummyTracks: Track[] = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '3:20',
      plays: 2500000
    },
    {
      id: '2',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      thumbnail: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '2:54',
      plays: 1800000
    },
    {
      id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '3:23',
      plays: 2200000
    },
    {
      id: '4',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      thumbnail: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '2:58',
      plays: 1950000
    },
    {
      id: '5',
      title: 'Stay',
      artist: 'The Kid LAROI & Justin Bieber',
      thumbnail: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '2:21',
      plays: 2100000
    }
  ];

  private readonly dummyArtists: Artist[] = [
    {
      id: '1',
      name: 'The Weeknd',
      thumbnail: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      followers: 85000000,
      genre: 'R&B'
    },
    {
      id: '2',
      name: 'Taylor Swift',
      thumbnail: 'https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      followers: 95000000,
      genre: 'Pop'
    },
    {
      id: '3',
      name: 'Drake',
      thumbnail: 'https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      followers: 78000000,
      genre: 'Hip Hop'
    },
    {
      id: '4',
      name: 'Billie Eilish',
      thumbnail: 'https://images.pexels.com/photos/1845189/pexels-photo-1845189.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      followers: 67000000,
      genre: 'Alternative'
    },
    {
      id: '5',
      name: 'Ed Sheeran',
      thumbnail: 'https://images.pexels.com/photos/1845206/pexels-photo-1845206.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      followers: 72000000,
      genre: 'Pop'
    }
  ];

  private readonly newReleases: Track[] = [
    {
      id: '6',
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      thumbnail: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '3:20',
      plays: 500000
    },
    {
      id: '7',
      title: 'Unholy',
      artist: 'Sam Smith ft. Kim Petras',
      thumbnail: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '2:36',
      plays: 450000
    },
    {
      id: '8',
      title: 'I\'m Good (Blue)',
      artist: 'David Guetta & Bebe Rexha',
      thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '2:55',
      plays: 380000
    },
    {
      id: '9',
      title: 'Tití Me Preguntó',
      artist: 'Bad Bunny',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '4:02',
      plays: 420000
    },
    {
      id: '10',
      title: 'Music For a Sushi Restaurant',
      artist: 'Harry Styles',
      thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '3:13',
      plays: 350000
    }
  ];

  private readonly mostLoved: Track[] = [
    {
      id: '11',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      thumbnail: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '5:55',
      plays: 15000000
    },
    {
      id: '12',
      title: 'Hotel California',
      artist: 'Eagles',
      thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '6:30',
      plays: 12000000
    },
    {
      id: '13',
      title: 'Imagine',
      artist: 'John Lennon',
      thumbnail: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '3:07',
      plays: 18000000
    },
    {
      id: '14',
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      thumbnail: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '8:02',
      plays: 14000000
    },
    {
      id: '15',
      title: 'Sweet Child O\' Mine',
      artist: 'Guns N\' Roses',
      thumbnail: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      duration: '5:03',
      plays: 11000000
    }
  ];

  getChartData(): Observable<ChartData> {
    const chartData: ChartData = {
      topTracks: this.dummyTracks,
      topArtists: this.dummyArtists,
      topNewReleases: this.newReleases,
      mostLoved: this.mostLoved
    };
    
    // Simulate API delay
    return of(chartData).pipe(delay(300));
  }

  getTopTracks(): Observable<Track[]> {
    return of(this.dummyTracks).pipe(delay(200));
  }

  getTopArtists(): Observable<Artist[]> {
    return of(this.dummyArtists).pipe(delay(200));
  }

  getNewReleases(): Observable<Track[]> {
    return of(this.newReleases).pipe(delay(200));
  }

  getMostLoved(): Observable<Track[]> {
    return of(this.mostLoved).pipe(delay(200));
  }
}