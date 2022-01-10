import { IngredientInterface } from "./ingredient.model";

export interface IEtape {
    idEtape?: string;
    nomEtape: string;
    descritpion : string;
    duree : string;
    listeIngr : IngredientInterface[]
}