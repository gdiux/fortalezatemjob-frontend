import { Component, OnInit } from '@angular/core';

// MODELS
import { Worker } from 'src/app/models/worker.model';

// SERVICES
import { WorkerService } from '../../services/worker.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public worker!: Worker;

  constructor(  private workerService: WorkerService) { 
    this.worker = workerService.worker;
  }

  // LOGIN
  public login: boolean = false;

  ngOnInit(): void {

    // LOAD WORKER
    this.cargarWorker();

  }

  /** ================================================================
   *  CARGAR WORKER
  ==================================================================== */
  cargarWorker(){

    if (!localStorage.getItem('token')) {
      this.login = false;
      return;

    }else{
      this.login = true;
      this.workerService.validateTokenWorker()
      .subscribe( resp => {
        
        if (resp) {
          this.worker = this.workerService.worker;
          
        }else{

          localStorage.removeItem('token');
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
    window.location.reload();

  }

  // FIN DE LA CLASE
}
