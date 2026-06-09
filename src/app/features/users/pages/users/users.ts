import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des utilisateurs');
        this.loading.set(false);
      },
    });
  }

  setAdmin(user: User): void {
    this.userService.promoteToAdmin(user.id).subscribe({
      next: () => {
        this.users.update((users) =>
          users.map((u) =>
            u.id === user.id
              ? {
                  ...u,
                  role: {
                    ...u.role,
                    name: 'ADMIN',
                  },
                }
              : u,
          ),
        );
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur');
      },
    });
  }

  deleteUser(userId: number): void {
    if (!confirm('Voulez-vous supprimer cet utilisateur ?')) return;

    this.userService.delete(userId).subscribe({
      next: () => {
        this.users.update((users) => users.filter((u) => u.id !== userId));
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur suppression');
      },
    });
  }
}
