import { IEtape } from "./etape.model";

export interface IFiche {
    idF?: string;
    nomPlat : string;
    nbCouverts: number;
    tempsTot: number;
    idCategFiche: string;
    nomResponsable: string;
    listeEtapes: Array<IEtape>;

}