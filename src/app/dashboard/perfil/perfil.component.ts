import { Component, OnInit } from '@angular/core';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    name: ['', [Validators.required] ], 
    cedula: ['', [Validators.required, Validators.minLength(6)] ], 
    phone: ['', [Validators.required] ], 
    address: ['', [Validators.required] ], 
    city: [''], 
    department: ['']
  });

  edit(){

    this.editarForm.setValue({
      name: this.worker?.name, 
      cedula: this.worker?.cedula, 
      phone: this.worker?.phone, 
      address: this.worker?.address, 
      city: this.worker?.city, 
      department: this.worker?.department
    })

  }

  editar(){
    this.formSubmited = true;

    if (this.editarForm.invalid) {
      return;
    }

    this.workerService.updateWorker(this.editarForm.value, this.worker.wid)
        .subscribe( ({worker}) => {
          
          this.workerService.worker = worker;
          this.worker = worker;
          Swal.fire('Estupendo', 'Tu perfil se a acutalizado exitosamente!', 'success');
          
        }, (err) => {  
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

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
