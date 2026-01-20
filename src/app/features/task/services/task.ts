import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Tasks} from '../interfaces/tasks';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private httpClient:HttpClient = inject(HttpClient)
  private apiUrl:string = `${environment.apiUrl}/tasks`

  createTask (task: Tasks): Observable<Tasks> {
    return this.httpClient.post<Tasks>(`${this.apiUrl}`, task)
   }


}
