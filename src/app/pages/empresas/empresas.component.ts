import { Component, NgZone, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';

// SERVICESS
import { BussinessService } from 'src/app/services/bussiness.service';

// MODELS
import { Bussiness } from 'src/app/models/bussiness.model';

const local_url = environment.local_url;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public bussiness!: Bussiness;
  public remember: boolean = false;

  constructor(  private router: Router,
                private bussinssService: BussinessService,
                private fb: FormBuilder,
                private ngZone: NgZone,) { }

  ngOnInit(): void {
  }


  /** =============================================================
   * LOGIN
  =============================================================== */
  public formSubmitted: boolean = false;  
  public loginForm = this.fb.group({
    email: [localStorage.getItem('loginBuss') || '' , [Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: this.remember
  });


  login(){

    this.formSubmitted = true;

    if (localStorage.getItem('loginBuss') !== null ) {
      this.loginForm.value.remember = true;
    }

    if ( this.loginForm.value.remember ) {
      localStorage.setItem('loginBuss', this.loginForm.value.email);
    }else {
      localStorage.removeItem('loginBuss');
    }
    
    if (this.loginForm.invalid) {
      return;
    }

    this.bussinssService.loginBussiness(this.loginForm.value)
        .subscribe( resp => {

          if (resp === false) {
            Swal.fire('Atención', 'Credenciales incorrectas, porfavor verificar el email o contraseña', 'warning')
            return;
          }          

          // INGRESAR
          this.ngZone.run( () => {
            window.location.href = `${local_url}/bussiness/`
            // this.router.navigateByUrl(`${local_url}/dashboard/perfil/bussiness`);
          });

        });

  }

  /** =============================================================
   * VALIDAR CAMPOS
  =============================================================== */
  validate( campo: string): boolean{
    
    if ( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    }else{
      return false;
    }

  }

  /** =============================================================
   * RECUPERAR CONTRASEÑA
  =============================================================== */
  public formPassSubmitted: boolean = false;
  public btnFormPass: boolean = false;
  public formPassRee = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]]
    }
  )

  rePass(){

    this.formPassSubmitted = true;
    this.btnFormPass = true;
    
    if (this.formPassRee.invalid) {
      this.btnFormPass = false;
      return;
    }
    
    this.bussinssService.recuperarPasswordBussiness(this.formPassRee.value)
    .subscribe( resp => {
      
      Swal.fire('Estupendo', 'Se ha enviado un correo con tu nueva contraseña, porfavor verificar los correos Spam o no deseados en caso de no llegar a tu bandeja de entrada', 'success');
      this.formPassRee.reset();
      this.formPassSubmitted = false;
      this.btnFormPass = false;
      
    }, (err) => {
      this.btnFormPass = false;
      console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
    
      });


  }

  /** =============================================================
   * VALIDAR CAMPOS PASS
  =============================================================== */
  validatePass( campo: string): boolean{
    
    if ( this.formPassRee.get(campo)?.invalid && this.formPassSubmitted ) {
      return true;
    }else{
      return false;
    }

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
    nit:        ['',    [Validators.required]],
    phone:      ['',    [Validators.required]],
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

    this.bussinssService.createBussiness(this.registerForm.value)
        .subscribe( ({ bussiness }) => {

          this.registerForm.reset();

          Swal.fire('Estupendo', `Se ha registrado correctamente en nuestro portal de empresas`, 'success');
          

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
