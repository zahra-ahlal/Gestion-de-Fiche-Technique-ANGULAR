import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ParametreComponent } from './components/parametre/parametre.component';
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
import { ViewFicheComponent } from './components/view-fiche/view-fiche.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BrouillonComponent } from './components/brouillon/brouillon.component';


const routes: Routes = [
  { path: 'accueil', canActivate:[AuthGuardService] ,component: AccueilComponent, },
  { path: 'parametres', canActivate:[AuthGuardService] ,component: ParametreComponent, },
  { path: 'categoriesFiches', canActivate:[AuthGuardService], component: CategoriesFichesComponent, },
  { path: 'test', canActivate:[AuthGuardService],component: GalleryComponent, },
  {path: 'image/upload', canActivate:[AuthGuardService], component: UploadFormComponent, },
  { path: 'image/list', canActivate:[AuthGuardService], component: UploadListComponent, },
  { path: 'ajoutFiche', canActivate:[AuthGuardService], component: AjoutFicheComponent, },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', canActivate:[AuthGuardService], component: LoginComponent }, 
  { path: 'categorieIngredients', canActivate:[AuthGuardService], component: CategoriesIngredientsComponent },
  { path: 'listeIngr/:nomCateg/:idCategIngr', canActivate:[AuthGuardService], component: ListeIngredientsComponent},
  { path: 'ingredients/:idCategIngr', canActivate:[AuthGuardService], component: IngredientComponent },
  { path: 'ajoutIngredient', canActivate:[AuthGuardService], component: IngredientComponent },
  { path: 'etape', canActivate:[AuthGuardService], component: EtapeComponent },
  { path: 'selctionnerIngr',canActivate:[AuthGuardService], component: EditIngredientsFicheComponent },
  { path: 'rechercher',canActivate:[AuthGuardService], component: BrouillonComponent },
  { path: ':idFiche', canActivate:[AuthGuardService], component: ViewFicheComponent, },
  { path: ':idCategFiche/:nomCateg/listeFiches',canActivate:[AuthGuardService], component: ListeFichesComponent, },
  { path: ':idCategFiche/:nomCateg/listeFiches/ajoutFiche', canActivate:[AuthGuardService],component: AjoutFicheComponent, },
  //{ path: 'profil', component: ProfilComponent, },
  { path: 'modifierFiche/:idFiche', component: AjoutFicheComponent, },
  { path: 'historiqueVentes/ventes', component: ProfilComponent, },
  
  //
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }