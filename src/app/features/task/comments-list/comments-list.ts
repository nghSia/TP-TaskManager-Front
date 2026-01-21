import { Component, Input, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommentsService } from '../services/comments.service';
import { AuthService } from '../../../core/auth/services/auth-service';
import { Comment } from '../interfaces/comment';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './comments-list.html',
})
export class CommentsListComponent {
  @Input() taskId?: number;

  private commentsService: CommentsService = inject(CommentsService);
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);

  comments: WritableSignal<Comment[]> = signal<Comment[]>([]);
  isAuthenticated: WritableSignal<boolean> = signal<boolean>(false);
  currentUserName: WritableSignal<string> = signal<string>('');

  commentForm = this.fb.nonNullable.group({
    message: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.isAuthenticated.set(!!user);
    this.currentUserName.set(user?.username || '');

    this.loadComments();
  }

  loadComments(): void {
    if (this.taskId) {
      const comments: Comment[] = this.commentsService.getCommentsByTaskId(this.taskId);
      this.comments.set(comments);
    }
  }

  onSubmit(): void {
    if (this.commentForm.valid && this.isAuthenticated() && this.taskId) {
      const message: string = this.commentForm.value.message!;

      this.commentsService.addComment(this.taskId, this.currentUserName(), message);

      this.loadComments();

      this.commentForm.reset();
    }
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId);
    this.loadComments();
  }

  canDeleteComment(comment: Comment): boolean {
    return this.isAuthenticated() && comment.author === this.currentUserName();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
