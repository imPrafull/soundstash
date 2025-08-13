import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ss-chart-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-section.html',
  styleUrls: ['./chart-section.css']
})
export class ChartSectionComponent {
  @Input() title: string = '';
}