import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTab } from './users.enum';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { map } from 'rxjs';
import { User } from '../shared/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  users$ = this.user.getUsers().pipe(
    map(users => users.filter(user => user.role_type !== 'admin'))
  );

  allUsers$ = this.users$.pipe(
    map(users => users.filter((user: User) => !user.is_deleted))
  );

  facultyUsers$ = this.allUsers$.pipe(
    map(users => users.filter((user: User) => user.role_type === 'faculty'))
  );

  attendanceCheckerUsers$ = this.allUsers$.pipe(
    map(users => users.filter((user: User) => user.role_type === 'attendance_checker'))
  );

  archivedUsers$ = this.users$.pipe(
    map(users => users.filter((user: User) => user.is_deleted))
  )

  form: any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    role_type: ''
  }

  selectedUserId: number = -1;

  constructor(private formBuilder: UntypedFormBuilder, private user: UsersService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      middle_name: [''],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role_type: ['', [Validators.required]]
    });

    this.user.init();
  }

  // Tab state
  currentTab: UserTab = UserTab.ALL;

  // Modal states
  createUserModalState: boolean = false;
  edituserModalState: boolean = false;
  archiveUserModalState: boolean = false;
  resetPasswordUserModalState: boolean = false;
  restoreUserModalState: boolean = false;

  // Modal functions

  // create
  openCreateUserModal() {
    this.createUserModalState = true;
  }

  closeCreateUserModal() {
    this.createUserModalState = false;
    this.form.reset();
  }

  onSubmitCreateUserModal() {
    if (this.form.invalid) return;

    this.user.createUser(this.form.value).subscribe({
      next: data => {
        console.log(data);
        this.closeCreateUserModal();
        this.user.init();
      }
    });
  }

  // edit
  openEditUserModal(id: number) {
    this.selectedUserId = id;
    this.edituserModalState = true;
    this.users$.subscribe({
      next: users => {
        this.form.patchValue(users.find((user: User) => user.id === id));
      }
    });
  }

  closeEditUserModal() {
    this.selectedUserId = -1;
    this.edituserModalState = false;
  }

  onSubmitEditUserModal() {
    if (this.form.invalid) return;

    this.user.editUser(this.selectedUserId, this.form.value).subscribe({
      next: data => {
        console.log(data);
        this.closeEditUserModal();
        this.user.init();
      }
    });
  }

  // archive
  openArchiveUserModal(id: number) {
    this.selectedUserId = id;
    this.archiveUserModalState = true;
  }

  closeArchiveUserModal() {
    this.archiveUserModalState = false;
    this.selectedUserId = -1;
  }

  onSubmitArchiveUserModal() {
    this.user.archiveUser(this.selectedUserId).subscribe({
      next: data => {
        console.log(data);
        this.closeArchiveUserModal();
        this.user.init();
      }
    });
  }

  // reset password
  openResetPasswordUserModal(id: number) {
    this.selectedUserId = id;
    this.resetPasswordUserModalState = true;
  }

  closeResetPasswordUserModal() {
    this.selectedUserId = -1;
    this.resetPasswordUserModalState = false;
  }

  onSubmitResetPasswordUserModal() {
    this.user.resetUser(this.selectedUserId).subscribe({
      next: data => {
        console.log(data);
        this.closeResetPasswordUserModal();
        this.user.init();
      }
    });
  }

  // restore
  openRestoreUserModal(id: number) {
    this.selectedUserId = id;
    this.restoreUserModalState = true;
  }

  closeRestoreUserModal() {
    this.selectedUserId = -1;
    this.restoreUserModalState = false;
  }

  onSubmitRestoreUserModal() {
    this.user.restoreUser(this.selectedUserId).subscribe({
      next: data => {
        console.log(data);
        this.closeRestoreUserModal();
        this.user.init();
      }
    });
  }

  // Set tab state
  setTab(tab: string) {
    switch (tab) {
      case 'all':
        this.currentTab = UserTab.ALL;
        break;
      case 'faculty':
        this.currentTab = UserTab.FACULTY;
        break;
      case 'attendance_checker':
        this.currentTab = UserTab.ATTENDANCE_CHECKER;
        break;
      case 'archived':
        this.currentTab = UserTab.ARCHIVED;
        break;
      default:
        this.currentTab = UserTab.ALL;
        break;
    }
  }
}
