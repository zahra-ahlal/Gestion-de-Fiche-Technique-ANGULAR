import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { 
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICategFiches } from '../models/categFiches.model';
import { ICout } from '../models/cout.model';
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
  fiche:Observable<IFiche>;
  constructor(private firestore: Firestore, private db: AngularFirestore) {
    this.fichesRef = db.collection(this.dbPath)
  }


  //CRUD FIRESTORE DATA BASE

  getAllFiches (): AngularFirestoreCollection<IFiche> {
    return this.fichesRef;
  }

  getTESTFiches(id:string){
    //@ts-ignore
    this.fiche = this.fichesRef.doc(id).valueChanges()
    return this.fiche;
  }

  getFichesByIDCategorie(categ : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('idCategFiche','==', categ ));
  }

  getFichesByID(id : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('id','==', id )); 
  }

  addFiche(f: IFiche,categ:string,listeIngr : IngredientInterface[],listEtape : IEtape[],temps : number,couts:ICout,pv : number){
    return this.db.collection(this.dbPath).add({
      nomPlat: f.nomPlat,
      nbCouverts: f.nbCouverts,
      tempsTot: temps,
      //listeEtapes: f.listeEtapes
      idCategFiche :categ,
      nomResponsable: f.nomResponsable,
      listeEtapes: listEtape,
      listeIngr : listeIngr,
      listeCouts:couts,
      prixV : pv
    });
  }
  

  getFicheByName(fiche : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('nomPlat','==', fiche ));
  }

  getNomFicheByID(id : String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('idF','==', id ));
  }
  
  
  getDocById(id:String): AngularFirestoreCollection<IFiche>{
    return this.db.collection(this.dbPath,ref => ref.where('idF','==', id ));
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