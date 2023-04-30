import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceStatus, AttendanceTab } from './attendances.enum';
import { UsersService } from '../users/users.service';
import { tap, map, switchMap, combineLatest } from 'rxjs';
import { SchedulesService } from '../faculty-schedules/schedules.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Schedule } from '../shared/auth.service';

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './attendances.component.html',
  styles: [
  ]
})
export class AttendancesComponent implements OnInit {
  users$ = this.user.getUsers().pipe(
    map(users => users.filter(user => !user.is_deleted)),
  );

  attendanceForm: any = this.formBuilder.group({
    comment: [''],
  });

  filteredSemester: string = '';

  schedules$ = this.users$.pipe(
    switchMap(users => this.schedules.getSchedules().pipe(
      map(schedules => schedules.filter(schedule => !schedule.is_deleted)),
      map((schedules: Schedule[]) => schedules?.filter((schedule: Schedule) => schedule.semester?.includes(this.filteredSemester))),
      map(schedules => schedules.filter(schedule => users.find(user => user.id === schedule.user_id)),
      ),
      map(schedules => schedules.filter(schedule => this.isToday(schedule.day ?? ''))),
      tap(schedules => console.log(schedules)),
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

  status: AttendanceStatus = AttendanceStatus.NOT_VISITED;
  currentTab: AttendanceTab = AttendanceTab.AM;

  scheduleModalState: boolean = false;
  attendanceModalState: boolean = false;

  selectedSchedule$ = this.schedules$.pipe(
    map(schedules => schedules.find(schedule => schedule.id === this.selectedScheduleId))
  );

  selectedScheduleId: number = -1;

  constructor(private user: UsersService, private schedules: SchedulesService, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.user.init();
    this.schedules.init();
  }

  openScheduleModal() {
    this.scheduleModalState = true;
  }

  closeScheduleModal() {
    this.scheduleModalState = false;
  }

  openAttendanceModal(id: number) {
    this.selectedScheduleId = id;
    this.attendanceModalState = true;

    this.schedules$.subscribe({
      next: (schedules) => {
        this.attendanceForm.patchValue(schedules.find(schedule => schedule.id === this.selectedScheduleId));
      }
    });
    this.schedules.init();
    this.user.init();
  }

  closeAttendanceModal() {
    this.selectedScheduleId = -1;
    this.attendanceModalState = false;
    this.attendanceForm.reset();
  }

  onSubmitAttendanceModal() {
    this.schedules.updateScheduleStatus(this.selectedScheduleId, { comment: this.attendanceForm.value.comment }).subscribe(
      {
        next: () => {
          this.schedules.init();
          this.user.init();
          this.closeAttendanceModal();
        }
      }
    );
  }

  setTab(tab: string) {
    switch (tab) {
      case 'am':
        this.currentTab = AttendanceTab.AM;
        break;
      case 'pm':
        this.currentTab = AttendanceTab.PM;
        break;
      case 'active':
        this.currentTab = AttendanceTab.ACTIVE;
        break;
      default:
        this.currentTab = AttendanceTab.AM;
        break;
    }
  }

  onClickPresent() {
    this.schedules.updateScheduleStatus(this.selectedScheduleId, { status: 'present' }).subscribe(
      {
        next: () => {
          this.schedules.init();
          this.user.init();
        }
      }
    );
  }

  onClickAbsent() {
    this.schedules.updateScheduleStatus(this.selectedScheduleId, { status: 'absent' }).subscribe(
      {
        next: () => {
          this.schedules.init();
          this.user.init();
        }
      }
    );
  }


  getStatus(status: string) {
    switch (status) {
      case 'not_visited':
        return 'Not Visited';
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      default:
        return 'Not Visited';
    }
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

  setFilteredSemester(semester: string) {
    this.filteredSemester = semester;
    this.schedules.init();
  }
}

