import { Component, OnInit } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  /**======================================================================
   * SWIPER
  ===================================================================== */
  config = {
    pagination: { clickable: true, dynamicBullets: true },
    grabCursor: true
  };


  // FIN DE LA CLASE
}
