import { Pipe, PipeTransform } from '@angular/core';
import {Status} from '../../task/interfaces/tasks';

@Pipe({
  name: 'errorTranslate',
})
export class ErrorTranslatePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Unauthorized': return 'Connexion impossible, vérifier les informations'
      default: return ''
    }
  }

}
