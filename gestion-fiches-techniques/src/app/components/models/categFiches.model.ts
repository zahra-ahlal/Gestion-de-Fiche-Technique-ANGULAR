import { IFiche } from "./fiche.model";

export interface ICategFiches {
    idCategFiche?: string;
    nomCategFiche : string;
    listeFiches : Array<IFiche>;
}



