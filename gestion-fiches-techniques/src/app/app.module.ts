import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoutComponent } from './components/cout/cout.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { EditCoutComponent } from './components/modal/edit-cout/edit-cout.component';
import { CoutsComponent } from './components/couts/couts.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { EditParametreComponent } from './components/modal/edit-parametre/edit-parametre.component';
import { CategoriesFichesComponent } from './components/categories-fiches/categories-fiches.component';
import { EditCategorieComponent } from './components/modal/edit-categorie/edit-categorie.component';

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
    EditCategorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
