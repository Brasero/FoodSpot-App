import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredients';
import { Products } from '../models/products';

import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CarteService {


  data: Products;
  ingredients: Ingredient[];

  private cart = []; 
  private cartItemCount = new BehaviorSubject(0);

  constructor(private bdd: DatabaseService) { 

    this.bdd.getProductList().subscribe( (list) => {
      this.data = list;
    });

    this.ingredients = [];

    this.bdd.getIngredientList().subscribe( (list) => {

      const ingredientList = list;

      for(let ing of ingredientList) {
        
        this.ingredients.push(ing);
      }

    });

    console.log(this.ingredients);
    
  }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  getIngredient() { 
    return this.ingredients;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if(p.id_produits === product.id_produits) { 
        p.qte_produits += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qte_produits = 1;
      this.cart.push(product);
    }

    this.cartItemCount.next(this.cartItemCount.value + 1);
  } 

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id_produits === product.id_produits) {
        p.qte_produits -= 1;
        if (p.qte_produits == 0) {
          this.cart.splice(index, 1);
        }
      }
    }

    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if(p.id_produits === product.id_produits) {
        if(this.cartItemCount.value == p.qte_produits) {
          this.cartItemCount.next(0);
        }
        else {
          this.cartItemCount.next(this.cartItemCount.value - p.qte_produits);
        }
        this.cart.splice(index, 1);
      }
    }
  }

  clearCart() {
    for ( let [index, item] of this.cart.entries()) {
      if(this.cartItemCount.value == item.qte_produits) {
        this.cartItemCount.next(0);
      }
      else {
        this.cartItemCount.next(this.cartItemCount.value - item.qte_produits);
      }

      this.cart.splice(index, 1);
    }
  }

}
