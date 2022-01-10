import { ICout } from "./cout.model";
import { IEtape } from "./etape.model";
import { IngredientInterface } from "./ingredient.model";

export interface IFiche {
    idF?: string;
    nomPlat : string;
    nbCouverts: number;
    tempsTot: number;
    idCategFiche: string;
    nomResponsable: string;
    listeEtapes: IEtape[];
    listeIngr : IngredientInterface[];
    listeCouts : ICout;

}