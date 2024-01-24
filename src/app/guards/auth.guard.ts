import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('access_token')) {
    return true;
  }else{
    router.navigate(['/connexion'])
    return false;
  }
};

