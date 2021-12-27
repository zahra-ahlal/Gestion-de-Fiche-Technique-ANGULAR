import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IEtape } from 'src/models/etape.model';

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

  create(etape: IEtape): any {
    return this.etapeRef.add({ ...etape });
  }

  update(id: string, data: any): Promise<void> {
    return this.etapeRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.etapeRef.doc(id).delete();
  }

}
