import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceStatus, AttendanceTab } from './attendances.enum';

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendances.component.html',
  styles: [
  ]
})
export class AttendancesComponent {
  status: AttendanceStatus = AttendanceStatus.NOT_VISITED;
  currentTab: AttendanceTab = AttendanceTab.AM;

  scheduleModalState: boolean = false;
  attendanceModalState: boolean = false;

  constructor() { }

  openScheduleModal() {
    this.scheduleModalState = true;
  }

  closeScheduleModal() {
    this.scheduleModalState = false;
  }

  openAttendanceModal() {
    this.attendanceModalState = true;
  }

  closeAttendanceModal() {
    this.attendanceModalState = false;
  }

  setTab(tab: string) {
    switch(tab) {
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
}

