import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../../../models/products';
import { LocalStorageService } from '../../../services/local-storage.service';
import { DatabaseService } from '../../../services/database.service';

import { ViewWillEnter, ToastController } from '@ionic/angular';

import { BehaviorSubject } from 'rxjs';

import { ModifModalPage } from './modif-modal/modif-modal.page';
import { Categorie } from 'src/app/models/categorie';
import { Ingredient } from 'src/app/models/ingredients'

@Component({
  selector: 'app-stockproduit',
  templateUrl: './stockproduit.page.html',
  styleUrls: ['./stockproduit.page.scss'],
})
export class StockproduitPage implements OnInit, ViewWillEnter {

  data: BehaviorSubject<Object>;
  categorieList: Categorie;
  ingredientList: Ingredient[];
  newItem = {nom_produits: '', prix_produits: null, id_categorie: null, ingredient: ""};
  
  @ViewChild('modif', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    public router: Router, 
    public activate: ActivatedRoute,
    public storage: LocalStorageService,
    public bdd: DatabaseService, 
    public toast: ToastController, 
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.bdd.getProductList().subscribe( (productList) => {

      this.data = new BehaviorSubject<Object>(productList);

      console.log(this.data);

    });

    this.bdd.getCat('go').subscribe( (list) => {

      this.categorieList = list;
      
      console.log(this.categorieList);
    });

    this.bdd.getIngredientList().subscribe( (ingredients) => {

      this.ingredientList = ingredients;

      console.log(this.ingredientList);
    });

  }

  ionViewWillEnter() {

    this.bdd.getProductList().subscribe( (productList) => {

      this.data.next(productList);

      console.log(this.data);

    });

  }

  async addNewProduct(prix_produits, nom_produits, ingredients_list: [], id_categories) {

    if(prix_produits != undefined && nom_produits != undefined && ingredients_list != undefined && id_categories != undefined) {

      this.newItem.nom_produits = nom_produits;
      this.newItem.prix_produits = prix_produits;
      this.newItem.id_categorie = id_categories;
  
      let list = "";
  
      ingredients_list.forEach(function (element, index) {
  
        if(index < ingredients_list.length - 1) {
          list += element + ';';
        }
  
        else {
          list += element;
        }
        
      });
  
      this.newItem.ingredient = list;

      this.bdd.addNewProduct(this.newItem).subscribe(async (message) => {

        if(!message) {

          let toast = await this.toast.create({
            message: "Erreur impossible de créer l'article",
            color: 'danger',
            position: "middle",
            duration: 3000,
            cssClass: "ion-text-center"
          });

          toast.present();
        }

        else{

          this.data.next(message);

          let toast = await this.toast.create({
            message: "Enregistré",
            color: "success",
            position: "bottom",
            duration: 3000,
            cssClass: "ion-text-center"
          });

          toast.present();
        }

      });

    }

    else{ 
      let toast = await this.toast.create({
        message: 'Veuillez remplir tout les champs pour ajouter un produit',
        color: 'danger',
        position: 'top',
        duration: 4000
      });

      toast.present();
    }



  }

  deleteProduct(id) {

    this.bdd.deleteProduct(id).subscribe(async (message) => {

      if(message) {

        this.data.next(message);

        let toast = await this.toast.create({
          message: "Suppression reussie",
          color: 'success',
          position: "bottom",
          duration: 3000,
          cssClass: 'ion-text-center'
        });

        toast.present();
      }

    });

  }

  async openModify(id){

    
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: ModifModalPage,
      cssClass: 'carte-modal',
      componentProps: {'identifiant': id}
    });

    modal.onWillDismiss().then( () => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.removeEventListener('animationend', handleAnimationEnd);
  }

}
