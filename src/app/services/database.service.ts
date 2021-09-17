
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { User } from '../models/user';
import { Categorie } from '../models/categorie';
import { Products } from '../models/products';
import { Ingredient } from '../models/ingredients';
import { Commande } from '../models/commande';
import { Statut } from '../models/statut';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  basePath = "http://localhost/FoodSpot/api";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent)
      {
        console.error('Une erreur est survenue : ', error.error.message);
      }
    else
      {
        console.error(`Php à retourné: ${error.status}, ` + `Le message etait : ${error.error}`);
      }

    return throwError("Quelque chose de mal c'est passé !");
  }

  newUser(data: User): Observable<User> {
    return this.http.post<User>(this.basePath + '/createUser.php', JSON.stringify(data), this.httpOptions);
  }

  loginUser(data: {mail: string, mdp: string}): Observable<User> {
    return this.http.post<User>(this.basePath + '/loginUser.php', JSON.stringify(data), this.httpOptions);
  }

  updateUser(data: User): Observable<User> {
    return this.http.post<User>(this.basePath + '/modifyUser.php', JSON.stringify(data), this.httpOptions);
  }

  getCat(data: string): Observable<Categorie> {
    return this.http.post<Categorie>(this.basePath + '/getCategories.php', JSON.stringify(data), this.httpOptions);
  }

  getCatInfo(data: number): Observable<Categorie> {
    return this.http.post<Categorie>(this.basePath + '/getCatInfo.php', JSON.stringify(data), this.httpOptions);
  }

  getProductByCat(catId: number): Observable<Products> {
    return this.http.post<Products>(this.basePath + '/getProductsByCat.php', JSON.stringify(catId), this.httpOptions);
  }

  getProductList(): Observable<Products> {
    return this.http.post<Products>(this.basePath + '/getProductsList.php', this.httpOptions);
  }

  getIngredient(id): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.basePath + '/getIngredientById.php', JSON.stringify(id), this.httpOptions);
  }

  getIngredientList(): Observable<Ingredient[]> {
    return this.http.post<Ingredient[]>(this.basePath + '/getIngredientsList.php', this.httpOptions);
  }

  registerCommande(produits: Products[], id: Number): Observable<Products> {
    return this.http.post<Products>(this.basePath + '/registerCommande.php', JSON.stringify([produits, id]), this.httpOptions);
  }

  getCommandeList(): Observable<Commande[]> {
    return this.http.post<Commande[]>(this.basePath + '/getCommandeList.php', this.httpOptions);
  }

  acceptCommande(nb: number): Observable<Statut> {
    return this.http.post<Statut>(this.basePath + '/acceptCommande.php', JSON.stringify(nb), this.httpOptions)
  }

  validateLivraison(nb: number): Observable<Statut> {
    return this.http.post<Statut>(this.basePath + '/validateLivraison.php', JSON.stringify(nb), this.httpOptions)
  }

  refuseCommande(nb: number): Observable<Statut> {
    return this.http.post<Statut>(this.basePath + '/refuseCommande.php', JSON.stringify(nb), this.httpOptions)
  }

  getProductByIdentifiant(identifiant: number): Observable<Products> {
    return this.http.post<Products>(this.basePath + '/getProductByIdentifiant.php', JSON.stringify(identifiant), this.httpOptions)
  }

  updateProduct(produit: Products): Observable<Products> {
    return this.http.post<Products>(this.basePath + '/updateProduct.php', JSON.stringify(produit), this.httpOptions)
  }

  addNewProduct(produit: {
    nom_produits: string, 
    prix_produits: number, 
    id_categorie: number, 
    ingredient: string}) {
      return this.http.post(this.basePath + '/addNewProduct.php', JSON.stringify(produit), this.httpOptions)
    }

  deleteProduct(id): Observable<string> {
    return this.http.post<string>(this.basePath + '/deleteProduct.php', JSON.stringify(id), this.httpOptions)
  }
}
