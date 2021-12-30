import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { 
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ICategFiches } from '../models/categFiches.model';
import { IFiche } from '../models/fiche.model';
import { CategFichesService } from './categ-fiches.service';


@Injectable({
  providedIn: 'root'
})
export class FicheService {
  dbPath = 'fiches'
  fichesRef : AngularFirestoreCollection<IFiche>;

  constructor(private firestore: Firestore, private db: AngularFirestore) {
    this.fichesRef = db.collection(this.dbPath)
  }


  //CRUD FIRESTORE DATA BASE

  getAllFiches (): AngularFirestoreCollection<IFiche> {
    return this.fichesRef;
  }

  getFichesByIDCategorie(categ : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('idCategFiche','==', categ ));
  }

  /* idF?: string;
    nomPlat : string;
    nbCouverts: number;
    tempsTot: number;
    listeEtapes: Array<IEtape>;*/


  addFiche(f: IFiche){
    return this.db.collection(this.dbPath).add({
      nomPlat: f.nomPlat,
      nbCouverts: f.nbCouverts,
      tempsTot: f.tempsTot,
      //listeEtapes: f.listeEtapes
      idCategFiche :f.idCategFiche,
      nomResponsable: f.nomResponsable,
      listeEtapes: f.listeEtapes

    });
  }

  addFicheByIDCateg(f: IFiche,categ:string){
    return this.db.collection(this.dbPath).add({
      nomPlat: f.nomPlat,
      nbCouverts: f.nbCouverts,
      tempsTot: f.tempsTot,
      idCategFiche: categ,
      nomResponsable: f.nomResponsable
      //listeEtapes: f.listeEtapes
    });
  }

  updateFiche(id: string, data: any): Promise<void> {
    return this.fichesRef.doc(id).update(data);
  }

  deleteFiche(id: string): Promise<void> {
    return this.fichesRef.doc(id).delete();
  }

}
