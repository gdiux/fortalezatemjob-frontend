import { Component, OnInit } from '@angular/core';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public worker!: Worker;

  constructor(  private workerService: WorkerService,
                private fb: FormBuilder) { 

    this.worker = workerService.worker;

  }

  ngOnInit(): void {

  }

  /** ======================================================================
   * EDITAR PERFIL
  ====================================================================== */
  public formSubmited: boolean = false;
  public editarForm = this.fb.group({
    name: [this.worker?.name || '', [Validators.required] ], 
    cedula: [this.worker?.cedula || '', [Validators.required, Validators.minLength(6)] ], 
    phone: [this.worker?.phone || '', [Validators.required] ], 
    address: [this.worker?.address || '', [Validators.required] ], 
    city: [this.worker?.city || ''], 
    department: [this.worker?.department || '']
  });

  edit(){

    this.editarForm.setValue({
      name: [this.worker?.name  ], 
    cedula: [this.worker?.cedula  ], 
    phone: [this.worker?.phone  ], 
    address: [this.worker?.address  ], 
    city: [this.worker?.city], 
    department: [this.worker?.department]
    })

  }

  editar(){
    this.formSubmited = true;

    if (this.editarForm.invalid) {
      return;
    }

  }


  /** ======================================================================
   * VALIDATE FORM
  ====================================================================== */
  validateForm( campo:string ): boolean{

    if ( this.editarForm.get(campo)?.invalid && this.formSubmited ) {      
      return true;
    }else{
      return false;
    }

  }


  // FIN DE LA CLASE

}
