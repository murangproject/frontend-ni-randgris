import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './menu-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  navBarItems = Navbar;

  constructor() { }
}
