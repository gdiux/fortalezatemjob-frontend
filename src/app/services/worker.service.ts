import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// MODELS
import { Worker } from '../models/worker.model';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  public worker!: Worker;
  public auth2: any;

  constructor(  private http: HttpClient,
                private router: Router) {
                }

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
   *  LOGIN WORKER
  ==================================================================== */
  loginWorker( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.token);
                        }),
                        catchError( error => of(false) )
                      );
  }

  /** ================================================================
   *   VALIDATE TOKEN OR RENEW TOKEN
  ==================================================================== */
  validateTokenWorker():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${base_url}/login/renew/worker`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        
        const {name, cedula, phone, email, address, city, department, zip, status, google, type, img, fecha, wid, attachments} = resp.worker;

        this.worker = new Worker( name, cedula, phone, email, address, city, department, zip, status, google, type, img, fecha, wid, attachments );        
              
        localStorage.setItem('token', resp.token);

      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

  /** ================================================================
   *   POST WORKER
  ==================================================================== */
  createWorker(formaData: any){
    return this.http.post<{ ok: boolean, worker: Worker }>(`${base_url}/worker`, formaData);
  }

  /** ================================================================
   *   UPDATE WORKER
  ==================================================================== */
  updateWorker(formData: any, wid: string){
    return this.http.put<{ ok: boolean, worker: Worker }>(`${base_url}/worker/${wid}`, formData, this.headers);
  }






  // FIN DE LA CLASE
}
