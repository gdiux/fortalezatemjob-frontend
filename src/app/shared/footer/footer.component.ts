import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  public year = new Date().getFullYear();
  public cookie: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // COOKIES
    let cokies = localStorage.getItem('cookies');

    if (!cokies) {
      this.cookie = false;
    }else{
      this.cookie = true;
    }
    
    // PARALLAX FOOTER
    let footer:any = document.querySelector('footer');
    document.querySelector('.contenido')?.setAttribute('style', `margin-bottom:${footer.offsetHeight}px; position: relative; background: #fff;`);
    

  }


  /**=======================================================================
  * ACCEPT COOKIES
  ======================================================================== */
  acceptCokies(){
    localStorage.setItem('cookies', 'true');
    this.cookie = true;
  }

}
