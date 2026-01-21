import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/taskService';
import { Status, Tasks } from '../interfaces/tasks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskStatusPipe } from '../pipe/task-status-pipe';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, TaskStatusPipe, MatDialogModule, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private taskService: TaskService = inject(TaskService);
  private destroyRef = inject(DestroyRef);
  private readonly c_dialog = inject(MatDialog);

  allTasks = signal<Tasks[]>([]);
  filteredTasks = signal<Tasks[]>([]);
  // Stocker le filtre actif
  currentFilter = signal<string>('');

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService
      .getAllTask()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks: Tasks[]) => {
          this.allTasks.set(tasks);
          // Réappliquer le filtre actif
          this.applyFilter();
        },
        error: () => console.log('error'),
      });
  }

  // Pour afficher de manière dynamique les tâches en fonction du filtre sélectionné
  filterTasksByStatus(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;

    // Sauvegarder le filtre
    this.currentFilter.set(status);
    this.applyFilter();
  }

  private applyFilter(): void {
    const status = this.currentFilter();
    if (status === '') {
      this.filteredTasks.set(this.allTasks());
    } else {
      this.filteredTasks.set(this.allTasks().filter((task) => task.status === status));
    }
  }

  startTask(task: Tasks) {
    this.taskService.updateTask(task.id, { ...task, status: Status.IN_PROGRESS }).subscribe({
      next: () => this.getTasks(),
      error: () => console.log('error'),
    });
  }

  markAsDone(task: Tasks) {
    this.taskService.updateTask(task.id, { ...task, status: Status.DONE }).subscribe({
      next: () => this.getTasks(),
      error: () => console.log('error'),
    });
  }

  getStatusColor(status: Status | undefined) {
    switch (status) {
      case Status.PENDING:
        return 'bg-red-100 text-red-800';
      case Status.IN_PROGRESS:
        return 'bg-amber-100 text-amber-800';
      case Status.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  }

  deleteTask(task: Tasks): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => this.getTasks(),
      error: () => console.log('error'),
    });
  }

  confirmDelete(task: Tasks): void {
    let dialogRef = this.c_dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      const isConfirmed = confirmed ?? false;
      if (isConfirmed) {
        this.deleteTask(task);
      }
    });
  }
}
