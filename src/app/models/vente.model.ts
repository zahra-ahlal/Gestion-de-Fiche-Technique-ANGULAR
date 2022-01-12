import { IFiche } from "./fiche.model";

export interface IVente {
    idVente?: string;
    fiche:IFiche;
    date: string;
}