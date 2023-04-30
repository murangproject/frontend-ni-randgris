import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Activity {
  id?: number;
  type?: string;
  source?: string;
  data?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: "root"
})
export class ActivityService {
  activities$ = new BehaviorSubject<Activity[]>([]);
  constructor(private http: HttpClient) { }

  init() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    this.http.get<Activity[]>(`${environment.apiUrl}/activities`, { headers: headers }).subscribe(
      (res: Activity[]) => this.activities$.next(res)
    );
  }

  getActivities() {
    return this.activities$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
