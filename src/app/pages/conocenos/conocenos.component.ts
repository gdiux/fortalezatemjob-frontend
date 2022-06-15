import { Component, OnInit } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { EffectFade, Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config = {
    
    pagination: { clickable: true, dynamicBullets: true },
    grabCursor: true
  };

}
