import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { Job } from '../models/jobs.model';
import { LoadJobs } from '../interfaces/jobs.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(  private http: HttpClient) { }

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
   *   GET TOKEN WORKER
  ==================================================================== */
  get tokenWorker():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS WORKER
  ==================================================================== */
  get headersWorker() {
    return {
      headers: {
        'x-token': this.tokenWorker
      }
    }
  }

  /** ================================================================
   *   LOAD JOB BUSSINESS
  ==================================================================== */
  loadJobsBussiness(bussiness: string){
    return this.http.get<LoadJobs>(`${base_url}/jobs/all/${bussiness}`, this.headers);
  }

  /** ================================================================
   *   LOAD JOB BUSSINESS
  ==================================================================== */
  loadJobsWorker(worker: string){
    return this.http.get<LoadJobs>(`${base_url}/jobs/worker/${worker}`, this.headersWorker);
  }

  /** ================================================================
   *   POST JOB
  ==================================================================== */
  createJob(formaData: any){
    return this.http.post<{ ok: boolean, job: Job }>(`${base_url}/jobs`, formaData, this.headers);
  }

  /** ================================================================
   *   UPDATE JOB
  ==================================================================== */
  updateJob(formData: any, jid: string){
    return this.http.put<{ ok: boolean, job: Job }>(`${base_url}/jobs/${jid}`, formData, this.headers);
  }

  /** ================================================================
   *   DELETE JOB
  ==================================================================== */
  deleteJob( jid: string ){
    return this.http.delete(`${base_url}/jobs/${jid}`, this.headers);
  }


  // FIN DE LA CLASE
}
