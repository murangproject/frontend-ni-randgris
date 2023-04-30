import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, shareReplay } from "rxjs";
import { environment } from "src/environments/environment";

export interface Section {
  id?: number;
  name?: string;
  is_deleted?: boolean;
}

export interface CreateSectionDto {
  name: string;
}

export interface UpdateSectionDto extends Partial<CreateSectionDto> {
  is_deleted?: boolean;
}

export interface Subject {
  id?: number;
  code?: string;
  name?: string;
  is_deleted?: boolean;
}

export interface CreateSubjectDto {
  code: string;
  name: string;
}

export interface UpdateSubjectDto extends Partial<CreateSubjectDto> {
  is_deleted?: boolean;
}

export interface Room {
  id?: number;
  borrower?: number;
  room_name?: string;
  borrow_time?: string;
  return_time?: string;
  status?: 'available' | 'occupied';
  is_deleted?: boolean;
}

export interface CreateRoomDto {
  room_name: string;
}

export interface UpdateRoomDto extends Partial<CreateRoomDto> {
  borrow_time?: string;
  return_time?: string;
  status?: 'available' | 'occupied';
  is_deleted?: boolean;
}


@Injectable({
  providedIn: "root"
})
export class SettingsService {
  sections$ = new BehaviorSubject<Section[]>([]);
  subjects$ = new BehaviorSubject<Subject[]>([]);
  rooms$ = new BehaviorSubject<Room[]>([]);

  constructor(private http: HttpClient) { }

  initSections() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    this.http.get<Section[]>(`${environment.apiUrl}/sections`, { headers: headers }).subscribe(
      (res: Section[]) => this.sections$.next(res)
    );
  }

  getSections() {
    return this.sections$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  initSubjects() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    this.http.get<Subject[]>(`${environment.apiUrl}/subjects`, { headers: headers }).subscribe(
      (res: Subject[]) => this.subjects$.next(res)
    );
  }

  getSubjects() {
    return this.subjects$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  initRooms() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    this.http.get<Room[]>(`${environment.apiUrl}/rooms`, { headers: headers }).subscribe(
      (res: Room[]) => this.rooms$.next(res)
    );
  }

  getRooms() {
    return this.rooms$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  createSection(section: CreateSectionDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${environment.apiUrl}/sections`, section, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  updateSection(id: number, section: UpdateSectionDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.put(`${environment.apiUrl}/sections/${id}`, section, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  deleteSection(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.delete(`${environment.apiUrl}/sections/${id}`, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  createSubject(subject: CreateSubjectDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${environment.apiUrl}/subjects`, subject, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  updateSubject(id: number, subject: UpdateSubjectDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.put(`${environment.apiUrl}/subjects/${id}`, subject, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  deleteSubject(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.delete(`${environment.apiUrl}/subjects/${id}`, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  createRoom(room: CreateRoomDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${environment.apiUrl}/rooms`, room, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  updateRoom(id: number, room: UpdateRoomDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.put(`${environment.apiUrl}/rooms/${id}`, room, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  deleteRoom(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.delete(`${environment.apiUrl}/rooms/${id}`, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  borrowRoom(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    return this.http.post(`${environment.apiUrl}/rooms/${id}/borrow`, {}, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  returnRoom(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    return this.http.post(`${environment.apiUrl}/rooms/${id}/return`, {}, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}

