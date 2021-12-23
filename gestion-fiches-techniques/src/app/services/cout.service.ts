import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ICout } from '../components/models/cout.model';

@Injectable({
  providedIn: 'root'
})
export class CoutService {

  constructor(private firestore: Firestore) {}

  addCout(cout: ICout) {
    const coutsRef = collection(this.firestore, 'couts'); 
    return addDoc(coutsRef, cout);
  }

  getCouts(): Observable<ICout[]> {
    const coutsRef = collection(this.firestore, 'couts');
    return collectionData(coutsRef, { idField: 'idCout' }) as Observable<ICout[]>;
  }


  deleteCout(cout: ICout) {
    const coutDocRef = doc(this.firestore, `couts/${cout.idCout}`);
    console.log(cout.idCout);
    return deleteDoc(coutDocRef);
  }

  getCoutByID(id: string) {
    const coutRef = doc(this.firestore, `couts/${id}`);
    return docData(coutRef, { idField: 'idCout' }) as Observable<ICout>;
  }
  
  updateCout(cout: ICout) {
    const coutDocRef = doc(this.firestore, `couts/${cout.idCout}`);
    return setDoc(coutDocRef, cout);
  }
  
  modifyCoutMatiere(cout: ICout, amount: number) {
    const coutDocRef = doc(this.firestore, `couts/${cout.idCout}`);
    return updateDoc(coutDocRef, { coutMatiere: amount });
  }

  modifyCoutPersonnel(cout: ICout, amount: number) {
    const coutDocRef = doc(this.firestore, `couts/${cout.idCout}`);
    return updateDoc(coutDocRef, { coutPersonnel: amount });
  }

  modifyCoutFluides(cout: ICout, amount: number) {
    const coutDocRef = doc(this.firestore, `couts/${cout.idCout}`);
    return updateDoc(coutDocRef, { coutFluides: amount });
  }
}
