import { of, throwError } from 'rxjs';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { HomeComponent } from './home';
import { MusicService } from './services/music.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import data from '../../data/tracks.json'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let musicService: MusicService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // UserService from the root injector
    musicService = TestBed.inject(MusicService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should set loading to false and populate topTracks when service returns data', waitForAsync(() => {
    const mockTracks = [
      {
        "id": "1",
        "title": "Blinding Lights",
        "artist": "The Weeknd",
        "thumbnail": "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        "duration": "3:20",
        "plays": 2500000
      }
    ]
    spyOn(musicService, 'getTopTracks').and.returnValue(of(mockTracks));
    component['loadTopTracks']();
    expect(component.topTracks()).toEqual(mockTracks);
    expect(component.topTracksLoading()).toBeFalse();
  }));

  it('should set loading to false and handle error when service fails', waitForAsync(() => {
    spyOn(musicService, 'getTopTracks').and.returnValue(throwError(() => new Error('Network error')));
    component['loadTopTracks']();
    expect(component.topTracksLoading()).toBeFalse();
    // Optionally check for error logging or error signal
  }));
});