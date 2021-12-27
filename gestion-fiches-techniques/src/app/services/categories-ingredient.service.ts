import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import { CategorieIngredientInterface } from 'src/models/categIngr.model';
import { IngredientInterface } from 'src/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesIngredientService {

  constructor(private firestore: Firestore) { }
  
  getCategoriesIngredient(): Observable<CategorieIngredientInterface[]> {
    const categIngrRef = collection(this.firestore, 'categIngr');
    return collectionData(categIngrRef, { idField: 'idCategIngr' }) as Observable<CategorieIngredientInterface[]>;
  }

  /*getCategIngrByID(id: string) {
    const categIngrRef = doc(this.firestore, `categIngr/${id}`);
    return docData(categIngrRef, { idField: 'nomCategIngr' }) as Observable<CategorieIngredientInterface>;
  }*/

  getIngredientsByIdCateg(id: Number) {
    const categIngrRef = doc(this.firestore, `categIngr/${id}`);
    return docData(categIngrRef, { idField: 'idCategIngr' }) as Observable<CategorieIngredientInterface>;
  }

  addCategorieIngredient(categorie: CategorieIngredientInterface) {
    const categIngrRef = collection(this.firestore, 'categIngr'); 
    return addDoc(categIngrRef, categorie);
  }

  deleteIngredient(categorie: CategorieIngredientInterface) {
    const categIngrRef = doc(this.firestore, `categIngr/${categorie.idCategIngr}`);
    return deleteDoc(categIngrRef);
  }

}
