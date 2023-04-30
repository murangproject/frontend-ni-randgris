import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../shared/auth.service";

export interface CreateUserDto {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  role_type: 'admin' | 'faculty' | 'attendance_checker';
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  is_deleted?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class UsersService {
  users$ = new BehaviorSubject<User[]>([]);
  constructor(private http: HttpClient) { }

  init() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    this.http.get<User[]>(`${environment.apiUrl}/users`, { headers: headers }).pipe(
      tap((res: User[]) => this.users$.next(res))
    ).subscribe();
  }

  createUser(user: CreateUserDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${environment.apiUrl}/users`, user, { headers: headers }).pipe(
      tap((res: User) => console.log(res))
    );
  }

  archiveUser(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete(`${environment.apiUrl}/users/${id}`, { headers: headers }).pipe(
      tap((res: User) => console.log(res))
    );
  }

  restoreUser(id: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.patch(`${environment.apiUrl}/users/${id}`, { is_deleted: false }, { headers: headers }).pipe(
      tap((res: User) => console.log(res))
    );
  }

  editUser(id: number, value: UpdateUserDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.put(`${environment.apiUrl}/users/${id}`, value, { headers: headers }).pipe(
      tap((res: User) => console.log(res))
    );
  }

  getUsers() {
    return this.users$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  resetUser(id:number) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${environment.apiUrl}/users/${id}/reset`, { headers: headers }).pipe(
      tap((res: User) => console.log(res))
    );
  }
}
