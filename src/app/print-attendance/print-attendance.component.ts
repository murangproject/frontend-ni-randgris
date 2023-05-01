import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../settings/activity.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users/users.service';
import { switchMap, map, of } from 'rxjs';
import { Schedule } from '../shared/auth.service';

@Component({
  selector: 'app-print-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-attendance.component.html',
  styles: [
  ]
})
export class PrintAttendanceComponent {

  user$ = this.users.getUsers().pipe(
    switchMap(users => of(users.find(user => user.id === this.id))),
    map(user => user?.schedules ?? []),
  );

  getUser$ = this.users.getUsers().pipe(
    switchMap(users => of(users.find(user => user.id === this.id))),
  );

  activities$ = this.user$.pipe(
    switchMap(schedules => this.activities.getActivities().pipe(
      map(activities => activities.filter(activity => activity.type === 'attendance')),
      map(activities => activities.map(activity => JSON.parse(activity.data ?? '') as Schedule)),
      map(activities => activities.map(activity => {
        return {
          ...activity,
          updated_at: new Date(activity.updated_at ?? '').toLocaleString(),
        }
      })),
      map(activities => activities.sort((a, b) => new Date(b.updated_at ?? '').getTime() - new Date(a.updated_at ?? '').getTime())),
    )),
  );
  id: number = -1;

  constructor(private activities: ActivityService, private users: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });

    this.activities.init();
    this.users.init();

    setTimeout(() => {
      window.print();
    }, 1000);
  }

}
