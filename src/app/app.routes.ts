import { Route, } from '@angular/router';
import { canMatchTeam } from './core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./cms-module/cms-module.routes').then(module => module.CmsRoutes),
  },
  {
    path: 'auth',
    canMatch: [canMatchTeam],
    loadChildren: () => import('./auth-module/auth.routes').then(module => module.AuthRoutes),
  }
]
