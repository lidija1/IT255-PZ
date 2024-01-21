import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; //za validaciju

import { OKompanijiComponent } from './o-kompaniji/o-kompaniji.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListaLetovaComponent } from './lista-letova/lista-letova.component';
import { KupovanjeKarteComponent } from './kupovanje-karte/kupovanje-karte.component';
import { KupljenaKartaComponent } from './kupljena-karta/kupljena-karta.component';


const routes: Routes = [
  { path: 'o-kompaniji', component: OKompanijiComponent },
  { path: 'login', component: LoginComponent},
  { path: 'letovi', component: AdminComponent },
  { path: 'lista-letova', component: ListaLetovaComponent },
  { path: 'kupovanje-karte/:id', component: KupovanjeKarteComponent },
  { path: 'kupljena-karta', component: KupljenaKartaComponent }

  // { path: '', redirectTo: '/phones', pathMatch:'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
