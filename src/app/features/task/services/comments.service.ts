import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly STORAGE_KEY = 'taskComments';

  constructor() {}

  getCommentsByTaskId(taskId: number): Comment[] {
    const allComments = this.getAllComments();
    return allComments
      .filter((comment) => comment.taskId === taskId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  addComment(taskId: number, author: string, message: string): Comment {
    const newComment: Comment = {
      id: this.generateId(),
      taskId,
      author,
      message,
      date: new Date(),
    };

    const allComments = this.getAllComments();
    allComments.push(newComment);
    this.saveComments(allComments);

    return newComment;
  }

  deleteComment(commentId: string): void {
    const allComments = this.getAllComments();
    const filteredComments = allComments.filter((c) => c.id !== commentId);
    this.saveComments(filteredComments);
  }

  private getAllComments(): Comment[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing comments from localStorage', e);
      return [];
    }
  }

  private saveComments(comments: Comment[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
  }

  private generateId(): string {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
