import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsTab } from './settings.enum';
import { Room, Section, SettingsService, Subject } from './settings.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ToastService } from '../shared/toast.service';
import { withOptions } from 'tailwindcss/plugin';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {
  sections$ = this.settings.getSections().pipe(
    map(sections => sections.filter(section => !section.is_deleted))
  );
  subjects$ = this.settings.getSubjects().pipe(
    map(subjects => subjects.filter(subject => !subject.is_deleted))
  );
  rooms$ = this.settings.getRooms().pipe(
    map(rooms => rooms.filter(room => !room.is_deleted))
  );

  sectionForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  });

  subjectForm = this.formBuilder.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]]
  });

  roomForm = this.formBuilder.group({
    room_name: ['', [Validators.required]],
  });

  constructor(private settings: SettingsService, private formBuilder: UntypedFormBuilder, private toast: ToastService) { }

  ngOnInit(): void {
    this.settings.initSections();
    this.settings.initSubjects();
    this.settings.initRooms();
  }

  selectedSectionId: number = -1;
  selectedSubjectId: number = -1;
  selectedRoomId: number = -1;

  currentTab: SettingsTab = SettingsTab.SECTION;

  // Modal State
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

  // Create Section
  openCreateSectionModal() {
    this.createSectionModalState = true;
    this.sectionForm.reset();
  }

  closeCreateSectionModal() {
    this.createSectionModalState = false;
    this.sectionForm.reset();
  }

  onSubmitCreateSection() {
    if (this.sectionForm.invalid) {
      this.toast.showToast('Please fill out all the required fields!', false);
      return;
    }

    this.settings.createSection(this.sectionForm.value).subscribe(
      {
        next: data => {
          this.toast.showToast('Section created successfully!', true);
          this.settings.initSections();
          this.closeCreateSectionModal();
        },
        error: err => {
          this.toast.showToast(err.error.message, false);
        }
      }
    );
  }

  // Edit Section
  openEditSectionModal(id: number) {
    this.selectedSectionId = id;
    this.editSectionModalState = true;
    this.sections$.subscribe((sections: Section[]) => {
      this.sectionForm.patchValue(sections.find((section: Section) => section?.id === id) ?? {});
    });
  }

  closeEditSectionModal() {
    this.selectedSectionId = -1;
    this.editSectionModalState = false;
    this.sectionForm.reset();
  }

  onSubmitEditSection() {
    if (this.sectionForm.invalid) {
      this.toast.showToast('Please fill out all the required fields!', false);
      return;
    }

    this.settings.updateSection(this.selectedSectionId, this.sectionForm.value).subscribe({
      next: data => {
        this.toast.showToast('Section updated successfully!', true);
        this.settings.initSections();
        this.closeEditSectionModal();
      },
      error: err => {
        this.toast.showToast(err.error.message, false);
      }
    });
  }

  // Archive Section
  openArchiveSectionModal(id: number) {
    this.selectedSectionId = id;
    this.archiveSectionModalState = true;
  }

  closeArchiveSectionModal() {
    this.selectedSectionId = -1;
    this.archiveSectionModalState = false;
  }

  onSubmitArchiveSection() {
    this.settings.deleteSection(this.selectedSectionId).subscribe({
      next: data => {
        this.toast.showToast('Section archived successfully!', true);
        this.closeArchiveSectionModal();
        this.settings.initSections();
      },
      error: err => {
        this.toast.showToast(err.error.message, false);
      }
    })
  }

  // Create Subject
  openCreateSubjectModal() {
    this.createSubjectModalState = true;
    this.subjectForm.reset();
  }

  closeCreateSubjectModal() {
    this.createSubjectModalState = false;
    this.subjectForm.reset();
  }

  onSubmitCreateSubject() {
    if (this.subjectForm.invalid) {
      this.toast.showToast('Please fill out all the required fields!', false);
      return;
    }

    this.settings.createSubject(this.subjectForm.value).subscribe({
      next: data => {
        this.toast.showToast('Subject created successfully!', true);
        this.settings.initSubjects();
        this.closeCreateSubjectModal();
      },
      error: err => {
        this.toast.showToast(err.error.message, false);
      }
    });
  }

  // Edit Subject
  openEditSubjectModal(id: number) {
    this.selectedSubjectId = id;
    this.editSubjectModalState = true;
    this.subjects$.subscribe((subjects: Subject[]) => {
      this.subjectForm.patchValue(subjects.find((subject: Subject) => subject?.id === id) ?? {});
    });
  }

  closeEditSubjectModal() {
    this.selectedSubjectId = -1;
    this.editSubjectModalState = false;
    this.subjectForm.reset();
  }

  onSubmitEditSubject() {
    if (this.subjectForm.invalid) {
      this.toast.showToast('Please fill out all the required fields!', false);
      return;
    }

    this.settings.updateSubject(this.selectedSubjectId, this.subjectForm.value).subscribe({
      next: data => {
        this.toast.showToast('Subject updated successfully!', true);
        this.settings.initSubjects();
        this.closeEditSubjectModal();
      },
      error: err => {
        this.toast.showToast(err.error.message, false);
      }
    });
  }

  // Archive Subject
  openArchiveSubjectModal(id: number) {
    this.selectedSubjectId = id;
    this.archiveSubjectModalState = true;
  }

  closeArchiveSubjectModal() {
    this.selectedSubjectId = -1;
    this.archiveSubjectModalState = false;
  }

  onSubmitArchiveSubject() {
    this.settings.deleteSubject(this.selectedSubjectId).subscribe({
      next: data => {
        this.toast.showToast('Subject archived successfully!', true);
        this.closeArchiveSubjectModal();
        this.settings.initSubjects();
      },
      error: err => {
        this.toast.showToast(err.error.message, false);
      }
    });
  }

  // Create Room
  openCreateRoomModal() {
    this.createRoomModalState = true;
    this.roomForm.reset();
  }

  closeCreateRoomModal() {
    this.createRoomModalState = false;
    this.roomForm.reset();
  }

  onSubmitCreateRoom() {
    if (this.roomForm.invalid) {
      this.toast.showToast('Please fill out all the required fields!', false);
      return;
    }

    this.settings.createRoom(this.roomForm.value).subscribe({
      next: data => {
        this.toast.showToast('Room created successfully!', true);
        this.settings.initRooms();
        this.closeCreateRoomModal();
      },
      error: err => {
        this.toast.showToast(err.error.message, false);
      }
    });
  }

  // Edit Room
  openEditRoomModal(id: number) {
    this.selectedRoomId = id;
    this.editRoomModalState = true;
    this.rooms$.subscribe((rooms: Room[]) => {
      this.roomForm.patchValue(rooms.find((room: Room) => room?.id === id) ?? {});
    });
  }

  closeEditRoomModal() {
    this.selectedRoomId = -1;
    this.editRoomModalState = false;
    this.roomForm.reset();
  }

  onSubmitEditRoom() {
    if (this.roomForm.invalid) {
      this.toast.showToast('Please fill out all the required fields!', false);
      return;
    }

    this.settings.updateRoom(this.selectedRoomId, this.roomForm.value).subscribe(
      {
        next: data => {
          this.toast.showToast('Room updated successfully!', true);
          this.settings.initRooms();
          this.closeEditRoomModal();
        },
        error: err => {
          this.toast.showToast(err.error.message, false);
        }
      }
    );
  }

  // Archive Room
  openArchiveRoomModal(id: number) {
    this.selectedRoomId = id;
    this.archiveRoomModalState = true;
  }

  closeArchiveRoomModal() {
    this.selectedRoomId = -1;
    this.archiveRoomModalState = false;
  }

  onSubmitArchiveRoom() {
    this.settings.deleteRoom(this.selectedRoomId).subscribe(
      {
        next: data => {
          this.toast.showToast('Room archived successfully!', true);
          this.closeArchiveRoomModal();
          this.settings.initRooms();
        },
        error: err => {
          this.toast.showToast(err.error.message, false);
        }
      }
    );
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
