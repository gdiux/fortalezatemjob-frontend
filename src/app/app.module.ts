import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesModule } from './pages/pages.module';
import { BussinessModule } from './bussiness/bussiness.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    DashboardModule,
    BussinessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
