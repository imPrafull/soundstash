import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ChartSectionComponent } from './chart-section';

// Test host component to test content projection
@Component({
  template: `
    <ss-chart-section [title]="title" [loading]="loading">
      <div class="test-content">Test Content</div>
    </ss-chart-section>
  `
})
class TestHostComponent {
  title = 'Test Section';
  loading = false;
}

describe('ChartSectionComponent', () => {
  let component: ChartSectionComponent;
  let fixture: ComponentFixture<ChartSectionComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSectionComponent],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartSectionComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have default empty title', () => {
      expect(component.title).toBe('');
    });

    it('should have default loading as false', () => {
      expect(component.loading).toBe(false);
    });

    it('should accept title input', () => {
      component.title = 'My Chart Section';
      expect(component.title).toBe('My Chart Section');
    });

    it('should accept loading input', () => {
      component.loading = true;
      expect(component.loading).toBe(true);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      component.title = 'Test Chart Title';
      fixture.detectChanges();
    });

    it('should display the title', () => {
      const titleElement = compiled.querySelector('.section-title');
      expect(titleElement?.textContent?.trim()).toBe('Test Chart Title');
    });

    it('should have correct section structure', () => {
      const sectionElement = compiled.querySelector('.chart-section');
      const titleElement = compiled.querySelector('.section-title');
      
      expect(sectionElement).toBeTruthy();
      expect(titleElement).toBeTruthy();
    });

    it('should render title as h2 element', () => {
      const titleElement = compiled.querySelector('h2.section-title');
      expect(titleElement).toBeTruthy();
      expect(titleElement?.tagName.toLowerCase()).toBe('h2');
    });
  });

  describe('Content Projection', () => {
    beforeEach(async () => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('should project content correctly', () => {
      const projectedContent = hostFixture.nativeElement.querySelector('.test-content');
      expect(projectedContent).toBeTruthy();
      expect(projectedContent?.textContent?.trim()).toBe('Test Content');
    });

    it('should display title from host component', () => {
      const titleElement = hostFixture.nativeElement.querySelector('.section-title');
      expect(titleElement?.textContent?.trim()).toBe('Test Section');
    });

    it('should update title when host component changes', () => {
      hostComponent.title = 'Updated Title';
      hostFixture.detectChanges();
      
      const titleElement = hostFixture.nativeElement.querySelector('.section-title');
      expect(titleElement?.textContent?.trim()).toBe('Updated Title');
    });

    it('should update loading state when host component changes', () => {
      hostComponent.loading = true;
      hostFixture.detectChanges();
      
      const chartSectionComponent = hostFixture.debugElement.children[0].componentInstance;
      expect(chartSectionComponent.loading).toBe(true);
    });
  });

  describe('Signal State Management', () => {
    it('should initialize isHovered signal as false', () => {
      expect(component.isHovered()).toBe(false);
    });

    it('should update isHovered signal correctly', () => {
      component.isHovered.set(true);
      expect(component.isHovered()).toBe(true);
      
      component.isHovered.set(false);
      expect(component.isHovered()).toBe(false);
    });

    it('should maintain signal state independently', () => {
      const initialState = component.isHovered();
      component.isHovered.set(!initialState);
      expect(component.isHovered()).toBe(!initialState);
    });
  });

  describe('Input Property Changes', () => {
    it('should handle empty title gracefully', () => {
      component.title = '';
      fixture.detectChanges();
      
      const titleElement = compiled.querySelector('.section-title');
      expect(titleElement?.textContent?.trim()).toBe('');
    });

    it('should handle long titles', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines';
      component.title = longTitle;
      fixture.detectChanges();
      
      const titleElement = compiled.querySelector('.section-title');
      expect(titleElement?.textContent?.trim()).toBe(longTitle);
    });

    it('should handle special characters in title', () => {
      const specialTitle = '🎵 Top Tracks & Artists 🎶';
      component.title = specialTitle;
      fixture.detectChanges();
      
      const titleElement = compiled.querySelector('.section-title');
      expect(titleElement?.textContent?.trim()).toBe(specialTitle);
    });

    it('should toggle loading state correctly', () => {
      expect(component.loading).toBe(false);
      
      component.loading = true;
      expect(component.loading).toBe(true);
      
      component.loading = false;
      expect(component.loading).toBe(false);
    });
  });

  describe('Component Integration', () => {
    it('should work with multiple instances', () => {
      const fixture1 = TestBed.createComponent(ChartSectionComponent);
      const fixture2 = TestBed.createComponent(ChartSectionComponent);
      
      const component1 = fixture1.componentInstance;
      const component2 = fixture2.componentInstance;
      
      component1.title = 'Section 1';
      component2.title = 'Section 2';
      
      fixture1.detectChanges();
      fixture2.detectChanges();
      
      expect(component1.title).toBe('Section 1');
      expect(component2.title).toBe('Section 2');
      expect(component1.title).not.toBe(component2.title);
    });

    it('should maintain independent signal states across instances', () => {
      const fixture1 = TestBed.createComponent(ChartSectionComponent);
      const fixture2 = TestBed.createComponent(ChartSectionComponent);
      
      const component1 = fixture1.componentInstance;
      const component2 = fixture2.componentInstance;
      
      component1.isHovered.set(true);
      component2.isHovered.set(false);
      
      expect(component1.isHovered()).toBe(true);
      expect(component2.isHovered()).toBe(false);
    });
  });
});