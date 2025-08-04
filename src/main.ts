import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home';

@Component({
  selector: 'ss-root',
  standalone: true,
  imports: [HomeComponent],
  template: `
    <ss-home></ss-home>
  `,
})
export class App {}

bootstrapApplication(App);