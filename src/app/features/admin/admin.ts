import { Component, inject, signal, WritableSignal } from '@angular/core';
import { User } from '../../core/auth/interfaces/user';
import { UsersService } from '../users/users-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ToastrModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private userService: UsersService = inject(UsersService);
  private toastr: ToastrService = inject(ToastrService);
  users: WritableSignal<User[]> = signal<User[]>([]);

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users.set(users);
        console.log(users);
      },
      error: () => console.log('error'),
    });
  }

  banUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir bannir cet utilisateur ?')) {
      this.users.set(this.users().filter((user) => user.id !== id));
      this.toastr.success('Utilisateur banni avec succès');
    } else {
      this.toastr.info('Action annulée');
    }
  }
}
