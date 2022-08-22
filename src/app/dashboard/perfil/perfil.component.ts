import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { environment } from '../../../environments/environment';
const base_url = environment.base_url;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public worker!: Worker;

  constructor(  private workerService: WorkerService,
                private fb: FormBuilder,
                private fileUploadService: FileUploadService) { 

    this.worker = workerService.worker;

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
    name: [this.worker?.name || '' , [Validators.required] ], 
    cedula: [this.worker?.cedula || '' , [Validators.required, Validators.minLength(6)] ], 
    phone: [this.worker?.phone || '' , [Validators.required] ], 
    address: [this.worker?.address || '' , [Validators.required] ], 
    city: [this.worker?.city || '' ], 
    department: [this.worker?.department || '']
  });

  edit(){

    this.editarForm.setValue({
      name: this.worker?.name || '', 
      cedula: this.worker?.cedula || '', 
      phone: this.worker?.phone || '', 
      address: this.worker?.address || '', 
      city: this.worker?.city || '', 
      department: this.worker?.department || '',
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

  /** ================================================================
   *  ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   *   SUBIR ARCHIVOS
  ==================================================================== */
  public imgTemp: any = null;
  public imgTempAft: any = null;
  
  public desc: 'archivo' | 'img' = 'img';
  selecArch(file: any): any{

    this.subirArchivo = file.files[0];
    
    if (!this.subirArchivo) {  
      return this.file!.nativeElement.value = '';       
    }

    let verExt = this.subirArchivo.name.split('.');
    let ext = verExt[verExt.length - 1];
    this.desc = 'archivo';
    
    // VALID EXT
    const archExt = ['pdf', 'docx', 'xlsx'];

    if (!archExt.includes(ext)) {
      Swal.fire('Atención', 'Solo se permiten archivos PDF - Word - Excel', 'warning');
      return this.file!.nativeElement.value = '';
    }
       
    // FIN DE CAMBIAR IMAGEN
  }
      
  /** ================================================================
   *  SUBIR ARCHIVOS
  ==================================================================== */
  @ViewChild('file') file!: any;
  public subirArchivo!: File;

  public imgProducto: string = 'no-image';

  subirArch( ): any{
    
    this.fileUploadService.updateImage( this.subirArchivo, 'archivos', this.worker.wid!, this.desc)
    .then( data => {  

      if (data.ok === false) {
        Swal.fire('Error', data.msg, 'error');

        this.imgProducto = 'no-image';    
        this.imgTemp = null;
        this.file!.nativeElement.value = '';

        return;
      }

      this.worker.attachments.push({
        attachment: data.nombreArchivo
      });
      
    });
    
    this.file!.nativeElement.value = '';
    
  }


  // FIN DE LA CLASE

}
