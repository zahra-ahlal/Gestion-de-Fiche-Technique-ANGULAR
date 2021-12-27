import { IngredientInterface } from "./ingredient.model";

export interface IEtape {
    idEtape?: string;
    descritpion : string;
    listIngr : Array<IngredientInterface>;
}