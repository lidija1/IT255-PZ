import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; //za validaciju

import { OKompanijiComponent } from './o-kompaniji/o-kompaniji.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListaLetovaComponent } from './lista-letova/lista-letova.component';
import { KupovanjeKarteComponent } from './kupovanje-karte/kupovanje-karte.component';
import { KupljenaKartaComponent } from './kupljena-karta/kupljena-karta.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { Poc1Component } from './poc1/poc1.component';
import { Poc2Component } from './poc2/poc2.component';
import { Poc3Component } from './poc3/poc3.component';
import { AuthGuard } from './services/auth.guard';
import { PrethodneKupovineComponent } from './prethodne-kupovine/prethodne-kupovine.component';


const routes: Routes = [
  { path: 'o-kompaniji', component: OKompanijiComponent },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]  },
  { path: 'lista-letova', component: ListaLetovaComponent },
  { path: 'kupovanje-karte/:id', component:  KupovanjeKarteComponent},//KupovanjeKarteComponent
  { path: 'kupljena-karta', component: KupljenaKartaComponent },
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'poc1', component: Poc1Component },
  { path: 'poc2', component: Poc2Component },
  { path: 'poc3', component: Poc3Component },
  { path: 'prethodne-kupovine', component: PrethodneKupovineComponent },
  { path: 'kupovine', component: PrethodneKupovineComponent },



  { path: '', redirectTo: '/pocetna', pathMatch:'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
