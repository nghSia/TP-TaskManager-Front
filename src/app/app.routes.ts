import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { TaskList } from './features/task/task-list/task-list';
import { authGuard } from './core/auth/guards/auth-guard';
import { TaskForm } from './features/task/task-form/task-form';
import { TaskDetails } from './features/task/task-details/task-details';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'tasks', component: TaskList, canActivate: [authGuard] },
  { path: 'create', component: TaskForm, canActivate: [authGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'edit/:id', component: TaskForm, canActivate: [authGuard] },
  { path: 'task/:id', component: TaskDetails, canActivate: [authGuard] },
];
