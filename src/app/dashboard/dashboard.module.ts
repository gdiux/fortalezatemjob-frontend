import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';

import { PerfilComponent } from './perfil/perfil.component';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    PerfilComponent,
    DashboardComponent
  ],
  exports: [
    PerfilComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
