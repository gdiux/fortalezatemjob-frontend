import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// SERVICES
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(  private fb: FormBuilder,
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
    password:   ['',    [Validators.required, Validators.minLength(6)]],
    repassword: ['',    [Validators.required, Validators.minLength(6)]],
    terminos:   [false, [Validators.requiredTrue]]
  });

  registro(){

    this.btnSubmit = true;
    this.formSubmited = true;

    if (this.registerForm.invalid) {
      this.btnSubmit = false;
      return;
    }
    
    if (this.registerForm.value.password != this.registerForm.value.password) {
            
      this.btnSubmit = false;
      return;
    }



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
