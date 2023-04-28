import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Worker } from '../models/worker.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(  private http: HttpClient) { }

   /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *   UPDATE IMAGES
  ==================================================================== */
  async updateImage(
    archivo: File,
    type: 'worker' | 'archivos' | 'bussiness' ,
  ){
      
      const url = `${base_url}/uploads/${type}`;

      const formData = new FormData();
      formData.append('image', archivo);


      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      return await resp.json();

  }

  /** ================================================================
   *   UPDATE FILES
  ==================================================================== */
  async updateFiles(
    archivo: File,
    type: 'img' | 'archivos' ,
    desc: 'Pruebas Psicotecnicas' | 'Examen Medico' |'Cedula Ciudadania' | 'Hoja de vida' | 'Registro Civil' | 'Registro de Matrimonio' | 'EPS' | 'Pensiones' | 'Cesantias' | 'Banco' | 'Caja de Compensacion' | 'RUT' | 'Antecedentes',
    wid: string,
    tipo: string, 
    parentesco: string, 
    numero: string,
    beneficiario: string,
  ){
      
      const url = `${base_url}/uploads/files/${type}/${desc}/${wid}/${tipo}/${parentesco}/${numero}/${beneficiario}`;

      const formData = new FormData();
      formData.append('image', archivo);


      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      return await resp.json();

  }

  /** ================================================================
   *   DELETE IMAGES
  ==================================================================== */
  deleteFile(attachment: string, wid: string){

    return this.http.delete<{worker: Worker, ok: boolean}>(`${base_url}/uploads/delete/${attachment}/${wid}`, this.headers);

  }



  // FIN DE LA CLASE

}
