import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//komponente
import { OKompanijiComponent } from './o-kompaniji/o-kompaniji.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListaLetovaComponent } from './lista-letova/lista-letova.component';
import { KupovanjeKarteComponent } from './kupovanje-karte/kupovanje-karte.component';
import { KupljenaKartaComponent } from './kupljena-karta/kupljena-karta.component';
import { AuthGuard } from './services/auth.guard';
import { PrethodneKupovineComponent } from './prethodne-kupovine/prethodne-kupovine.component';


@NgModule({
  declarations: [
    AppComponent,
    OKompanijiComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent,
    ListaLetovaComponent,
    KupovanjeKarteComponent,
    KupljenaKartaComponent,
    PrethodneKupovineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
