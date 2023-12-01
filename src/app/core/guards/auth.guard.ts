import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, of, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).isUserLogin() ? true : router.createUrlTree(['/auth'])
}

export const canMatchTeam: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  return inject(AuthService).isUserLogin() ? router.navigateByUrl('/') : true
};

