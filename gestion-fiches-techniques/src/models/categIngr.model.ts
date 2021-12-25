import { IngredientInterface } from "./ingredient.model";

export interface CategorieIngredientInterface {
    idCategIngr?: string;
    nomCategIngr : string;
    listIngr : Array<IngredientInterface>;
}