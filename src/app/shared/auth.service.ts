import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay, tap } from "rxjs";
import { environment } from "src/environments/environment";

export interface User {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_type?: string;
  is_deleted?: boolean;
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
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post<UserResponse>(`${environment.apiUrl}/login`, user, { headers: headers }).pipe(
      tap(
        res => {
          localStorage.setItem("token", res?.token ?? '');
          localStorage.setItem("user", JSON.stringify(res.user ?? {}));
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
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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
}
