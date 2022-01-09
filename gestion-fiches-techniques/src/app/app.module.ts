import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";

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
import { EtapeComponent } from './components/etape/etape.component';

import { AccueilComponent } from './components/accueil/accueil.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoutComponent } from './components/cout/cout.component';

import { EditCoutComponent } from './components/modal/edit-cout/edit-cout.component';
import { CoutsComponent } from './components/couts/couts.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { EditParametreComponent } from './components/modal/edit-parametre/edit-parametre.component';
import { CategoriesFichesComponent } from './components/categories-fiches/categories-fiches.component';
import { EditCategorieComponent } from './components/modal/edit-categorie/edit-categorie.component';
//import { FicheComponent } from './components/fiche/fiche.component';
import { ListeFichesComponent } from './components/liste-fiches/liste-fiches.component';
import { EditFicheComponent } from './components/modal/edit-fiche/edit-fiche.component';
//import { EditFicheComponent } from './components/modal/edit-fiche/edit-fiche.component';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotificationComponent } from './components/notification/notification.component'
import { NotificationServicesService } from './services/notification-services.service';
import { AjoutFicheComponent } from './components/ajout-fiche/ajout-fiche.component';
import { MatCardModule } from '@angular/material/card';

import {DragDropModule} from '@angular/cdk/drag-drop'
import { EtapeService } from './services/etape.service';
import { ListeEtapesComponent } from './components/liste-etapes/liste-etapes.component';
import { EditIngredientsFicheComponent } from './modal/edit-ingredients-fiche/edit-ingredients-fiche.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';



 




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngredientComponent,
    EditIngredientComponent,
    ListeIngredientsComponent,
    CategoriesIngredientsComponent,
    EditCategorieIngredientComponent,
    EtapeComponent, 
    AccueilComponent,
    NotFoundComponent,
    CoutComponent,
    EditCoutComponent,
    CoutsComponent,
    ParametreComponent,
    EditParametreComponent,
    CategoriesFichesComponent,
    EditCategorieComponent,
    //FicheComponent,
    ListeFichesComponent,
    EditFicheComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    GalleryComponent,
    NotificationComponent,
    AjoutFicheComponent,
    ListeEtapesComponent,
    EditIngredientsFicheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    //RouterModule.forRoot(appRoutes),
    NgbModule,
    DragDropModule,
    //MatCardModule,
    //MatIconModule,
    //MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthGuardService,NotificationServicesService,{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }