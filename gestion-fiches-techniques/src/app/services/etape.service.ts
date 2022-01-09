import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IngredientComponent } from '../components/ingredient/ingredient.component';
import { IEtape } from '../models/etape.model';
import { IngredientInterface } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {

  dbPath = '/etapes'
  etapeRef: AngularFirestoreCollection<IEtape>;

  constructor(private db: AngularFirestore) { 
    this.etapeRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IEtape> {
    return this.etapeRef;
  }

  create(etape: IEtape,liste : IngredientInterface[]) {
    return this.etapeRef.add({
      nomEtape: etape.nomEtape,
      descritpion: etape.descritpion,
      duree: etape.duree,
      listeIngr : liste
    });
  }
  
  update(id: string, data: any): Promise<void> {
    return this.etapeRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.etapeRef.doc(id).delete();
  }

}
