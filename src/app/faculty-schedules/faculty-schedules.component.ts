import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../users/users.service';
import { map, tap } from 'rxjs';
import { Schedule, User } from '../shared/auth.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { SchedulesService } from './schedules.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-faculty-schedules',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './faculty-schedules.component.html',
  styles: [
  ]
})
export class FacultySchedulesComponent implements OnInit {

  schedules$ = this.schedule.getSchedules().pipe(
    map(schedules => schedules.filter(schedule => !schedule.is_deleted)),
    map(schedules => schedules.filter((schedule: Schedule) => schedule.user_id === this.id)),
  );

  filteredSchedules$ = this.schedules$.pipe(
    map((schedules: Schedule[]) => schedules?.filter((schedule: Schedule) => !schedule.is_deleted)),
    map((schedules: Schedule[]) => schedules?.filter((schedule: Schedule) => schedule.semester?.includes(this.filteredSemester)))
  );

  sections$ = this.settings.getSections().pipe(
    map(sections => sections.filter(section => !section.is_deleted))
  );

  subjects$ = this.settings.getSubjects().pipe(
    map(subjects => subjects.filter(subject => !subject.is_deleted))
  );

  rooms$ = this.settings.getRooms().pipe(
    map(rooms => rooms.filter(room => !room.is_deleted))
  );

  // Modal States
  createScheduleModalState: boolean = false;
  editScheduleModalState: boolean = false;
  archiveScheduleModalState: boolean = false;


  id: number = -1;
  selectedScheduleId: number = -1;

  filteredSemester: string = '';

  form: any = {
    day: '',
    start_time: '',
    end_time: '',
    semester: '',
    section: '',
    subject: '',
    room: '',
  }
  constructor(private activatedRoute: ActivatedRoute, private formBulder: UntypedFormBuilder, private schedule: SchedulesService, private settings: SettingsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });

    this.form = this.formBulder.group({
      day: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      room: ['', [Validators.required]],
    });

    this.schedule.init();
    this.settings.initSections();
    this.settings.initSubjects();
    this.settings.initRooms();
  }

  // Modal Functions

  // Create
  openCreateScheduleModal() {
    this.createScheduleModalState = true;
  }

  closeCreateScheduleModal() {
    this.createScheduleModalState = false;
    this.form.reset();
  }

  onSubmitCreateSchedule() {
    if (this.form.invalid) return;

    this.schedule.createSchedule(this.id, this.form.value).subscribe((response: any) => {
      this.schedule.init();
      this.closeCreateScheduleModal();
    });
  }

  // Edit
  openEditScheduleModal(scheduleId: number) {
    this.selectedScheduleId = scheduleId;
    this.editScheduleModalState = true;

    this.filteredSchedules$.subscribe((schedules: Schedule[]) => {
      this.form.patchValue(schedules.find((schedule: Schedule) => schedule.id === scheduleId));
      console.log(this.form.value);
    });
  }

  closeEditScheduleModal() {
    this.selectedScheduleId = -1;
    this.editScheduleModalState = false;
    this.form.reset();
  }

  onSubmitEditSchedule() {
    if (this.form.invalid) return;

    this.schedule.updateSchedule(this.selectedScheduleId, this.form.value).subscribe((response: any) => {
      this.closeEditScheduleModal();
      this.form.reset();
      this.schedule.init();
    });
  }

  // Archive
  openArchiveScheduleModal(scheduleId: number) {
    this.selectedScheduleId = scheduleId;
    this.archiveScheduleModalState = true;
  }

  closeArchiveScheduleModal() {
    this.selectedScheduleId = -1;
    this.archiveScheduleModalState = false;
  }

  onSubmitArchiveSchedule() {
    this.schedule.archiveSchedule(this.selectedScheduleId).subscribe((response: any) => {
      this.closeArchiveScheduleModal();
      this.schedule.init();
    });
  }

  setFilteredSemester(semester: string) {
    this.filteredSemester = semester;
    this.schedule.init();
  }
}
