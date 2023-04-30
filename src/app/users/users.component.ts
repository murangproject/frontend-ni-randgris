import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTab } from './users.enum';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {

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
  }

  // edit
  openEditUserModal() {
    this.edituserModalState = true;
  }

  closeEditUserModal() {
    this.edituserModalState = false;
  }

  // archive
  openArchiveUserModal() {
    this.archiveUserModalState = true;
  }

  closeArchiveUserModal() {
    this.archiveUserModalState = false;
  }

  // reset password
  openResetPasswordUserModal() {
    this.resetPasswordUserModalState = true;
  }

  closeResetPasswordUserModal() {
    this.resetPasswordUserModalState = false;
  }

  // restore
  openRestoreUserModal() {
    this.restoreUserModalState = true;
  }

  closeRestoreUserModal() {
    this.restoreUserModalState = false;
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
