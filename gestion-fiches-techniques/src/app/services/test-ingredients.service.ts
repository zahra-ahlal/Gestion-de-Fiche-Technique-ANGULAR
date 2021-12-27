import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs-compat/operator/map';
import { first } from 'rxjs/operators';
import { IngredientInterface } from 'src/models/ingredient.model';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root'
})
export class TestIngredientsService {

  dbPath = 'ingredients'
  constructor(private db: AngularFirestore) {
    //db.collection(this.dbPath, ref => ref.orderBy('allergene')
  }

  getAll(): AngularFirestoreCollection<IngredientInterface> {
    return this.db.collection(this.dbPath);
  }

  getByIdCateg(categ : String): AngularFirestoreCollection<IngredientInterface>{
    return this.db.collection(this.dbPath,ref => ref.where('idCategIngr','==', categ ));
  }

}