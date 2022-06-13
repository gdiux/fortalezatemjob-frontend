import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

// MODULES
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({

    declarations: [
        HomeComponent,
        NoPageFoundComponent,
        ConocenosComponent,
        ContactoComponent
    ],
    exports: [
        HomeComponent,
        NoPageFoundComponent
    ],
    imports: []

})

export class PagesModule { }