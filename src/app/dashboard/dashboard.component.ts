import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';
import { User } from '../shared/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  users$ = this.user.getUsers();

  totalUsers: number = 0;
  admin: number = 1;
  faculty: number = 0;
  attendanceChecker: number = 0;
  archivedUser: number = 0;

  constructor(private user: UsersService) { }

  ngOnInit(): void {
    this.users$.subscribe((users: User[]) => {
      this.totalUsers = users.length;
      this.faculty = users.filter((user: User) => user.role_type === 'faculty').length;
      this.attendanceChecker = users.filter((user: User) => user.role_type === 'attendance_checker').length;
      this.archivedUser = users.filter((user: User) => user.is_deleted).length;
    });

    this.user.init();
  }
}
