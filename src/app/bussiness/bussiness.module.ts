import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULES
import { PipesModule } from '../pipes/pipes.module';

// COMPONENTS
import { BussinessComponent } from './bussiness.component';
import { EmpresaComponent } from './empresa/empresa.component';



@NgModule({
  declarations: [  
    BussinessComponent, 
    EmpresaComponent
  ],
  exports:[
    BussinessComponent, 
    EmpresaComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class BussinessModule { }
