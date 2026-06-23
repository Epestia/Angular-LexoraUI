import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    FloatLabelModule,
  ],
  templateUrl: './user-create.html',
  styleUrls: ['./user-create.css'],
})
export class UserCreate {
  username = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  createUser() {
    const newUser: User = {
      id: 0,
      username: this.username,
      password: this.password,
      role: {
        id: 1,
        name: 'USER',
      },
    };

    this.userService.create(newUser).subscribe({
      next: (res) => {
        this.successMessage = `Utilisateur ${res.username} créé avec succès !`;
        this.errorMessage = '';

        this.username = '';
        this.password = '';

        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création de l’utilisateur';
        this.successMessage = '';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
