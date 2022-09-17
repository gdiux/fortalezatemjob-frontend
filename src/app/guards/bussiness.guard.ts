import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

// SERVICES
import { BussinessService } from '../services/bussiness.service';

@Injectable({
  providedIn: 'root'
})
export class BussinessGuard implements CanActivate {

  constructor(  private bussinessService: BussinessService,
                private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.bussinessService.validateTokenBussiness()
      .pipe(
        tap( isauthenticated => {
          if (!isauthenticated) {
            this.router.navigateByUrl('/inicio');
          }
        })
      );

  }
  
}
