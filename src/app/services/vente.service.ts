import { Injectable,Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs-compat';
import { map } from 'rxjs-compat/operator/map';
import { first } from 'rxjs/operators';
import { IVente } from '../models/vente.model';
import { IFiche } from '../models/fiche.model';
import { IngredientInterface } from '../models/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class VenteService {
  dbPath = '/ventes'
  ventesRef : AngularFirestoreCollection<IFiche>;
  vente:Observable<IFiche>;

  constructor(private db: AngularFirestore) { }

  getAllVentes(): AngularFirestoreCollection<IVente> {
    return this.db.collection(this.dbPath);
  }

  addVente(f:IFiche,d:string){
    return this.db.collection(this.dbPath).add({
      fiche:f,
      date: d
    });
  }

  getVente(f:IFiche): AngularFirestoreCollection<IVente> {
    //@ts-ignore
    //this.vente = this.vente.doc(f.).valueChanges()
    return this.db.collection(this.dbPath,ref => ref.where('fiche','==', f ));
  }

}
