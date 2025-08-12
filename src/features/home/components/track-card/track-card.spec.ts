import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackCardComponent } from './track-card';
import { Track } from '../../../../models/music.model';

describe('TrackCardComponent', () => {
  let component: TrackCardComponent;
  let fixture: ComponentFixture<TrackCardComponent>;
  let compiled: HTMLElement;

  const mockTrack: Track = {
    id: '1',
    title: 'Test Song',
    artist: 'Test Artist',
    thumbnail: 'https://example.com/test-image.jpg',
    duration: '3:45',
    plays: 1500000
  };

  const mockTrackWithoutOptionalFields: Track = {
    id: '2',
    title: 'Minimal Song',
    artist: 'Minimal Artist',
    thumbnail: 'https://example.com/minimal-image.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    component.track = mockTrack;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Component Rendering', () => {
    beforeEach(() => {
      component.track = mockTrack;
      fixture.detectChanges();
    });

    it('should display track title', () => {
      const titleElement = compiled.querySelector('.track-title');
      expect(titleElement?.textContent?.trim()).toBe('Test Song');
    });

    it('should display track artist', () => {
      const artistElement = compiled.querySelector('.track-artist');
      expect(artistElement?.textContent?.trim()).toBe('Test Artist');
    });

    it('should display track duration when provided', () => {
      const durationElement = compiled.querySelector('.duration');
      expect(durationElement?.textContent?.trim()).toBe('3:45');
    });

    it('should display formatted plays count', () => {
      const playsElement = compiled.querySelector('.plays');
      expect(playsElement?.textContent?.trim()).toBe('1.5M plays');
    });

    it('should display track thumbnail with correct src and alt attributes', () => {
      const thumbnailElement = compiled.querySelector('.thumbnail') as HTMLImageElement;
      expect(thumbnailElement.src).toBe('https://example.com/test-image.jpg');
      expect(thumbnailElement.alt).toBe('Test Song album cover');
    });

    it('should have correct aria-label for accessibility', () => {
      const cardElement = compiled.querySelector('.track-card');
      expect(cardElement?.getAttribute('aria-label')).toBe('Test Song by Test Artist');
    });

    it('should have lazy loading enabled on thumbnail', () => {
      const thumbnailElement = compiled.querySelector('.thumbnail') as HTMLImageElement;
      expect(thumbnailElement.loading).toBe('lazy');
    });

    it('should display metadata section when duration or plays are available', () => {
      const metaElement = compiled.querySelector('.track-meta');
      expect(metaElement).toBeTruthy();
    });
  });

  describe('Optional Fields Handling', () => {
    beforeEach(() => {
      component.track = mockTrackWithoutOptionalFields;
      fixture.detectChanges();
    });

    it('should not display duration when not provided', () => {
      const durationElement = compiled.querySelector('.duration');
      expect(durationElement).toBeNull();
    });

    it('should not display plays when not provided', () => {
      const playsElement = compiled.querySelector('.plays');
      expect(playsElement).toBeNull();
    });

    it('should not display metadata section when no optional fields are provided', () => {
      const metaElement = compiled.querySelector('.track-meta');
      expect(metaElement).toBeNull();
    });

    it('should still display required fields', () => {
      const titleElement = compiled.querySelector('.track-title');
      const artistElement = compiled.querySelector('.track-artist');
      const thumbnailElement = compiled.querySelector('.thumbnail');
      
      expect(titleElement?.textContent?.trim()).toBe('Minimal Song');
      expect(artistElement?.textContent?.trim()).toBe('Minimal Artist');
      expect(thumbnailElement).toBeTruthy();
    });
  });

  describe('Partial Optional Fields', () => {
    it('should display metadata section when only duration is provided', () => {
      component.track = { ...mockTrackWithoutOptionalFields, duration: '2:30' };
      fixture.detectChanges();
      
      const metaElement = compiled.querySelector('.track-meta');
      const durationElement = compiled.querySelector('.duration');
      const playsElement = compiled.querySelector('.plays');
      
      expect(metaElement).toBeTruthy();
      expect(durationElement?.textContent?.trim()).toBe('2:30');
      expect(playsElement).toBeNull();
    });

    it('should display metadata section when only plays is provided', () => {
      component.track = { ...mockTrackWithoutOptionalFields, plays: 500000 };
      fixture.detectChanges();
      
      const metaElement = compiled.querySelector('.track-meta');
      const durationElement = compiled.querySelector('.duration');
      const playsElement = compiled.querySelector('.plays');
      
      expect(metaElement).toBeTruthy();
      expect(durationElement).toBeNull();
      expect(playsElement?.textContent?.trim()).toBe('500K plays');
    });
  });

  describe('Hover Interactions', () => {
    beforeEach(() => {
      component.track = mockTrack;
      fixture.detectChanges();
    });

    it('should not show play overlay initially', () => {
      const playOverlay = compiled.querySelector('.play-overlay');
      expect(playOverlay).toBeNull();
    });

    it('should show play overlay on mouse enter', () => {
      const cardElement = compiled.querySelector('.track-card') as HTMLElement;
      
      cardElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      
      const playOverlay = compiled.querySelector('.play-overlay');
      expect(playOverlay).toBeTruthy();
      expect(component.isHovered()).toBe(true);
    });

    it('should hide play overlay on mouse leave', () => {
      const cardElement = compiled.querySelector('.track-card') as HTMLElement;
      
      // First hover
      cardElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.isHovered()).toBe(true);
      
      // Then leave
      cardElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      
      const playOverlay = compiled.querySelector('.play-overlay');
      expect(playOverlay).toBeNull();
      expect(component.isHovered()).toBe(false);
    });

    it('should display play button in overlay when hovered', () => {
      component.isHovered.set(true);
      fixture.detectChanges();
      
      const playButton = compiled.querySelector('.play-button');
      expect(playButton?.textContent?.trim()).toBe('▶');
    });
  });

  describe('Computed Signals', () => {
    describe('hasMetadata', () => {
      it('should return true when both duration and plays are provided', () => {
        component.track = mockTrack;
        expect(component.hasMetadata()).toBe(true);
      });

      it('should return true when only duration is provided', () => {
        component.track = { ...mockTrackWithoutOptionalFields, duration: '3:00' };
        expect(component.hasMetadata()).toBe(true);
      });

      it('should return true when only plays is provided', () => {
        component.track = { ...mockTrackWithoutOptionalFields, plays: 1000 };
        expect(component.hasMetadata()).toBe(true);
      });

      it('should return false when neither duration nor plays are provided', () => {
        component.track = mockTrackWithoutOptionalFields;
        expect(component.hasMetadata()).toBe(false);
      });

      it('should return false when duration and plays are empty/zero', () => {
        component.track = { ...mockTrackWithoutOptionalFields, duration: '', plays: 0 };
        expect(component.hasMetadata()).toBe(false);
      });
    });

    describe('formattedPlays', () => {
      it('should format plays count correctly for millions', () => {
        component.track = { ...mockTrack, plays: 2500000 };
        expect(component.formattedPlays()).toBe('2.5M');
      });

      it('should format plays count correctly for thousands', () => {
        component.track = { ...mockTrack, plays: 15000 };
        expect(component.formattedPlays()).toBe('15K');
      });

      it('should format plays count correctly for hundreds', () => {
        component.track = { ...mockTrack, plays: 500 };
        expect(component.formattedPlays()).toBe('500');
      });

      it('should return empty string when plays is undefined', () => {
        component.track = { ...mockTrack, plays: undefined };
        expect(component.formattedPlays()).toBe('');
      });

      it('should return empty string when plays is 0', () => {
        component.track = { ...mockTrack, plays: 0 };
        expect(component.formattedPlays()).toBe('');
      });

      it('should handle edge case of exactly 1 million plays', () => {
        component.track = { ...mockTrack, plays: 1000000 };
        expect(component.formattedPlays()).toBe('1.0M');
      });

      it('should handle edge case of exactly 1 thousand plays', () => {
        component.track = { ...mockTrack, plays: 1000 };
        expect(component.formattedPlays()).toBe('1K');
      });

      it('should handle large numbers correctly', () => {
        component.track = { ...mockTrack, plays: 999999999 };
        expect(component.formattedPlays()).toBe('1000.0M');
      });
    });
  });

  describe('Signal State Management', () => {
    beforeEach(() => {
      component.track = mockTrack;
      fixture.detectChanges();
    });

    it('should initialize isHovered signal as false', () => {
      expect(component.isHovered()).toBe(false);
    });

    it('should update isHovered signal correctly', () => {
      component.isHovered.set(true);
      expect(component.isHovered()).toBe(true);
      
      component.isHovered.set(false);
      expect(component.isHovered()).toBe(false);
    });

    it('should react to signal changes in template', () => {
      // Initially no overlay
      expect(compiled.querySelector('.play-overlay')).toBeNull();
      
      // Set hovered to true
      component.isHovered.set(true);
      fixture.detectChanges();
      
      // Should show overlay
      expect(compiled.querySelector('.play-overlay')).toBeTruthy();
      
      // Set back to false
      component.isHovered.set(false);
      fixture.detectChanges();
      
      // Should hide overlay
      expect(compiled.querySelector('.play-overlay')).toBeNull();
    });

    it('should maintain signal state independently across multiple changes', () => {
      component.isHovered.set(true);
      expect(component.isHovered()).toBe(true);
      
      component.isHovered.set(false);
      expect(component.isHovered()).toBe(false);
      
      component.isHovered.set(true);
      expect(component.isHovered()).toBe(true);
    });
  });

  describe('Component Integration', () => {
    it('should handle track updates correctly', () => {
      component.track = mockTrack;
      fixture.detectChanges();
      
      let titleElement = compiled.querySelector('.track-title');
      expect(titleElement?.textContent?.trim()).toBe('Test Song');
      
      // Update track
      component.track = { ...mockTrack, title: 'Updated Song' };
      fixture.detectChanges();
      
      titleElement = compiled.querySelector('.track-title');
      expect(titleElement?.textContent?.trim()).toBe('Updated Song');
    });

    it('should work with multiple instances independently', () => {
      const fixture1 = TestBed.createComponent(TrackCardComponent);
      const fixture2 = TestBed.createComponent(TrackCardComponent);
      
      const component1 = fixture1.componentInstance;
      const component2 = fixture2.componentInstance;
      
      component1.track = mockTrack;
      component2.track = mockTrackWithoutOptionalFields;
      
      fixture1.detectChanges();
      fixture2.detectChanges();
      
      expect(component1.hasMetadata()).toBe(true);
      expect(component2.hasMetadata()).toBe(false);
    });

    it('should maintain independent hover states across instances', () => {
      const fixture1 = TestBed.createComponent(TrackCardComponent);
      const fixture2 = TestBed.createComponent(TrackCardComponent);
      
      const component1 = fixture1.componentInstance;
      const component2 = fixture2.componentInstance;
      
      component1.track = mockTrack;
      component2.track = mockTrack;
      
      component1.isHovered.set(true);
      component2.isHovered.set(false);
      
      expect(component1.isHovered()).toBe(true);
      expect(component2.isHovered()).toBe(false);
    });
  });
});