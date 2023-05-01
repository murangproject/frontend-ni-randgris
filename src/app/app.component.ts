import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './shared/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  toast$ = this.toast.getToast();

  constructor (private router: Router, private toast: ToastService) {}
  title = 'frontend';
  theme: string = '';
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate(['/login']);
    }
    this.theme = localStorage.getItem('theme') ?? 'light';
  }
}

