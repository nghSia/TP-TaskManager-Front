import { Routes } from '@angular/router';
import {Register} from './features/auth/register/register';
import {Login} from './features/auth/login/login';
import {TaskList} from './features/task/task-list/task-list';

export const routes: Routes = [
  {path: 'register', component: Register},
  {path: 'login', component: Login},
  {path: 'tasks', component: TaskList}
];
