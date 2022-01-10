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
import { AjoutFicheComponent } from './components/ajout-fiche/ajout-fiche.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesIngredientsComponent } from './components/categories-ingredients/categories-ingredients.component';
import { ListeIngredientsComponent } from './components/liste-ingredients/liste-ingredients.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { EtapeComponent } from './components/etape/etape.component';
import { EditIngredientsFicheComponent } from './modal/edit-ingredients-fiche/edit-ingredients-fiche.component';
import { BrouillonComponent } from './components/brouillon/brouillon.component';
import { ViewFicheComponent } from './components/view-fiche/view-fiche.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, },
  { path: 'parametres', component: ParametreComponent, },
  { path: 'categoriesFiches', component: CategoriesFichesComponent, },
  { path: 'test', component: GalleryComponent, },
  {path: 'image/upload', component: UploadFormComponent, },
  { path: 'image/list', component: UploadListComponent, },
  { path: 'ajoutFiche', component: AjoutFicheComponent, },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'categorieIngredients', component: CategoriesIngredientsComponent },
  { path: 'listeIngr/:nomCateg/:idCategIngr', component: ListeIngredientsComponent},
  { path: 'ingredients/:idCategIngr', component: IngredientComponent },
  { path: 'ajoutIngredient', component: IngredientComponent },
  { path: 'etape', component: EtapeComponent },
  { path: 'listeEtapes', component: EtapeComponent },
  { path: 'br', component: BrouillonComponent },
  { path: 'selctionnerIngr', component: EditIngredientsFicheComponent },
  { path: 'rechercher', component: BrouillonComponent },
  { path: ':idFiche', component: ViewFicheComponent, },
  //{ path: 'parametres/edit', component: ParametreComponent, },
  { path: ':idCategFiche/:nomCateg/listeFiches', component: ListeFichesComponent, },
  { path: ':idCategFiche/:nomCateg/listeFiches/ajoutFiche', component: AjoutFicheComponent, },
  
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }