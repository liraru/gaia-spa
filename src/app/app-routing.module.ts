import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes.constant';

const routes: Routes = [
  {
    path: APP_ROUTES.DASHBOARD,
    loadChildren: () => import(`./modules/layout/landing/landing.module`).then((m) => m.LandingModule)
  },
  {
    path: APP_ROUTES.MANAGEMENT,
    loadChildren: () => import(`./modules/sections/management/management.module`).then((m) => m.ManagementModule)
  },
  {
    path: APP_ROUTES.CIBELES,
    loadChildren: () => import(`./modules/sections/cibeles/cibeles.module`).then((m) => m.CibelesModule)
  },
  {
    path: APP_ROUTES.MINERVA,
    loadChildren: () => import(`./modules/sections/minerva/minerva.module`).then((m) => m.MinervaModule)
  },
  { path: '**', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
