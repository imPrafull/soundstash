import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MusicService } from './music.service';
import { Track, Artist } from '../../../models/music.model';

describe('MusicService', () => {
  let service: MusicService;
  let httpMock: HttpTestingController;

  const mockTracks: Track[] = [
    {
      id: '1',
      title: 'Test Song',
      artist: 'Test Artist',
      thumbnail: 'https://example.com/test.jpg',
      duration: '3:45',
      plays: 1000000
    },
    {
      id: '2',
      title: 'Another Song',
      artist: 'Another Artist',
      thumbnail: 'https://example.com/another.jpg',
      duration: '4:20',
      plays: 500000
    }
  ];

  const mockArtists: Artist[] = [
    {
      id: '1',
      name: 'Test Artist',
      thumbnail: 'https://example.com/artist1.jpg',
      followers: 1000000,
      genre: 'Pop'
    },
    {
      id: '2',
      name: 'Another Artist',
      thumbnail: 'https://example.com/artist2.jpg',
      followers: 2000000,
      genre: 'Rock'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MusicService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(MusicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTopTracks', () => {
    it('should fetch top tracks successfully', (done) => {
      service.getTopTracks().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual(mockTracks);
          expect(tracks.length).toBe(2);
          expect(tracks[0].title).toBe('Test Song');
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTracks);
    });

    it('should handle HTTP error and return empty array', (done) => {
      spyOn(console, 'error');

      service.getTopTracks().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual([]);
          expect(console.error).toHaveBeenCalledWith('Error fetching top tracks:', jasmine.any(Object));
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.error(new ProgressEvent('Network error'), { status: 404, statusText: 'Not Found' });
    });

    it('should apply random delay', (done) => {
      const startTime = Date.now();

      service.getTopTracks().subscribe({
        next: (tracks) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Should have at least 200ms delay
          expect(duration).toBeGreaterThanOrEqual(200);
          expect(tracks).toEqual(mockTracks);
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.flush(mockTracks);
    });

    it('should return Track array with correct interface', (done) => {
      service.getTopTracks().subscribe({
        next: (tracks) => {
          tracks.forEach(track => {
            expect(track).toEqual(jasmine.objectContaining({
              id: jasmine.any(String),
              title: jasmine.any(String),
              artist: jasmine.any(String),
              thumbnail: jasmine.any(String)
            }));
            
            // Optional fields
            if (track.duration) {
              expect(track.duration).toEqual(jasmine.any(String));
            }
            if (track.plays) {
              expect(track.plays).toEqual(jasmine.any(Number));
            }
          });
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.flush(mockTracks);
    });
  });

  describe('getTopArtists', () => {
    it('should fetch top artists successfully', (done) => {
      service.getTopArtists().subscribe({
        next: (artists) => {
          expect(artists).toEqual(mockArtists);
          expect(artists.length).toBe(2);
          expect(artists[0].name).toBe('Test Artist');
          done();
        }
      });

      const req = httpMock.expectOne('./data/artists.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockArtists);
    });

    it('should handle HTTP error and return empty array', (done) => {
      spyOn(console, 'error');

      service.getTopArtists().subscribe({
        next: (artists) => {
          expect(artists).toEqual([]);
          expect(console.error).toHaveBeenCalledWith('Error fetching top artists:', jasmine.any(Object));
          done();
        }
      });

      const req = httpMock.expectOne('./data/artists.json');
      req.error(new ProgressEvent('Network error'), { status: 500, statusText: 'Internal Server Error' });
    });

    it('should apply random delay', (done) => {
      const startTime = Date.now();

      service.getTopArtists().subscribe({
        next: (artists) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Should have at least 200ms delay
          expect(duration).toBeGreaterThanOrEqual(200);
          expect(artists).toEqual(mockArtists);
          done();
        }
      });

      const req = httpMock.expectOne('./data/artists.json');
      req.flush(mockArtists);
    });

    it('should return Artist array with correct interface', (done) => {
      service.getTopArtists().subscribe({
        next: (artists) => {
          artists.forEach(artist => {
            expect(artist).toEqual(jasmine.objectContaining({
              id: jasmine.any(String),
              name: jasmine.any(String),
              thumbnail: jasmine.any(String)
            }));
            
            // Optional fields
            if (artist.followers) {
              expect(artist.followers).toEqual(jasmine.any(Number));
            }
            if (artist.genre) {
              expect(artist.genre).toEqual(jasmine.any(String));
            }
          });
          done();
        }
      });

      const req = httpMock.expectOne('./data/artists.json');
      req.flush(mockArtists);
    });
  });

  describe('getNewReleases', () => {
    it('should fetch new releases successfully', (done) => {
      service.getNewReleases().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual(mockTracks);
          expect(tracks.length).toBe(2);
          expect(tracks[0].title).toBe('Test Song');
          done();
        }
      });

      const req = httpMock.expectOne('./data/new-releases.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTracks);
    });

    it('should handle HTTP error and return empty array', (done) => {
      spyOn(console, 'error');

      service.getNewReleases().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual([]);
          expect(console.error).toHaveBeenCalledWith('Error fetching new releases:', jasmine.any(Object));
          done();
        }
      });

      const req = httpMock.expectOne('./data/new-releases.json');
      req.error(new ProgressEvent('Network error'), { status: 403, statusText: 'Forbidden' });
    });

    it('should apply random delay', (done) => {
      const startTime = Date.now();

      service.getNewReleases().subscribe({
        next: (tracks) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Should have at least 200ms delay
          expect(duration).toBeGreaterThanOrEqual(200);
          expect(tracks).toEqual(mockTracks);
          done();
        }
      });

      const req = httpMock.expectOne('./data/new-releases.json');
      req.flush(mockTracks);
    });

    it('should return Track array with correct interface', (done) => {
      service.getNewReleases().subscribe({
        next: (tracks) => {
          tracks.forEach(track => {
            expect(track).toEqual(jasmine.objectContaining({
              id: jasmine.any(String),
              title: jasmine.any(String),
              artist: jasmine.any(String),
              thumbnail: jasmine.any(String)
            }));
          });
          done();
        }
      });

      const req = httpMock.expectOne('./data/new-releases.json');
      req.flush(mockTracks);
    });
  });

  describe('getMostLoved', () => {
    it('should fetch most loved tracks successfully', (done) => {
      service.getMostLoved().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual(mockTracks);
          expect(tracks.length).toBe(2);
          expect(tracks[0].title).toBe('Test Song');
          done();
        }
      });

      const req = httpMock.expectOne('./data/most-loved.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTracks);
    });

    it('should handle HTTP error and return empty array', (done) => {
      spyOn(console, 'error');

      service.getMostLoved().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual([]);
          expect(console.error).toHaveBeenCalledWith('Error fetching most loved tracks:', jasmine.any(Object));
          done();
        }
      });

      const req = httpMock.expectOne('./data/most-loved.json');
      req.error(new ProgressEvent('Timeout'), { status: 408, statusText: 'Request Timeout' });
    });

    it('should apply random delay', (done) => {
      const startTime = Date.now();

      service.getMostLoved().subscribe({
        next: (tracks) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Should have at least 200ms delay
          expect(duration).toBeGreaterThanOrEqual(200);
          expect(tracks).toEqual(mockTracks);
          done();
        }
      });

      const req = httpMock.expectOne('./data/most-loved.json');
      req.flush(mockTracks);
    });

    it('should return Track array with correct interface', (done) => {
      service.getMostLoved().subscribe({
        next: (tracks) => {
          tracks.forEach(track => {
            expect(track).toEqual(jasmine.objectContaining({
              id: jasmine.any(String),
              title: jasmine.any(String),
              artist: jasmine.any(String),
              thumbnail: jasmine.any(String)
            }));
          });
          done();
        }
      });

      const req = httpMock.expectOne('./data/most-loved.json');
      req.flush(mockTracks);
    });
  });

  describe('Service Configuration', () => {
    it('should use correct base URL', () => {
      expect(service['baseUrl']).toBe('./data');
    });

    it('should handle multiple simultaneous requests', (done) => {
      let completedRequests = 0;
      const totalRequests = 4;

      const checkCompletion = () => {
        completedRequests++;
        if (completedRequests === totalRequests) {
          done();
        }
      };

      // Make multiple simultaneous requests
      service.getTopTracks().subscribe({ next: checkCompletion });
      service.getTopArtists().subscribe({ next: checkCompletion });
      service.getNewReleases().subscribe({ next: checkCompletion });
      service.getMostLoved().subscribe({ next: checkCompletion });

      // Fulfill all requests
      const tracksReq = httpMock.expectOne('./data/tracks.json');
      const artistsReq = httpMock.expectOne('./data/artists.json');
      const newReleasesReq = httpMock.expectOne('./data/new-releases.json');
      const mostLovedReq = httpMock.expectOne('./data/most-loved.json');

      tracksReq.flush(mockTracks);
      artistsReq.flush(mockArtists);
      newReleasesReq.flush(mockTracks);
      mostLovedReq.flush(mockTracks);
    });

    it('should handle empty response arrays', (done) => {
      service.getTopTracks().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual([]);
          expect(Array.isArray(tracks)).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.flush([]);
    });

    it('should handle malformed JSON gracefully', (done) => {
      spyOn(console, 'error');

      service.getTopTracks().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual([]);
          expect(console.error).toHaveBeenCalled();
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.error(new ProgressEvent('Parse error'), { status: 200, statusText: 'OK' });
    });
  });

  describe('Observable Behavior', () => {
    it('should complete the observable after successful response', (done) => {
      service.getTopTracks().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual(mockTracks);
        },
        complete: () => {
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.flush(mockTracks);
    });

    it('should complete the observable after error response', (done) => {
      spyOn(console, 'error');

      service.getTopTracks().subscribe({
        next: (tracks) => {
          expect(tracks).toEqual([]);
        },
        complete: () => {
          done();
        }
      });

      const req = httpMock.expectOne('./data/tracks.json');
      req.error(new ProgressEvent('Network error'));
    });

    it('should be cold observable (not execute until subscribed)', () => {
      const observable = service.getTopTracks();
      
      // No HTTP request should be made yet
      httpMock.expectNone('./data/tracks.json');
      
      // Subscribe to trigger the request
      observable.subscribe();
      
      // Now the request should be made
      const req = httpMock.expectOne('./data/tracks.json');
      req.flush(mockTracks);
    });

    it('should create new request for each subscription', () => {
      const observable = service.getTopTracks();
      
      // First subscription
      observable.subscribe();
      const req1 = httpMock.expectOne('./data/tracks.json');
      req1.flush(mockTracks);
      
      // Second subscription should create new request
      observable.subscribe();
      const req2 = httpMock.expectOne('./data/tracks.json');
      req2.flush(mockTracks);
    });
  });
});