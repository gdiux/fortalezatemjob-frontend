import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
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
    type: 'worker' | 'archivos' ,
    id: string,
    desc: 'archivo' | 'img' 
  ){
      
      const url = `${base_url}/uploads/${type}/${id}?desc=${desc}`;

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
  deleteImg(
    type: 'worker' | 'archivos' ,
    id: string,
    desc: 'archivo' | 'img',
    img: string
  ){

    return this.http.delete(`${base_url}/uploads/delete/${type}/${id}/${desc}/${img}`, this.headers);

  }



  // FIN DE LA CLASE

}
