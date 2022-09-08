import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

// SERVICES
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(  private router: Router,
                private fb: FormBuilder,
                private workerService: WorkerService) { }

  ngOnInit(): void {

    

  }

  /** ===========================================================================
   * REGISTRO
  =========================================================================== */
  public formSubmited:  boolean = false;
  public btnSubmit:     boolean = false;
  public valuePass:     boolean = false;
  public registerForm = this.fb.group({
    name:       ['',    [Validators.required, Validators.minLength(3)]],
    email:      ['',    [Validators.required, Validators.email]],
    cedula:     ['',    [Validators.required]],
    phone:     ['',    [Validators.required]],
    password:   ['',    [Validators.required, Validators.minLength(6)]],
    repassword: ['',    [Validators.required, Validators.minLength(6)]],
    terminos:   [false, [Validators.requiredTrue]]
  });

  registro(){

    this.valuePass = false;            
    this.btnSubmit = true;
    this.formSubmited = true;

    if (this.registerForm.invalid) {
      this.btnSubmit = false;
      return;
    }
    
    if (this.registerForm.value.password != this.registerForm.value.repassword) {
      this.valuePass = true;            
      this.btnSubmit = false;
      return;
    }

    this.workerService.createWorker(this.registerForm.value)
        .subscribe( ({ worker }) => {

          Swal.fire('Estupendo', `Se ha registrado correctamente en nuestro portal de trabajadores`, 'success');
          this.router.navigateByUrl('/portal/trabajadores');
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        });


  }




  /** ======================================================================
   * VALIDATE FORM
  ====================================================================== */
  validateForm( campo:string ): boolean{

    if ( this.registerForm.get(campo)?.invalid && this.formSubmited ) {      
      return true;
    }else{
      return false;
    }

  }


  // FIN DE LA CLASE
}
