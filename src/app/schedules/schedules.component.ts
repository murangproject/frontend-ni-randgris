import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, map, switchMap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { SchedulesService } from '../faculty-schedules/schedules.service';
import { Schedule } from '../shared/auth.service';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedules.component.html',
  styles: [
  ]
})
export class SchedulesComponent implements OnInit {
  users$ = this.user.getUsers().pipe(
    map(users => users.filter(user => !user.is_deleted)),
  );

  filteredSemester: string = '';

  schedules$ = this.schedules.getSchedules().pipe(
    map(schedules => schedules.filter(schedule => !schedule.is_deleted)),
    map((schedules: Schedule[]) => schedules?.filter((schedule: Schedule) => schedule.semester?.includes(this.filteredSemester))),
    map(schedules => schedules.filter(schedule => this.id === schedule.user_id),
    ),
    map(schedules => schedules.filter(schedule => this.isToday(schedule.day ?? ''))),
  );

  activeSchedules$ = this.schedules$;

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
    switch (day) {
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

  id: number = -1;

  constructor(private user: UsersService, private schedules: SchedulesService) { }
  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    this.user.init();
    this.schedules.init();
  }

  setFilteredSemester(semester: string) {
    this.filteredSemester = semester;
    this.schedules.init();
  }
}

