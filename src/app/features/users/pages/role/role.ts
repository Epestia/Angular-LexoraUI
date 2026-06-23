import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class RoleComponent {
  private roleService = inject(RoleService);

  roles = toSignal(this.roleService.getAllRoles(), {
    initialValue: [],
  });

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe({
      next: () => {
        // mieux que reload
        this.roles = toSignal(this.roleService.getAllRoles(), {
          initialValue: [],
        });
      },
      error: () => {
        console.error('Erreur suppression rôle');
      },
    });
  }
}
