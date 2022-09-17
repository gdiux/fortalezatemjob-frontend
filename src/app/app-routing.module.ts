import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// MODULES
import { PagesRoutingModule } from './pages/pages.routing';
import { DashboardRoutingModule } from './dashboard/dashboard.routing';

// COMPONENTS
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { BussinessRoutingModule } from './bussiness/bussiness.routing';

const routes: Routes = [
  
  { path: '**', component: NoPageFoundComponent },
  { path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'bussiness', redirectTo: '/bussiness', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    DashboardRoutingModule,
    BussinessRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
