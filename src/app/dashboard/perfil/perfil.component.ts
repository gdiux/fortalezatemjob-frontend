import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { JobsService } from '../../services/jobs.service';

import { environment } from '../../../environments/environment';
import { Job } from 'src/app/models/jobs.model';
import { EntrevistasService } from '../../services/entrevistas.service';
import { Entrevista } from '../../models/entrevista.model';
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
                private fileUploadService: FileUploadService,
                private jobsService: JobsService,
                private entrevistasService: EntrevistasService) { 

    this.worker = workerService.worker;

  }

  public url: any;

  ngOnInit(): void {
    this.url = base_url;

    // CARGAR TRABAJOS
    this.cargarJobsWorker();
    
    // CARGAR ENTREVISTAS
    this.cargarEntrevistas();
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
    city: [this.worker?.city || '', [Validators.required] ], 
    department: [this.worker?.department || '', [Validators.required]],
    barrio: [this.worker?.barrio || '', [Validators.required]],
  });

  edit(){

    this.editarForm.setValue({
      name: this.worker?.name || '', 
      cedula: this.worker?.cedula || '', 
      phone: this.worker?.phone || '', 
      address: this.worker?.address || '', 
      city: this.worker?.city || '', 
      department: this.worker?.department || '',
      barrio: this.worker?.barrio || '',
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
  
  public typeFile: 'archivos' | 'img' = 'img';
  selecArch(file: any): any{

    this.subirArchivo = file.files[0];
    
    if (!this.subirArchivo) {  
      return this.file!.nativeElement.value = '';       
    }

    let verExt = this.subirArchivo.name.split('.');
    let ext = verExt[verExt.length - 1];
    
    if (ext === 'jpg' || ext === 'png' || ext === 'jepg' || ext === 'webp' ) {      
      this.typeFile = 'img';
    }else if (ext === 'pdf' || ext === 'PDF' || ext === 'docx' || ext === 'xlsx' ) {
      this.typeFile = 'archivos';      
    }
    
    // VALID EXT
    const archExt = ['pdf', 'PDF', 'docx', 'xlsx', 'jpg', 'png', 'jepg', 'webp'];

    if (!archExt.includes(ext)) {
      Swal.fire('Atención', 'Solo se permiten archivos PDF - Word - Excel - JPG - PNG - WEBP', 'warning');
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
  public loading: boolean = false;

  subirArch(desc: any ): any{

    this.loading = true;
    
    this.fileUploadService.updateFiles( this.subirArchivo, this.typeFile, desc, this.worker.wid)
    .then( data => {  
    

      if (data.ok === false) {
        Swal.fire('Error', data.msg, 'error');

        this.imgProducto = 'no-image';    
        this.imgTemp = null;
        this.file!.nativeElement.value = '';
        this.loading = false;
        
        return;
      }
      
      this.worker.attachments = data.worker.attachments;
      this.loading = false;
      
      Swal.fire('Estupendo', 'Se ha guardado el archivo exitosamente!', 'success');

      
    });
    
    this.file!.nativeElement.value = '';
    
  }

  /** ================================================================
   *  ELIMINAR ARCHIVOS
  ==================================================================== */
  deleteFile(attachment: string){

    Swal.fire({
      title: 'Atención?',
      text: "Estas seguro de eliminar este archivo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.fileUploadService.deleteFile(attachment, this.worker.wid)
        .subscribe( ({worker}) => {
          
          this.worker.attachments = worker.attachments;
          Swal.fire('Estupendo', 'El archivo se elimino exitosamente', 'success');

        });

      }
    })

  };

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
    
    this.fileUploadService.updateImage( this.subirImagen, 'worker')
    .then( 
      (resp: {worker: Worker, ok: boolean}) => {
        
        this.worker.img = resp.worker.img;
        this.workerService.worker.img = resp.worker.img;
        
      }
    );
    
    this.fileImg.nativeElement.value = '';
    this.imgTempP = null;
    
  }

  /** ================================================================
   *  AGREGAR EXPERIENCIAS O HABILIDADES
  ==================================================================== */
  public formExpeSubmitted: boolean = false;
  public formExp = this.fb.group({
    name: ['',  [Validators.required]],
    years: [ 1, [Validators.required, Validators.min(1)] ]
  });

  agregarExp(){

    this.formExpeSubmitted = true;

    if (this.formExp.invalid) {
      return;
    }
    

    this.worker.skills.push(this.formExp.value);    

    this.workerService.updateWorker( {skills: this.worker.skills}, this.worker.wid )
        .subscribe( ({worker}) => {

          Swal.fire('Estupendo', 'Se ha agregado la habilidad exitosamente!', 'success');
          this.worker.skills = worker.skills;          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  /** ======================================================================
   * VALIDATE FORM EXPERIENCIA
  ====================================================================== */
  validateFormExp( campo:string ): boolean{

    if ( this.formExp.get(campo)?.invalid && this.formExpeSubmitted ) {      
      return true;
    }else{
      return false;
    }

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

    this.workerService.updateWorker(this.formPassReset.value, this.worker.wid)
        .subscribe( ({worker}) => {
          
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


  /** ======================================================================
   * ELIMINAR EXPERIENCIA
  ====================================================================== */
  eliminarExp( id: string ){

    Swal.fire({
      title: 'Atención?',
      text: "Estas seguro de eliminar esta habilidad o experiencia!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.workerService.deleteExpWorker(id)
            .subscribe( ({worker}) => {
              
              this.worker.skills = worker.skills;
              Swal.fire('Estupendo', 'Se ha eliminado la habilidad exitosamente!', 'success');
              
            }, (err) => {
              console.log(err);
              Swal.fire('Error', err.error.msg, 'error');
              
            })

      }
    })

  };

  /** ================================================================
   *  ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   *   ENTREVISTAS
  ==================================================================== */
  public entrevistas: Entrevista[] = [];

  cargarEntrevistas(){

    this.entrevistasService.loadEntrevistasWorker(this.worker.wid)
        .subscribe( ({entrevistas}) => {

          this.entrevistas = entrevistas;
          
        });

  }

  /** ================================================================
   *   CONFIRMAR ENTREVISTA ENTREVISTAS
  ==================================================================== */
  confirmarEntrevista(status: boolean, id: string){

    Swal.fire({
      title: 'Atención?',
      text: "Estas seguro de confirmar la entrevista para la fecha programada?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.entrevistasService.updateEntrevista({confirm: status}, id)
        .subscribe( ({entrevista}) => {

          this.cargarEntrevistas();
          Swal.fire('Estupendo', 'Se ha confirmado exitosamente la entrevista', 'success');          
          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        })

      }
    })
   

    

  }


  /** ======================================================================
   * ======================================================================
   * ======================================================================
   * ======================================================================
   * ======================================================================
   * ======================================================================
   * JOBS
  ====================================================================== */
  public jobs: Job[] = [];

  cargarJobsWorker(){

    this.jobsService.loadJobsWorker( this.worker.wid )
        .subscribe( ({jobs}) => {

          this.jobs = jobs;

        });

  }

  /** ================================================================
   *  SELECCIONAR TRABAJO
  ==================================================================== */
  public jobSelect!: Job;
  public dateActual: Date = new Date();

  selectJob(job: Job){

    this.jobSelect = job;

  }

  /** ================================================================
   *   PDF
  ==================================================================== */
  downloadPDF() {
    
    // Extraemos el
    const DATA = document.getElementById('pdf') as HTMLElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas( DATA , options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}.pdf`);
    });
  }


  // FIN DE LA CLASE

}
