import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

// MODELS
import { Bussiness } from '../models/bussiness.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BussinessService {

  public bussiness!: Bussiness;

  constructor(  private http: HttpClient,
                private router: Router) { }

  
  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('tokenBuss') || '';
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
   *  LOGIN BUSSINESS
  ==================================================================== */
  loginBussiness( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login/bussiness`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('tokenBuss', resp.token);
                        }),
                        catchError( error => of(false) )
                      );
  }

  /** ================================================================
   *   VALIDATE TOKEN OR RENEW TOKEN BUSSIENSS
  ==================================================================== */
  validateTokenBussiness():Observable<boolean>{
    const token = localStorage.getItem('tokenBuss') || '';
    
    return this.http.get(`${base_url}/login/renew/bussiness`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        
        const {name, nit, phone, email, address, city, department, barrio, zip, status, google, img, confirm, bid, bussiness} = resp.bussiness;

        this.bussiness = new Bussiness(name, nit, phone, email, address, city, department, barrio, zip, status, google, img, '', confirm, bid, bussiness);        
        
        localStorage.setItem('tokenBuss', resp.token);

      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

  /** ================================================================
   *   POST BUSSINESS
  ==================================================================== */
  createBussiness(formaData: any){
    return this.http.post<{ ok: boolean, bussiness: Bussiness }>(`${base_url}/bussiness`, formaData);
  }

  /** ================================================================
   *   UPDATE BUSSINESS
  ==================================================================== */
  updateBussiness(formData: any, bid: string){
    return this.http.put<{ ok: boolean, bussiness: Bussiness }>(`${base_url}/bussiness/${bid}`, formData, this.headers);
  }

  /** ================================================================
   *   RECUPERAR PASSWORD
  ==================================================================== */
  recuperarPasswordBussiness( formData: any ){
    return this.http.post(`${base_url}/login/recuperar/password/bussiness`, formData);
  }

  /** ================================================================
   *   UPDATE IMAGES
  ==================================================================== */
  async updateImageBussiness(
    archivo: File,
    type: 'bussiness' ,
  ){
      
      const url = `${base_url}/uploads/${type}`;

      const formData = new FormData();
      formData.append('image', archivo);


      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('tokenBuss') || ''
        },
        body: formData
      });

      return await resp.json();

  }

  // FIN DE LA CLASE
}
