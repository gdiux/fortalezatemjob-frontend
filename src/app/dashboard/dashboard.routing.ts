import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { DashboardComponent } from './dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';

// 
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PerfilComponent, data:{ titulo: 'Perfil'} },
            { path: 'perfil', component: PerfilComponent, data:{ titulo: 'Perfil'} },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}