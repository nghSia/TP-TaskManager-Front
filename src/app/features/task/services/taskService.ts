import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Tasks} from '../interfaces/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpClient:HttpClient = inject(HttpClient)
  private apiUrl:string = `${environment.apiUrl}/tasks`

  createTask (task: Tasks): Observable<Tasks> {
    return this.httpClient.post<Tasks>(`${this.apiUrl}`, task)
   }

   getAllTask (): Observable<Tasks[]> {
    return this.httpClient.get<Tasks[]>(`${this.apiUrl}`)
   }

   updateTask (id: number | undefined, task: Tasks): Observable<Tasks> {
      return this.httpClient.patch<Tasks>(`${this.apiUrl}/${id}`, task)
    }

    getTaskById (id: number | undefined): Observable<Tasks> {
      return this.httpClient.get<Tasks>(`${this.apiUrl}/${id}`)
    }


}
