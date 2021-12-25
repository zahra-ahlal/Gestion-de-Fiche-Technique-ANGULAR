import { IEtape } from "./etape.model";

export interface IFiche {
    idF?: string;
    nomPlat : string;
    nbCouverts: number;
    tempsTot: number;
    listeEtapes: Array<IEtape>;

}