import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';
import { Schedule, User } from '../shared/auth.service';
import { map, switchMap, tap } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { SchedulesService } from '../faculty-schedules/schedules.service';

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

  activeusers$ = this.users$.pipe(
    map(users => users.filter(user => !user.is_deleted)),
  );

  schedules$ = this.activeusers$.pipe(
    switchMap(users => this.schedules.getSchedules().pipe(
      map(schedules => schedules.filter(schedule => !schedule.is_deleted)),
      map(schedules => schedules.filter(schedule => users.find(user => user.id === schedule.user_id)),
      ),
      map(schedules => schedules.filter(schedule => this.isToday(schedule.day ?? ''))),
    )));

  amSchedules$ = this.schedules$.pipe(
    map(schedules => schedules.filter(schedule => this.isAMorPM(schedule.start_time ?? '') === 'AM'))
  );

  pmSchedules$ = this.schedules$.pipe(
    map(schedules => schedules.filter(schedule => this.isAMorPM(schedule.start_time ?? '') === 'PM'))
  );

  activeSchedules$ = this.schedules$.pipe(
    map(schedules => schedules.filter(schedule => this.isWithinCurrentHourSlot(schedule.start_time ?? '') === true)),
  );

  sections$ = this.settings.getSections();
  subjects$ = this.settings.getSubjects();
  rooms$ = this.settings.getRooms();

  totalUsers: number = 0;
  admin: number = 1;
  faculty: number = 0;
  attendanceChecker: number = 0;
  archivedUser: number = 0;

  sections: number = 0;
  subjects: number = 0;
  rooms: number = 0;
  activeSchedules: number = 0;
  notVisited: number = 0;

  constructor(private user: UsersService, private settings: SettingsService, private schedules: SchedulesService) { }

  ngOnInit(): void {
    this.users$.subscribe((users: User[]) => {
      this.totalUsers = users.length;
      this.faculty = users.filter((user: User) => user.role_type === 'faculty').length;
      this.attendanceChecker = users.filter((user: User) => user.role_type === 'attendance_checker').length;
      this.archivedUser = users.filter((user: User) => user.is_deleted).length;
    });

    this.sections$.subscribe((sections: any[]) => {
      this.sections = sections.length;
    });

    this.subjects$.subscribe((subjects: any[]) => {
      this.subjects = subjects.length;
    });

    this.rooms$.subscribe((rooms: any[]) => {
      this.rooms = rooms.length;
    });

    this.activeSchedules$.subscribe((schedules: any[]) => {
      this.activeSchedules = schedules.length;
    });

    this.schedules$.subscribe((schedules: any[]) => {
      this.notVisited = schedules.filter((schedule: Schedule) => schedule.status === 'not_visited' ).length;
    });

    this.user.init();
    this.settings.initSections();
    this.settings.initSubjects();
    this.settings.initRooms();
    this.schedules.init();
  }

  isAMorPM(time: string) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return 'Invalid time format. Please use the 24-hour format (HH:mm).';
    }

    const hours = parseInt(time.split(':')[0], 10);
    return hours < 12 ? 'AM' : 'PM';
  }

  isWithinCurrentHourSlot(time: string) {
    const [inputHour, inputMinutes] = time.split(':').map(Number);
    const currentDate = new Date();
    if (inputHour === currentDate.getHours()) {
      if (inputMinutes <= currentDate.getMinutes()) {
        return true;
      }
    }
    return false;
  }

  isToday(day: string) {
    const today = new Date().getDay();
    switch(day) {
      case 'monday':
        return today === 1;
      case 'tuesday':
        return today === 2;
      case 'wednesday':
        return today === 3;
      case 'thursday':
        return today === 4;
      case 'friday':
        return today === 5;
      case 'saturday':
        return today === 6;
      case 'sunday':
        return today === 0;
      default:
        return false;
    }
  }
}
