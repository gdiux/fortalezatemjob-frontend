import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { HomeComponent } from './home/home.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent, data:{ title: 'Inicio' } },
    { path: 'conocenos', component: ConocenosComponent, data:{ title: 'Conocenos' } },
    { path: 'contacto', component: ContactoComponent, data:{ title: 'Contacto' } },
    { path: 'registrarse', component: RegisterComponent, data:{ title: 'Registrate' } },
    { path: 'portal/trabajadores', component: TrabajadoresComponent, data:{ title: 'Portal de trabajadores' } },
    { path: 'portal/empresas', component: EmpresasComponent, data:{ title: 'Portal de empresas' } },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}