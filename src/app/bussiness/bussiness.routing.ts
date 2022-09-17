import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { EmpresaComponent } from './empresa/empresa.component';
import { BussinessComponent } from './bussiness.component';

// GUARDS
import { BussinessGuard } from '../guards/bussiness.guard';

const routes: Routes = [
    
    { 
        path: 'bussiness', 
        component: BussinessComponent,
        canActivate: [BussinessGuard],
        children: [
            { path: '', component: EmpresaComponent, data:{ titulo: 'Mi Empresa'} },
            { path: 'empresa', component: EmpresaComponent, data:{ titulo: 'Mi Empresa'} },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BussinessRoutingModule {}