import { Component, inject, OnInit } from '@angular/core';
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

  users: User[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      },
    });
  }
  setAdmin(user: any) {
    this.userService.promoteToAdmin(user.id).subscribe({
      next: () => {
        user.role.name = 'ADMIN';
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur');
      },
    });
  }

  deleteUser(userId: number) {
    if (!confirm('Voulez-vous supprimer cet utilisateur ?')) return;

    this.userService.delete(userId).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.id !== userId);
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur suppression');
      },
    });
  }
}
