import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { query } from '@firebase/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IngredientInterface } from '../models/ingredient.model';
import { CategoriesIngredientService } from './categories-ingredient.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  dbPath = 'ingredients'

  constructor(private firestore: Firestore, private db: AngularFirestore,
    private categService : CategoriesIngredientService) { }


  getAll(): AngularFirestoreCollection<IngredientInterface> {
    return this.db.collection(this.dbPath);
  }

  getByIdCateg(categ : String): AngularFirestoreCollection<IngredientInterface>{
    //console.log("TEEEEEST"+this.db.collection(this.dbPath,ref => ref.where('idCategIngr','==', categ )).valueChanges())
    return this.db.collection(this.dbPath,ref => ref.where('idCategIngr','==', categ ));
  }  

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
  //get stock
  getDocById(id : String): AngularFirestoreCollection<IngredientInterface>{
    return this.db.collection(this.dbPath,ref => ref.where('idIngr','==', id ));
  }

  //modifier le stock quand impression pour vente
  updateStock(id : string , value : number){
    var stock : any;
    const ingrService : IngredientService = null;
    this.getDocById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      stock = data[0].stock;
      console.log("stock"+data[0].stock);
    });

    let newStock = stock - value;
    this.db.collection(this.dbPath).doc(id).update({ stock: (newStock) });
  }


  /*getIngredients(): Observable<Ingred"ientInterface[]> {
    const ingredientRef = collection(this.firestore, 'ingredients');
    return collectionData(ingredientRef, { idField: 'idIngr' }) as Observable<IngredientInterface[]>;
  }*/


   /***********************
   * 
   * 
   * encore des methodes a convertir vers FIRESTORE
   * 
   * 
   * ******************* */

  deleteIngredient(ingredient: IngredientInterface) {
    const ingredientRef = doc(this.firestore, `ingredients/${ingredient.idIngr}`);
    return deleteDoc(ingredientRef);
  }

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
  
  updateIngredient(ingredient: IngredientInterface) {
    const ingredientRef = doc(this.firestore, `ingredients/${ingredient.idIngr}`);
    return setDoc(ingredientRef, ingredient);
  }
  
  modifyAllergene(ingredient: IngredientInterface, allerg: boolean) {
    const ingredientRef = doc(this.firestore, `ingredients/${ingredient.idIngr}`);
    return updateDoc(ingredientRef, { allergene: allerg });
  }
  

}
