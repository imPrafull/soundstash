import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
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

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});