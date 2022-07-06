import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { SwiperModule } from 'swiper/angular';

// MODULES
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "../app-routing.module";

import { HomeComponent } from './home/home.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { RegisterComponent } from './register/register.component';

@NgModule({

    declarations: [
        HomeComponent,
        NoPageFoundComponent,
        ConocenosComponent,
        ContactoComponent,
        TrabajadoresComponent,
        EmpresasComponent,
        RegisterComponent
    ],
    exports: [
        HomeComponent,
        NoPageFoundComponent
    ],
    imports: [
        CommonModule,
        SwiperModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ]

})

export class PagesModule { }