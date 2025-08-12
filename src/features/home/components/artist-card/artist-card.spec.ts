import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ArtistCardComponent } from './artist-card';
import { Artist } from '../../../../models/music.model';

describe('ArtistCardComponent', () => {
  let component: ArtistCardComponent;
  let fixture: ComponentFixture<ArtistCardComponent>;
  let compiled: HTMLElement;

  const mockArtist: Artist = {
    id: '1',
    name: 'Test Artist',
    thumbnail: 'https://example.com/test-image.jpg',
    followers: 1500000,
    genre: 'Pop'
  };

  const mockArtistWithoutOptionalFields: Artist = {
    id: '2',
    name: 'Minimal Artist',
    thumbnail: 'https://example.com/minimal-image.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    component.artist = mockArtist;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Component Rendering', () => {
    beforeEach(() => {
      component.artist = mockArtist;
      fixture.detectChanges();
    });

    it('should display artist name', () => {
      const nameElement = compiled.querySelector('.artist-name');
      expect(nameElement?.textContent?.trim()).toBe('Test Artist');
    });

    it('should display artist genre when provided', () => {
      const genreElement = compiled.querySelector('.artist-genre');
      expect(genreElement?.textContent?.trim()).toBe('Pop');
    });

    it('should display formatted followers count', () => {
      const followersElement = compiled.querySelector('.followers');
      expect(followersElement?.textContent?.trim()).toBe('1.5M followers');
    });

    it('should display artist thumbnail with correct src and alt attributes', () => {
      const thumbnailElement = compiled.querySelector('.thumbnail') as HTMLImageElement;
      expect(thumbnailElement.src).toBe('https://example.com/test-image.jpg');
      expect(thumbnailElement.alt).toBe('Test Artist profile picture');
    });

    it('should have correct aria-label for accessibility', () => {
      const cardElement = compiled.querySelector('.artist-card');
      expect(cardElement?.getAttribute('aria-label')).toBe('Test Artist artist profile');
    });

    it('should have lazy loading enabled on thumbnail', () => {
      const thumbnailElement = compiled.querySelector('.thumbnail') as HTMLImageElement;
      expect(thumbnailElement.loading).toBe('lazy');
    });
  });

  describe('Optional Fields Handling', () => {
    beforeEach(() => {
      component.artist = mockArtistWithoutOptionalFields;
      fixture.detectChanges();
    });

    it('should not display genre when not provided', () => {
      const genreElement = compiled.querySelector('.artist-genre');
      expect(genreElement).toBeNull();
    });

    it('should not display followers when not provided', () => {
      const followersElement = compiled.querySelector('.followers');
      expect(followersElement).toBeNull();
    });

    it('should still display required fields', () => {
      const nameElement = compiled.querySelector('.artist-name');
      const thumbnailElement = compiled.querySelector('.thumbnail');
      
      expect(nameElement?.textContent?.trim()).toBe('Minimal Artist');
      expect(thumbnailElement).toBeTruthy();
    });
  });

  describe('Hover Interactions', () => {
    beforeEach(() => {
      component.artist = mockArtist;
      fixture.detectChanges();
    });

    it('should not show follow overlay initially', () => {
      const followOverlay = compiled.querySelector('.follow-overlay');
      expect(followOverlay).toBeNull();
    });

    it('should show follow overlay on mouse enter', () => {
      const cardElement = compiled.querySelector('.artist-card') as HTMLElement;
      
      cardElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      
      const followOverlay = compiled.querySelector('.follow-overlay');
      expect(followOverlay).toBeTruthy();
      expect(component.isHovered()).toBe(true);
    });

    it('should hide follow overlay on mouse leave', () => {
      const cardElement = compiled.querySelector('.artist-card') as HTMLElement;
      
      // First hover
      cardElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.isHovered()).toBe(true);
      
      // Then leave
      cardElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      
      const followOverlay = compiled.querySelector('.follow-overlay');
      expect(followOverlay).toBeNull();
      expect(component.isHovered()).toBe(false);
    });

    it('should display follow button in overlay when hovered', () => {
      component.isHovered.set(true);
      fixture.detectChanges();
      
      const followButton = compiled.querySelector('.follow-button');
      expect(followButton?.textContent?.trim()).toBe('Follow');
    });
  });

  describe('Computed Signals', () => {
    it('should format followers count correctly for millions', () => {
      component.artist = { ...mockArtist, followers: 2500000 };
      expect(component.formattedFollowers()).toBe('2.5M');
    });

    it('should format followers count correctly for thousands', () => {
      component.artist = { ...mockArtist, followers: 15000 };
      expect(component.formattedFollowers()).toBe('15K');
    });

    it('should format followers count correctly for hundreds', () => {
      component.artist = { ...mockArtist, followers: 500 };
      expect(component.formattedFollowers()).toBe('500');
    });

    it('should return empty string when followers is undefined', () => {
      component.artist = { ...mockArtist, followers: undefined };
      expect(component.formattedFollowers()).toBe('');
    });

    it('should return empty string when followers is 0', () => {
      component.artist = { ...mockArtist, followers: 0 };
      expect(component.formattedFollowers()).toBe('');
    });

    it('should handle edge case of exactly 1 million followers', () => {
      component.artist = { ...mockArtist, followers: 1000000 };
      expect(component.formattedFollowers()).toBe('1.0M');
    });

    it('should handle edge case of exactly 1 thousand followers', () => {
      component.artist = { ...mockArtist, followers: 1000 };
      expect(component.formattedFollowers()).toBe('1K');
    });
  });

  describe('Signal State Management', () => {
    beforeEach(() => {
      component.artist = mockArtist;
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
      expect(compiled.querySelector('.follow-overlay')).toBeNull();
      
      // Set hovered to true
      component.isHovered.set(true);
      fixture.detectChanges();
      
      // Should show overlay
      expect(compiled.querySelector('.follow-overlay')).toBeTruthy();
      
      // Set back to false
      component.isHovered.set(false);
      fixture.detectChanges();
      
      // Should hide overlay
      expect(compiled.querySelector('.follow-overlay')).toBeNull();
    });
  });

  describe('CSS Classes and Structure', () => {
    beforeEach(() => {
      component.artist = mockArtist;
      fixture.detectChanges();
    });

    it('should have correct CSS classes applied', () => {
      const cardElement = compiled.querySelector('.artist-card');
      const thumbnailContainer = compiled.querySelector('.thumbnail-container');
      const artistInfo = compiled.querySelector('.artist-info');
      const artistMeta = compiled.querySelector('.artist-meta');
      
      expect(cardElement).toBeTruthy();
      expect(thumbnailContainer).toBeTruthy();
      expect(artistInfo).toBeTruthy();
      expect(artistMeta).toBeTruthy();
    });

    it('should have proper DOM structure', () => {
      const cardElement = compiled.querySelector('.artist-card');
      const thumbnailContainer = cardElement?.querySelector('.thumbnail-container');
      const artistInfo = cardElement?.querySelector('.artist-info');
      
      expect(thumbnailContainer).toBeTruthy();
      expect(artistInfo).toBeTruthy();
      expect(thumbnailContainer?.querySelector('.thumbnail')).toBeTruthy();
      expect(artistInfo?.querySelector('.artist-name')).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing artist gracefully', () => {
      // Don't set artist property
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle empty artist name', () => {
      component.artist = { ...mockArtist, name: '' };
      fixture.detectChanges();
      
      const nameElement = compiled.querySelector('.artist-name');
      expect(nameElement?.textContent?.trim()).toBe('');
    });

    it('should handle invalid thumbnail URL gracefully', () => {
      component.artist = { ...mockArtist, thumbnail: '' };
      fixture.detectChanges();
      
      const thumbnailElement = compiled.querySelector('.thumbnail') as HTMLImageElement;
      expect(thumbnailElement.src).toBe('');
    });
  });
});