import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { IParametre } from '../components/models/parametre.model';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private firestore: Firestore) { }

 
  getParametres(): Observable<IParametre[]> {
    const parametresRef = collection(this.firestore, 'parametres');
    return collectionData(parametresRef, { idField: 'idP' }) as Observable<IParametre[]>;
  }

  getParametreByID(id: string) {
    const coutRef = doc(this.firestore, `parametres/${id}`);
    return docData(coutRef, { idField: 'idP' }) as Observable<IParametre>;
  }

  updateParametre(parametre: IParametre) {
    const parametreDocRef = doc(this.firestore, `parametres/${parametre.idP}`);
    return setDoc(parametreDocRef, parametre);
  }

  modifyCoutHorMoy(parametre : IParametre, coutHorMoy: number) {
    const parametreDocRef = doc(this.firestore, `parametres/${parametre.idP}`);
    return updateDoc(parametreDocRef, { coutHorMoy: coutHorMoy });
  }

  modifyCoutHorForf(parametre : IParametre,coutHorForf: number) {
    const parametreDocRef = doc(this.firestore, `parametres/${parametre.idP}`);
    return updateDoc(parametreDocRef, { coutHorForf: coutHorForf });
  }

  modifyCoeffMulti(parametre : IParametre,coeffMulti: number) {
    const parametreDocRef = doc(this.firestore, `parametres/${parametre.idP}`);
    return updateDoc(parametreDocRef, { coeffMulti: coeffMulti });
  }

  modifyCoeff(parametre : IParametre,coeff: number) {
    const parametreDocRef = doc(this.firestore, `parametres/${parametre.idP}`);
    return updateDoc(parametreDocRef, { coeff: coeff });
  }

}
