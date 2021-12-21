import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import { IngredientInterface } from 'src/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private firestore: Firestore) { }

  addIngredient(ingredient: IngredientInterface) {
    const ingredientRef = collection(this.firestore, 'ingredients'); 
    return addDoc(ingredientRef, ingredient);
  }

  getIngredients(): Observable<IngredientInterface[]> {
    const ingredientRef = collection(this.firestore, 'ingredients');
    return collectionData(ingredientRef, { idField: 'idIngr' }) as Observable<IngredientInterface[]>;
  }

  deleteIngredient(ingredient: IngredientInterface) {
    const ingredientRef = doc(this.firestore, `ingredients/${ingredient.idIngr}`);
    return deleteDoc(ingredientRef);
  }

  getIngredientByID(id: string) {
    const ingredientRef = doc(this.firestore, `ingredients/${id}`);
    return docData(ingredientRef, { idField: 'idIngr' }) as Observable<IngredientInterface>;
  }
  
  updateIngredient(ingredient: IngredientInterface) {
    const ingredientRef = doc(this.firestore, `ingredients/${ingredient.idIngr}`);
    return setDoc(ingredientRef, ingredient);
  }
  
  modifyAllergene(ingredient: IngredientInterface, allerg: boolean) {
    const ingredientRef = doc(this.firestore, `ingredients/${ingredient.idIngr}`);
    return updateDoc(ingredientRef, { allergene: allerg });
  }
  

}
