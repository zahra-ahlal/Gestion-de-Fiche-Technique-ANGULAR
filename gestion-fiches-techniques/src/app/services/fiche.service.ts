import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ICategFiches } from '../components/models/categFiches.model';
import { IFiche } from '../components/models/fiche.model';
import { CategFichesService } from './categ-fiches.service';


@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private firestore: Firestore,private categService: CategFichesService) { }

  getFichesByIDCategorie(idCateg: string): Observable<IFiche[]> {

    //return(this.categService.getFichesByCategID(categ.idCategFiche));
    //const categFichesDocRef = collection(this.firestore, `categFiches`) ;


    const fichesRef = collection(this.firestore, `fiches`) ;
    //idCategFiches/${idCateg}
    //console.log('collectiopn '+ fichesRef)
    /*const fichesQuery = query(fichesRef, where("idCategFiche", "==", categFichesDocRef.id));
    console.log('collectiopn '+ fichesQuery)*/
    return collectionData(fichesRef, { idField: 'idF' }) as Observable<IFiche[]>;
  }
}
