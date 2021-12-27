import { IFiche } from "./fiche.model";

export interface ICategFiches {
    idCategFiche?: string;
    nomCategFiche : string;
    urlImageCateg: string;
    listeFiches : Array<IFiche>;
}



