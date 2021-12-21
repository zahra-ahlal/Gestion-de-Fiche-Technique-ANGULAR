import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoutComponent } from './cout/cout.component';
import { CoutsComponent } from './couts/couts.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, },
  { path: 'parametres', component: CoutComponent, },
  { path: 'parametres/listCout', component: CoutsComponent, },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }