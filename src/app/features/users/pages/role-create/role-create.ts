import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-create.html',
  styleUrl: './role-create.css',
})
export class RoleCreateComponent {
  private roleService = inject(RoleService);
  private router = inject(Router);

  roleName = '';

  errorMessage = '';
  successMessage = '';

  createRole() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.roleName.trim()) {
      this.errorMessage = 'Le nom du rôle est obligatoire';
      return;
    }

    this.roleService.createRole({ name: this.roleName }).subscribe({
      next: () => {
        this.successMessage = 'Rôle créé avec succès';
        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 500);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création du rôle';
      },
    });
  }
}
