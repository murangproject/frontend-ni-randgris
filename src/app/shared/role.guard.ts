import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const role = localStorage.getItem('role') ?? 'guest';
  const roles = route.data['roles'] ?? [];
  if (roles.includes(role)) {
    return true;
  } else {
    return false;
  }
};
