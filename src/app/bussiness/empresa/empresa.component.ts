import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// SERVICES
import { BussinessService } from '../../services/bussiness.service';
import { FileUploadService } from '../../services/file-upload.service';

// MODELS
import { Bussiness } from 'src/app/models/bussiness.model';

import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.base_url;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public bussiness!: Bussiness;

  constructor(  private bussinessService: BussinessService,
                private fb: FormBuilder,
                private fileUploadService: FileUploadService) { 

                  this.bussiness = bussinessService.bussiness;

                }


  public url: any;    

  ngOnInit(): void {
    this.url = base_url;
  }

  /** ======================================================================
   * EDITAR PERFIL
  ====================================================================== */
  public formSubmited: boolean = false;
  public editarForm = this.fb.group({
    name: [this.bussiness?.name || '' , [Validators.required] ], 
    nit: [this.bussiness?.nit || '' , [Validators.required, Validators.minLength(6)] ], 
    phone: [this.bussiness?.phone || '' , [Validators.required] ], 
    address: [this.bussiness?.address || '' , [Validators.required] ], 
    city: [this.bussiness?.city || '', [Validators.required] ], 
    department: [this.bussiness?.department || '', [Validators.required]],
    barrio: [this.bussiness?.barrio || '', [Validators.required]],
  });

  edit(){

    this.editarForm.setValue({
      name: this.bussiness?.name || '', 
      nit: this.bussiness?.nit || '', 
      phone: this.bussiness?.phone || '', 
      address: this.bussiness?.address || '', 
      city: this.bussiness?.city || '', 
      department: this.bussiness?.department || '',
      barrio: this.bussiness?.barrio || '',
    })

  }

  editar(){
    this.formSubmited = true;

    if (this.editarForm.invalid) {
      return;
    }

    this.bussinessService.updateBussiness(this.editarForm.value, this.bussiness.bid!)
        .subscribe( ({bussiness}) => {

          console.log(bussiness);
          
          
          this.bussinessService.bussiness = bussiness;
          this.bussiness = bussiness;
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

  /** ================================================================
   *   ACTUALIZAR IMAGEN
  ==================================================================== */
  public imgTempP: any = null;
  public subirImagen!: File;
  cambiarImage(file: any): any{
    
    
    this.subirImagen = file.target.files[0];
    
    if (!this.subirImagen) { return this.imgTempP = null }
    
    
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file.target.files[0]);
    
    
    reader.onloadend = () => {
      this.imgTempP = reader.result;      
    }

    

  }

  /** ================================================================
   *  SUBIR IMAGEN fileImg
  ==================================================================== */
  @ViewChild('fileImg') fileImg!: ElementRef;
  public imgPerfil: string = 'no-image';
  subirImg(){
    
    this.bussinessService.updateImageBussiness( this.subirImagen, 'bussiness')
    .then( 
      (resp: {worker: any, ok: boolean}) => {

        this.bussiness.img = resp.worker.img;
        this.bussinessService.bussiness.img = resp.worker.img;
        
      }
    ).catch( err => {
      console.log(err);
      
    });
    
    this.fileImg.nativeElement.value = '';
    this.imgTempP = null;
    
  }

  /** ======================================================================
   * CAMBIAR CONTRASEÑA
  ====================================================================== */
  public formPassResetSubmitted: boolean = false;
  public formPassReset = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    repassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  resetPassword(){

    this.formPassResetSubmitted = true;

    if (this.formPassReset.invalid) {
      return;
    }

    if( this.formPassReset.value.password !==  this.formPassReset.value.repassword){
      Swal.fire('Error', 'Las contraseñas no son iguales', 'error');
      return;

    }

    this.bussinessService.updateBussiness(this.formPassReset.value, this.bussiness.bid!)
        .subscribe( ({bussiness}) => {
          
          this.formPassResetSubmitted = false;
          this.formPassReset.reset();
          Swal.fire('Estupendo', 'Tu contraseña se ha actualizado exitosamente!', 'success');
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        }); 


  }

  /** ======================================================================
   * VALIDATE FORM RECUPERAR CONTRASEÑA
  ====================================================================== */
  validateFormPass( campo:string ): boolean{

    if ( this.formPassReset.get(campo)?.invalid && this.formPassResetSubmitted ) {      
      return true;
    }else{
      return false;
    }

  }


  // FIN DE LA CLASE
}