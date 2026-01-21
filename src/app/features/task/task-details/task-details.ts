import { Component, DestroyRef, inject, Input, signal, WritableSignal } from '@angular/core';
import { Status, Tasks } from '../interfaces/tasks';
import { TaskService } from '../services/taskService';
import { TaskStatusPipe } from '../pipe/task-status-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentsListComponent } from '../comments-list/comments-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../task-list/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-task-details',
  imports: [TaskStatusPipe, RouterLink, DatePipe, CommentsListComponent, MatDialogModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  private taskService = inject(TaskService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private readonly c_dialog = inject(MatDialog);

  @Input() id?: string;
  task: WritableSignal<Tasks | null> = signal<Tasks | null>(null);

  ngOnInit() {
    if (this.id) {
      this.taskService.getTaskById(+this.id).subscribe({
        next: (task: Tasks) => {
          this.task.set(task);
          console.log(task);
        },
        error: () => console.log('error'),
      });
    }
  }

  getTasks() {
    this.taskService
      .getTaskById(+this.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks: Tasks) => this.task.set(tasks),
        error: () => console.log('error'),
      });
  }

  markAsDone(task: Tasks) {
    this.taskService.updateTask(task.id, { ...task, status: Status.DONE }).subscribe({
      next: () => this.getTasks(),
      error: () => console.log('error'),
    });
  }

  deleteTask(task: Tasks): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.task.set(null);
      },
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

  startTask(task: Tasks) {
    this.taskService.updateTask(task.id, { ...task, status: Status.IN_PROGRESS }).subscribe({
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
}
