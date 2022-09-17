import { Component, OnInit } from '@angular/core';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';
import { BussinessService } from '../../services/bussiness.service';
import { Bussiness } from 'src/app/models/bussiness.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public worker!: Worker;
  public bussiness!: Bussiness;

  constructor(  private workerService: WorkerService,
                private bussinessService: BussinessService) { 
    this.worker = workerService.worker;
    this.bussiness = bussinessService.bussiness;
  }

  // LOGIN
  public login: boolean = false;
  public loginBuss: boolean = false;

  ngOnInit(): void {

    // LOAD WORKER
    this.cargarUser();

  }

  /** ================================================================
   *  CARGAR WORKER
  ==================================================================== */
  cargarUser(){

    if (!localStorage.getItem('token')) {
      this.login = false;

      if (!localStorage.getItem('tokenBuss')) {
        this.loginBuss = false;
        return;
        
      }
      
      this.loginBuss = true;

      this.bussinessService.validateTokenBussiness()
          .subscribe( resp  => {

            if (resp) {
              this.bussiness = this.bussinessService.bussiness
            }else{
              localStorage.removeItem('token');
              localStorage.removeItem('tokenBuss');
              window.location.reload();
            }

          });


    }else{
      this.login = true;
      this.loginBuss = false;
      this.workerService.validateTokenWorker()
      .subscribe( resp => {
        
        if (resp) {
          this.worker = this.workerService.worker;
          
        }else{

          localStorage.removeItem('token');
          localStorage.removeItem('tokenBuss');
          window.location.reload();
        }
        

      });
    }

  }

  /** ================================================================
   *  LOGOUT
  ==================================================================== */
  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('tokenBuss');
    window.location.reload();

  }

  // FIN DE LA CLASE
}
