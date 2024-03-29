import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { withOptions } from "tailwindcss/plugin";

export interface UpdateProfile {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
}

export interface ChangePassword {
  old_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
}

export interface User {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_type?: string;
  schedule_id?: number;
  schedules?: Schedule[];
  request_password_reset?: boolean;
  is_deleted?: boolean;
}

export interface Schedule {
  id?: number;
  day?: string;
  start_time?: string;
  end_time?: string;
  semester?: string;
  section?: string;
  subject?: string;
  room?: string;
  status?: 'present' | 'absent' | 'not_visited';
  comment?: string;
  is_deleted?: boolean;
  updated_at?: string;
  user_id?: number;
  user?: User;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserResponse {
  user?: User;
  token?: string;
  initialize?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getAuthStatus() {
    return this.isAuthenticated$.asObservable().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  login(user: UserLogin) {
    this.http.get(`${environment.baseUrl}/sanctum/csrf-cookie`).subscribe();

    return this.http.post<UserResponse>(`${environment.apiUrl}/login`, user).pipe(
      tap(
        res => {
          localStorage.setItem("token", res?.token ?? '');
          localStorage.setItem("user", JSON.stringify(res.user ?? {}));
          localStorage.setItem("role", res.user?.role_type ?? '');
          localStorage.setItem("initialize", JSON.stringify(res.initialize ?? false));
          this.isAuthenticated$.next(true);
        }
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.isAuthenticated$.next(false);
  }

  checkAuthentication() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.get<UserResponse>(`${environment.apiUrl}/check-auth`, { headers: headers }).pipe(
      tap(
        res => {
          localStorage.setItem("user", JSON.stringify(res.user ?? {}));
          this.isAuthenticated$.next(true);
        }
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  initialize(password: string, password_confirmation: string) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.post(`${environment.apiUrl}/change-password`, { password, password_confirmation }, { headers: headers }).pipe(
      tap(
        res => {
          localStorage.removeItem('initialize');
        }
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  updateProfile(id: number, user: UpdateProfile) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.put<{ message: string }>(
      `${environment.apiUrl}/update-profile`,
      user,
      { headers: headers }
    ).pipe(
      tap(
        res => {
          localStorage.setItem("user", JSON.stringify(res ?? {}));
        }
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  updatePassword(id: number, payload: ChangePassword) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.put<{ message: string }>(
      `${environment.apiUrl}/update-password`,
      payload,
      { headers: headers }
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  requestPasswordReset(email: string){
    return this.http.put<{ message: string }>(
      `${environment.apiUrl}/request-password-reset`,
      { email }
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
