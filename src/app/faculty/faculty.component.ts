import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users/users.service';
import { map, tap } from 'rxjs';
import { User } from '../shared/auth.service';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faculty.component.html',
  styles: [
  ]
})
export class FacultyComponent implements OnInit {
  users$ = this.user.getUsers().pipe(
    tap(users => console.log(users)),
    map(users => users.filter(user => !user.is_deleted)),
    tap(users => console.log(JSON.stringify(users))),
    );

  facultyUsers$ = this.users$.pipe(
    map(users => users.filter((user: User) => user.role_type === 'faculty'))
  );

  constructor(private user: UsersService) { }

  ngOnInit(): void {
    this.user.init();
  }

  getLink(id: number) {
    return `/faculties/${id}`;
  }
}
