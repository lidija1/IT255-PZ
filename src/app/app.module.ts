import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OKompanijiComponent } from './o-kompaniji/o-kompaniji.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { ListaLetovaComponent } from './lista-letova/lista-letova.component';
import { KupovanjeKarteComponent } from './kupovanje-karte/kupovanje-karte.component';
import { KupljenaKartaComponent } from './kupljena-karta/kupljena-karta.component';


@NgModule({
  declarations: [
    AppComponent,
    OKompanijiComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent,
    ListaLetovaComponent,
    KupovanjeKarteComponent,
    KupljenaKartaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
