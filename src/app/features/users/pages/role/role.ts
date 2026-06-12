import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../../core/services/role.service';
import { Role } from '../../../../core/models/role';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class RoleComponent {
  private roleService = inject(RoleService);

  roles = toSignal(this.roleService.getAllRoles(), {
    initialValue: [] as Role[],
  });
}
