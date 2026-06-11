import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const superAdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user();

  if (user?.role?.name === 'SUPER_ADMIN') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
