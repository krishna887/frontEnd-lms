import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _route=inject(Router);
  if(!localStorage.getItem("token")){
    alert("Redirecting to login Page")
_route.navigate(['login'])
  }

  return true;
};
