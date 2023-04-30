import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './menu-list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  title = '';
  navBarItems: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const role = localStorage.getItem('role');
    this.navBarItems = Navbar[role as keyof typeof Navbar];
  }
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activatedRoute.firstChild?.title.subscribe(data => {
        this.title = data ?? '';
      });
    });
  }
}
