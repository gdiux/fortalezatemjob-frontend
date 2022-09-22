import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { LoadEntrevistas } from '../interfaces/load-entrevistas.interface';
import { Entrevista } from '../models/entrevista.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EntrevistasService {

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
   *   LOAD ENTREVISTAS WORKER
  ==================================================================== */
  loadEntrevistasWorker(worker: string){
    return this.http.get<LoadEntrevistas>(`${base_url}/entrevistas/worker/${worker}`, this.headers);
  }

  /** ================================================================
   *   UPDATE ENTREVISTA
  ==================================================================== */
  updateEntrevista(formData: any, id: string){
    return this.http.put<{ ok: boolean, entrevista: Entrevista }>(`${base_url}/entrevistas/${id}`, formData, this.headers);
  }

  /** ================================================================
   *   DELETE ENTREVISTA
  ==================================================================== */
  deleteEntrevista( id: string ){
    return this.http.delete(`${base_url}/entrevistas/${id}`, this.headers);
  }


  // FIN DE LA CLASE
}
