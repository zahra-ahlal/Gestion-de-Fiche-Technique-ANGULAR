import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {APP_BASE_HREF} from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { EditIngredientComponent } from './modal/edit-ingredient/edit-ingredient.component';
import { ListeIngredientsComponent } from './components/liste-ingredients/liste-ingredients.component';
import { CategoriesIngredientsComponent } from './components/categories-ingredients/categories-ingredients.component';
import { EditCategorieIngredientComponent } from './modal/edit-categorie-ingredient/edit-categorie-ingredient.component';
import { AngularFireModule } from '@angular/fire/compat';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'ingredient', component: IngredientComponent },
  { path: 'categorieIngredients', component: CategoriesIngredientsComponent },
  { path: 'listeIngr', component: ListeIngredientsComponent},
  { path: 'listeIngr/:idCategIngr', component: ListeIngredientsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngredientComponent,
    EditIngredientComponent,
    ListeIngredientsComponent,
    CategoriesIngredientsComponent,
    EditCategorieIngredientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthService, AuthGuardService,{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }