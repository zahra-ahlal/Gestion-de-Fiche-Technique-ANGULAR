import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ICategFiches } from '../components/models/categFiches.model';
import { IFiche } from '../components/models/fiche.model';


@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private firestore: Firestore) { }

  /*getFiches(): Observable<IFiche[]> {
    const fichesRef = collection(this.firestore, 'fiches');
    return collectionData(fichesRef, { idField: 'idF' }) as Observable<IFiche[]>;
  }*/

  getFichesByCategorie(categ: ICategFiches): Observable<IFiche[]> {
    const fichesRef = collection(this.firestore, `categ/${categ.listeFiches}`);
    return collectionData(fichesRef, { idField: 'idF' }) as Observable<IFiche[]>;

  }
}
