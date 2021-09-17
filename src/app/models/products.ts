import { Ingredient } from "./ingredients";

export interface Products {
    
    id_produits: number;
    identifiant_produits: number;
    id_categorie: number;
    nom_produits: string;
    ingredient: Ingredient[];
    prix_produits: number;
    qte_produits: number;
    img_produits: string;

}
