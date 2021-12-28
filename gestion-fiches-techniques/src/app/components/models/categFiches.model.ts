import { IFiche } from "./fiche.model";

export interface ICategFiches {
    idCategFiche?: string;
    nomCategFiche : string;
    urlImage: string;
    listeFiches : Array<IFiche>;
}



