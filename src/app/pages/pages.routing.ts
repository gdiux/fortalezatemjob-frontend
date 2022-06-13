import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { HomeComponent } from './home/home.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactoComponent } from './contacto/contacto.component';


const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent, data:{ title: 'Inicio' } },
    { path: 'conocenos', component: ConocenosComponent, data:{ title: 'Conocenos' } },
    { path: 'contacto', component: ContactoComponent, data:{ title: 'Contacto' } },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}