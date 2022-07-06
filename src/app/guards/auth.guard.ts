import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WorkerService } from '../services/worker.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(  private workerService:WorkerService,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      return this.workerService.validateTokenWorker()
        .pipe(
          tap( isauthenticated => {
            if (!isauthenticated) {
              this.router.navigateByUrl('/');
            }
          })
        );

  }
  
}
