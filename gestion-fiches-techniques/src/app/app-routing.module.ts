import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
//import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', component: AccueilComponent, },
  //{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }