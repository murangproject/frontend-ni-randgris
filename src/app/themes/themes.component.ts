import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Corporate = 'corporate',
  Cupcake = 'cupcake',
  Retro = 'retro',
  Bumblebee = 'bumblebee',
  Synthwave = 'synthwave',
  Lofi = 'lofi',
  Fantasy = 'fantasy',
  Dracula = 'dracula',
  Night = 'night',
  Luxury = 'luxury',
  Business = 'business',
}

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './themes.component.html',
  styles: [
  ]
})
export class ThemesComponent implements OnInit {
  themes: string[] = Object.values(Theme);

  selectedTheme: string = 'light';

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('theme') ?? 'light';
  }

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    window.location.reload();
    this.selectedTheme = theme;
  }
}
