import {Pipe, PipeTransform} from '@angular/core';
import {Status} from '../interfaces/tasks';

@Pipe({
  name: 'taskStatus',
  standalone: true
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: Status | undefined): string {
    switch (value) {
      case Status.PENDING: return 'A faire'
      case Status.IN_PROGRESS: return 'En cours'
      case Status.DONE: return 'Terminé'
      default: return 'Inconnu'
    }
  }

}
