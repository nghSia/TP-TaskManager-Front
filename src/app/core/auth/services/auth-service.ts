import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from '../interfaces/credentials';
import {Observable, tap} from 'rxjs';
import {User} from '../interfaces/user';
import {environment} from '../../../../environments/environment';
import {AuthResponse} from '../interfaces/auth-response';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl:string = `${environment.apiUrl}/auth`

  currentUser: WritableSignal<User | null> = signal(this.getUserFromStorage())

  register (credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/register`, credentials);
  }

  login (credentials: Credentials): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((res: AuthResponse) => {
          localStorage.setItem('token', res.access_token)
          this.currentUser.set(jwtDecode(res.access_token))
        })
      )
  }

  logout () {
    localStorage.removeItem('token')
    this.currentUser.set(null)
  }


  getUserToken ():string|null {
    return localStorage.getItem('token')
  }

  getUserFromStorage (): User|null {
    const token = this.getUserToken()
    if (!token) return null

    try {
      const decoded: User = jwtDecode(token);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) return null;

      return decoded;
    } catch (error) {
      return null;
    }
  }



}
