import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoutComponent } from './components/cout/cout.component';
import { CoutsComponent } from './components/couts/couts.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { CategFichesService } from './services/categ-fiches.service';
import { CategoriesFichesComponent } from './components/categories-fiches/categories-fiches.component';
import { ListeFichesComponent } from './components/liste-fiches/liste-fiches.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { GalleryComponent } from './components/gallery/gallery.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, },
  { path: 'parametres', component: ParametreComponent, },
  { path: 'categoriesFiches', component: CategoriesFichesComponent, },
  { path: 'test', component: GalleryComponent, },
  {path: 'image/upload', component: UploadFormComponent, },
  { path: 'image/list', component: UploadListComponent, },
  

  //{ path: 'parametres/edit', component: ParametreComponent, },
  { path: ':idCategFiche/:nomCateg/listeFiches', component: ListeFichesComponent, },
  
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }