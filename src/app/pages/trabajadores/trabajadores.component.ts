import { Component, NgZone, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';

import { environment } from '../../../environments/environment';

const local_url = environment.local_url;

declare const gapi:any;


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  public worker!: Worker;
  public remember: boolean = false;

  constructor(  private router: Router,
                private workerService: WorkerService,
                private fb: FormBuilder,
                private ngZone: NgZone,) { }

  ngOnInit(): void {

  }

  /** =============================================================
   * LOGIN
  =============================================================== */
  public formSubmitted: boolean = false;  
  public loginForm = this.fb.group({
    email: [localStorage.getItem('login') || '' , [Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: this.remember
  });


  login(){

    this.formSubmitted = true;

    if (localStorage.getItem('login') !== null ) {
      this.loginForm.value.remember = true;
    }

    if ( this.loginForm.value.remember ) {
      localStorage.setItem('login', this.loginForm.value.email);
    }else {
      localStorage.removeItem('login');
    }
    
    if (this.loginForm.invalid) {
      return;
    }

    this.workerService.loginWorker(this.loginForm.value)
        .subscribe( resp => {

          if (resp === false) {
            Swal.fire('Atención', 'Credenciales incorrectas, porfavor verificar el email o contraseña', 'warning')
            return;
          }          

          // INGRESAR
          this.ngZone.run( () => {
            window.location.href = `${local_url}/dashboard`
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
    
    this.workerService.recuperarPassword(this.formPassRee.value)
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

  /** =============================================================
   * RECUPERAR CONTRASEÑA
  =============================================================== */



  


  // FIN DE LA CLASE

}
