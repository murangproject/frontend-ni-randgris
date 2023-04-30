import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay } from "rxjs";
import { Schedule } from "../shared/auth.service";
import { environment } from "src/environments/environment";

export interface CreateScheduleDto {
  day: string;
  start_time: string;
  end_time: string;
  semester: string;
  section: string;
  subject: string;
  room: string;
  user_id: number;
}

export interface UpdateScheduleDto extends Partial<CreateScheduleDto> {
  is_deleted?: boolean;
  status?: 'present' | 'absent' | 'not_visited';
  comment?: string;
}

@Injectable({
  providedIn: "root"
})
export class SchedulesService {
  schedules$ = new BehaviorSubject<Schedule[]>([]);

  constructor(private http: HttpClient) { }

  init() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    this.http.get<Schedule[]>(`${environment.apiUrl}/schedules`, { headers: headers }).subscribe(
      (res: Schedule[]) => this.schedules$.next(res)
    );
  }

  getSchedules() {
    return this.schedules$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  createSchedule(user_id: number, schedule: CreateScheduleDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${environment.apiUrl}/schedules`, {...schedule, user_id}, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  updateSchedule(schedule_id: number, schedule: UpdateScheduleDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.put(`${environment.apiUrl}/schedules/${schedule_id}`, schedule, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  archiveSchedule(schedule_id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.delete(`${environment.apiUrl}/schedules/${schedule_id}`, { headers: headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
