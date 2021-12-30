import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { query } from '@firebase/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IngredientInterface } from '../components/models/ingredient.model';
import { ICategFiches } from '../components/models/categFiches.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  dbPath = 'ingredients'

  constructor(private firestore: Firestore, private db: AngularFirestore,
    /*private categService : ICategFiches*/) { }


  getAll(): AngularFirestoreCollection<IngredientInterface> {
    return this.db.collection(this.dbPath);
  }

  getByIdCateg(categ : String): AngularFirestoreCollection<IngredientInterface>{
    return this.db.collection(this.dbPath,ref => ref.where('idCategIngr','==', categ ));
  }  

  /***********************
   * 
   * 
   * FIRESTORE
   * 
   * 
   * ******************* */
  addIngredient(ingredient: IngredientInterface) {
    const ingredientRef = collection(this.firestore, 'ingredients'); 
    return addDoc(ingredientRef, ingredient);
  }

  addIngrByIDCateg(i: IngredientInterface,categ:string){
    return this.db.collection(this.dbPath).add({
      nomIngr : i.nomIngr,
      prixU : i.prixU,
      unite : i.unite,
      allergene : i.allergene ,
      stock : i.stock ,
      idCategIngr: categ
    });
  }
  /*getIngredients(): Observable<IngredientInterface[]> {
    const ingredientRef = collection(this.firestore, 'ingredients');
    return collectionData(ingredientRef, { idField: 'idIngr' }) as Observable<IngredientInterface[]>;
  }*/



  getIngredientByID(id: string) {
    const ingredientRef = doc(this.firestore, `ingredients/${id}`);
    return docData(ingredientRef, { idField: 'idIngr' }) as Observable<IngredientInterface>;
  }



  
  //-----------------get ingredient by Id categorie---------------------------
  getIngredientsByCategorie(idCateg: string) {
    const ingredientRef = collection(this.firestore, 'ingredients');
    const q = query(ingredientRef, where("idCategIngr", "==",idCateg));
    /*this.firestore.collection('ingredients', ref => ref.where('idCategIngr', '==', idCateg).valueChanges()
    .pipe( map(data => data.map(doc => doc2Ingredient(doc))))*/
    
    return collectionData(ingredientRef, { idField : 'idIngr' }) as Observable<IngredientInterface[]>;
  }
  
 

}