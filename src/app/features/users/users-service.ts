import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../../core/auth/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http: HttpClient = inject(HttpClient)
  private apiUrl:string = `${environment.apiUrl}/users`

  getAllUsers (): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`)
  }
}
