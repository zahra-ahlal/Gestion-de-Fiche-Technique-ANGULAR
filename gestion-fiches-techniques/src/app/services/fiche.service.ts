import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { 
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICategFiches } from '../models/categFiches.model';
import { IEtape } from '../models/etape.model';
import { IFiche } from '../models/fiche.model';
import { IngredientInterface } from '../models/ingredient.model';
import { CategFichesService } from './categ-fiches.service';


@Injectable({
  providedIn: 'root'
})
export class FicheService {
  dbPath = '/fiches'
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

  getFichesByID(id : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('idF','==', id ));
  }
  


  addFiche(f: IFiche,listeIngr : IngredientInterface[],listEtape : IEtape[]){
    return this.db.collection(this.dbPath).add({
      nomPlat: f.nomPlat,
      nbCouverts: f.nbCouverts,
      tempsTot: f.tempsTot,
      //listeEtapes: f.listeEtapes
      idCategFiche :f.idCategFiche,
      nomResponsable: f.nomResponsable,
      listeEtapes: listEtape,
      listeIngr : listeIngr,
      listeCouts:f.listeCouts

    });
  }

  

  getFicheByName(fiche : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('nomPlat','==', fiche ));
  }
  
  
  getDocById(): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath);
  }

  //modifier le stock quand impression pour vente
  getData(){
    var nomPlat : any;
    const fichzeService : FicheService = null;
    this.getAllFiches().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      nomPlat = data;
      console.log("nomPlat"+data);
    });
    return nomPlat;
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
