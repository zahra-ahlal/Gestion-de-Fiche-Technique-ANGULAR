import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IEtape } from '../components/models/etape.model';

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

  


}