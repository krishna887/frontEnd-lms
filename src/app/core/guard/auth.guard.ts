import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  

  const _route=inject(Router);
const authService=inject(AuthService)
authService.user$.subscribe(user=>console.log(user))

  return true;
};
