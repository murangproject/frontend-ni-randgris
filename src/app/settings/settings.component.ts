import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsTab } from './settings.enum';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent {

  currentTab: SettingsTab = SettingsTab.SECTION;

  // Modal State
  createSemesterModalState: boolean = false;
  editSemesterModalState: boolean = false;
  archiveSemesterModalState: boolean = false;

  createSectionModalState: boolean = false;
  editSectionModalState: boolean = false;
  archiveSectionModalState: boolean = false;

  createSubjectModalState: boolean = false;
  editSubjectModalState: boolean = false;
  archiveSubjectModalState: boolean = false;

  createRoomModalState: boolean = false;
  editRoomModalState: boolean = false;
  archiveRoomModalState: boolean = false;

  // Modal Functions

  // Create Semester
  openCreateSemesterModal() {
    this.createSemesterModalState = true;
  }

  closeCreateSemesterModal() {
    this.createSemesterModalState = false;
  }

  // Edit Semester
  openEditSemesterModal() {
    this.editSemesterModalState = true;
  }

  closeEditSemesterModal() {
    this.editSemesterModalState = false;
  }

  // Archive Semester
  openArchiveSemesterModal() {
    this.archiveSemesterModalState = true;
  }

  closeArchiveSemesterModal() {
    this.archiveSemesterModalState = false;
  }

  // Create Section
  openCreateSectionModal() {
    this.createSectionModalState = true;
  }

  closeCreateSectionModal() {
    this.createSectionModalState = false;
  }

  // Edit Section
  openEditSectionModal() {
    this.editSectionModalState = true;
  }

  closeEditSectionModal() {
    this.editSectionModalState = false;
  }

  // Archive Section
  openArchiveSectionModal() {
    this.archiveSectionModalState = true;
  }

  closeArchiveSectionModal() {
    this.archiveSectionModalState = false;
  }

  // Create Subject
  openCreateSubjectModal() {
    this.createSubjectModalState = true;
  }

  closeCreateSubjectModal() {
    this.createSubjectModalState = false;
  }

  // Edit Subject
  openEditSubjectModal() {
    this.editSubjectModalState = true;
  }

  closeEditSubjectModal() {
    this.editSubjectModalState = false;
  }

  // Archive Subject
  openArchiveSubjectModal() {
    this.archiveSubjectModalState = true;
  }

  closeArchiveSubjectModal() {
    this.archiveSubjectModalState = false;
  }

  // Create Room
  openCreateRoomModal() {
    this.createRoomModalState = true;
  }

  closeCreateRoomModal() {
    this.createRoomModalState = false;
  }

  // Edit Room
  openEditRoomModal() {
    this.editRoomModalState = true;
  }

  closeEditRoomModal() {
    this.editRoomModalState = false;
  }

  // Archive Room
  openArchiveRoomModal() {
    this.archiveRoomModalState = true;
  }

  closeArchiveRoomModal() {
    this.archiveRoomModalState = false;
  }

  setTab(tab: string) {
    switch (tab) {
      case 'SECTION':
        this.currentTab = SettingsTab.SECTION;
        break;
      case 'SUBJECT':
        this.currentTab = SettingsTab.SUBJECT;
        break;
      case 'ROOM':
        this.currentTab = SettingsTab.ROOM;
        break;
      default:
        this.currentTab = SettingsTab.SECTION;
    }
  }
}
