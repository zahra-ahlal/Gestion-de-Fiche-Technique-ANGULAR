import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { where } from 'firebase/firestore';

import { Observable } from 'rxjs';
import { ICategFiches } from '../models/categFiches.model';

@Injectable({
  providedIn: 'root'
})
export class CategFichesService {


  dbPath = '/categFiches'
  categfichesRef: AngularFirestoreCollection<ICategFiches>;

  constructor(private firestore: Firestore, private db: AngularFirestore) { 
    this.categfichesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<ICategFiches> {
    return this.categfichesRef;
  }
 

  getCategFiches(): Observable<ICategFiches[]> {
    const categFichesRef = collection(this.firestore, 'categFiches');
    return collectionData(categFichesRef, { idField: 'idCategFiche' }) as Observable<ICategFiches[]>;
  }

 
  getCategFichesByID(id: string) {
    const categFichesRef = doc(this.firestore, `categFiches/${id}`);
    return docData(categFichesRef, { idField: 'idCategFiche' }) as Observable<ICategFiches>;
  }

  addCategFiches(categ: ICategFiches) {
    const categFichesRef = collection(this.firestore, 'categFiches'); 
    return addDoc(categFichesRef, categ);
  }

  
  deleteCategFiches(categ: ICategFiches) {
    const categFichesRef = doc(this.firestore, `categFiches/${categ.idCategFiche}`);
    return deleteDoc(categFichesRef);
  }
 

}



