import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsTab } from './settings.enum';
import { Room, Section, SettingsService, Subject } from './settings.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';

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

  constructor(private settings: SettingsService, private formBuilder: UntypedFormBuilder) { }

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
  }

  closeCreateSectionModal() {
    this.createSectionModalState = false;
    this.sectionForm.reset();
  }

  onSubmitCreateSection() {
    this.settings.createSection(this.sectionForm.value).subscribe(data => {
      this.settings.initSections();
      this.closeCreateSectionModal();
    });
  }

  // Edit Section
  openEditSectionModal(id: number) {
    this.selectedSectionId = id;
    this.editSectionModalState = true;
    this.sections$.subscribe((sections: Section[]) => {
      this.sectionForm.patchValue(sections.find((section: Section) => section?.id === id) ?? {});
      console.log(this.sectionForm.value);
    });
  }

  closeEditSectionModal() {
    this.selectedSectionId = -1;
    this.editSectionModalState = false;
    this.sectionForm.reset();
  }

  onSubmitEditSection() {
    this.settings.updateSection(this.selectedSectionId, this.sectionForm.value).subscribe(data => {
      this.settings.initSections();
      this.closeEditSectionModal();
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
    this.settings.deleteSection(this.selectedSectionId).subscribe(data => {
      this.closeArchiveSectionModal();
      this.settings.initSections();
    });
  }

  // Create Subject
  openCreateSubjectModal() {
    this.createSubjectModalState = true;
  }

  closeCreateSubjectModal() {
    this.createSubjectModalState = false;
    this.subjectForm.reset();
  }

  onSubmitCreateSubject() {
    this.settings.createSubject(this.subjectForm.value).subscribe(data => {
      this.settings.initSubjects();
      this.closeCreateSubjectModal();
    });
  }

  // Edit Subject
  openEditSubjectModal(id: number) {
    this.selectedSubjectId = id;
    this.editSubjectModalState = true;
    this.subjects$.subscribe((subjects: Subject[]) => {
      this.subjectForm.patchValue(subjects.find((subject: Subject) => subject?.id === id) ?? {});
      console.log(this.subjectForm.value);
    });
  }

  closeEditSubjectModal() {
    this.selectedSubjectId = -1;
    this.editSubjectModalState = false;
    this.subjectForm.reset();
  }

  onSubmitEditSubject() {
    this.settings.updateSubject(this.selectedSubjectId, this.subjectForm.value).subscribe(data => {
      this.settings.initSubjects();
      this.closeEditSubjectModal();
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
    this.settings.deleteSubject(this.selectedSubjectId).subscribe(data => {
      this.closeArchiveSubjectModal();
      this.settings.initSubjects();
    });
  }

  // Create Room
  openCreateRoomModal() {
    this.createRoomModalState = true;
  }

  closeCreateRoomModal() {
    this.createRoomModalState = false;
    this.roomForm.reset();
  }

  onSubmitCreateRoom() {
    this.settings.createRoom(this.roomForm.value).subscribe(data => {
      this.settings.initRooms();
      this.closeCreateRoomModal();
    });
  }

  // Edit Room
  openEditRoomModal(id: number) {
    this.selectedRoomId = id;
    this.editRoomModalState = true;
    this.rooms$.subscribe((rooms: Room[]) => {
      this.roomForm.patchValue(rooms.find((room: Room) => room?.id === id) ?? {});
      console.log(this.roomForm.value);
    });
  }

  closeEditRoomModal() {
    this.selectedRoomId = -1;
    this.editRoomModalState = false;
    this.roomForm.reset();
  }

  onSubmitEditRoom() {
    this.settings.updateRoom(this.selectedRoomId, this.roomForm.value).subscribe(data => {
      this.settings.initRooms();
      this.closeEditRoomModal();
    });
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
    this.settings.deleteRoom(this.selectedRoomId).subscribe(data => {
      this.closeArchiveRoomModal();
      this.settings.initRooms();
    });
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
