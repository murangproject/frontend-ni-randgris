import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../settings/activity.service';
import { SchedulesService } from '../faculty-schedules/schedules.service';
import { UsersService } from '../users/users.service';
import { last, map, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Schedule } from '../shared/auth.service';

@Component({
  selector: 'app-faculty-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faculty-attendance.component.html',
  styles: [
  ]
})
export class FacultyAttendanceComponent implements OnInit {
  user$ = this.users.getUsers().pipe(
    map(users => users.find(user => user.id === this.id)),
    map(user => user?.schedules ?? []),
  );

  activities$ = this.user$.pipe(
    map(schedules => schedules.map(schedule => schedule.id)),
    switchMap(schedules => this.activities.getActivities().pipe(
      map(activities => activities.filter(activity => schedules.includes(parseInt(activity?.source ?? '-1')))),
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
  }

  getLink() {
    return `/print-attendance/${this.id}`;
  }
}
