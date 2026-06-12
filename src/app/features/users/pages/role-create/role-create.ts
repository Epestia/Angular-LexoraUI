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

  roleName: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  createRole() {
    if (!this.roleName.trim()) {
      this.errorMessage = 'Le nom du rôle est obligatoire';
      return;
    }

    this.roleService.createRole({ name: this.roleName }).subscribe({
      next: () => {
        this.router.navigate(['/roles']);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création du rôle';
      },
    });
  }
}
