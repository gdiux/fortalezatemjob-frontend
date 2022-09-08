import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styles: [
  ]
})
export class NoPageFoundComponent implements OnInit {

  constructor(  private router: Router) { }

  ngOnInit(): void {

    this.router.navigateByUrl('/');

  }

}
