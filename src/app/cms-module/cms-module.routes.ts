import { Routes } from "@angular/router";
import { DashbaordComponent } from "./dashbaord/dashbaord.component";
import { LayoutComponent } from "./layout/layout.component";
import { authGuard } from "../core/guards/auth.guard";
import { ContactComponent } from "./contact/contact.component";

export const CmsRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashbaordComponent,
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '',
        redirectTo: "/dashboard",
        pathMatch: 'full'
      }
    ]
  }
];
