import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from '../key/key.component';
import { Room, SettingsService } from '../settings/settings.service';
import { map, switchMap, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { SchedulesService } from '../faculty-schedules/schedules.service';
import { RoomStatus } from '../key/key.model';
import { ActivityService } from '../settings/activity.service';
import { User } from '../shared/auth.service';

@Component({
  selector: 'app-keys',
  standalone: true,
  imports: [CommonModule, KeyComponent],
  templateUrl: './keys.component.html',
  styles: [
  ]
})
export class KeysComponent implements OnInit {
  roomKeyModalState: boolean = false;

  users$ = this.users.getUsers();

  activities$ = this.activities.getActivities();

  selectedActivities$ = this.activities$.pipe(
    map(activities => activities.filter(activity => activity.source === this.selectedRoomName)),
    map(activities => activities.map(activity => JSON.parse(activity?.data ?? '') as Room)),
    map(activities => activities.map(activity => {
      return {
        ...activity,
        borrow_time: this.format12HourTime(new Date(activity?.borrow_time ?? '')),
        return_time: this.format12HourTime(new Date(activity?.return_time ?? '')),
      }
    })),
  );

  schedules$ = this.schedules.getSchedules();

  selectedSchedule$ = this.schedules$.pipe(
    map(schedules => schedules.filter(schedule => !schedule.is_deleted)),
    map(schedules => schedules.filter(schedule => this.isWithinCurrentHourSlot(schedule.start_time ?? ''))),
    map(schedules => schedules.find(schedule => (schedule?.room) === this.selectedRoomName)),
  );

  rooms$ = this.settings.getRooms().pipe(
    map(rooms => rooms.filter(room => !room.is_deleted)),
  );

  selectedRoom$ = this.rooms$.pipe(
    map(rooms => rooms.find(room => room.room_name === this.selectedRoomName)),
  );

  roomActivitiesModalState: boolean = false;

  selectedRoomName: string = '';
  selectedRoomId: number = -1;

  currentUser: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : {};

  constructor(private activities: ActivityService, private settings: SettingsService, private schedules: SchedulesService, private users: UsersService) { }
  ngOnInit(): void {
    this.settings.initRooms();
    this.schedules.init();
    this.activities.init();
    this.users.init();
  }

  openRoomActivitiesModal() {
    this.roomActivitiesModalState = true;
    this.activities.init();
  }

  closeRoomActivitiesModal() {
    this.roomActivitiesModalState = false;
  }

  openRoomKeyModal(name: string = '', id: number = -1) {
    this.selectedRoomName = name;
    this.selectedRoomId = id;
    this.roomKeyModalState = true;
    this.settings.initRooms();
    this.schedules.init();
  }

  closeRoomKeyModal() {
    this.selectedRoomName = '';
    this.selectedRoomId = -1;
    this.roomKeyModalState = false;
  }

  borrow() {
    this.settings.borrowRoom(this.selectedRoomId).subscribe({
      next: () => {
        this.settings.initRooms();
        this.closeRoomKeyModal();
      }
    });
  }

  returnRoom() {
    this.settings.returnRoom(this.selectedRoomId).subscribe({
      next: () => {
        this.settings.initRooms();
        this.closeRoomKeyModal();
      }
    });
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

  getStatus(roomStatus: string) {
    switch (roomStatus) {
      case 'available':
        return RoomStatus.AVAILABLE;
      case 'occupied':
        return RoomStatus.BORROWED;
      default:
        return RoomStatus.AVAILABLE;
    }
  }
  format12HourTime(d: Date) {
    const date = new Date(d.toString() + ' UTC');
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let minStr = '';
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minstr = '';
    minstr = minutes < 10 ? '0' + minutes : minutes + '';
    const strTime = hours + ':' + minstr + ' ' + ampm;

    return strTime;
  }

  openModal(room: Room) {
    if (!room.borrower || room.borrower === this.currentUser.id) {
      this.openRoomKeyModal(room.room_name, room.id);
    }
  }

  getUser(id: number) {
    return this.users$.pipe(
      map(users => users.find(user => user.id === id)),
    );
  }
}
