import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";

import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoutComponent } from './components/cout/cout.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCoutComponent } from './components/modal/edit-cout/edit-cout.component';
import { CoutsComponent } from './components/couts/couts.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { EditParametreComponent } from './components/modal/edit-parametre/edit-parametre.component';
import { CategoriesFichesComponent } from './components/categories-fiches/categories-fiches.component';
import { EditCategorieComponent } from './components/modal/edit-categorie/edit-categorie.component';
//import { FicheComponent } from './components/fiche/fiche.component';
import { ListeFichesComponent } from './components/liste-fiches/liste-fiches.component';
import { AngularFireModule } from '@angular/fire/compat';
import { EditFicheComponent } from './components/modal/edit-fiche/edit-fiche.component';
//import { EditFicheComponent } from './components/modal/edit-fiche/edit-fiche.component';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component'

@NgModule({
  declarations: [
    AppComponent,
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
    UploadDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
