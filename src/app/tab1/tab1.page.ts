import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Categorie } from '../models/categorie';

import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service'

import { ViewWillEnter, AlertController, ModalController } from '@ionic/angular';
import { CarteService } from '../services/carte.service';
import { CarteModalPage } from '../carte-modal/carte-modal.page';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../models/products';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit, ViewWillEnter {

  cart = [];
  products: Products;
  cartItemCount: BehaviorSubject<number>;
  data: Categorie;
  connected;
  typeInt;
  type
  name;
  adresse;

  
  @ViewChild('carte', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    public router: Router, 
    public activate: ActivatedRoute, 
    public storage: Storage, 
    public alert: AlertController, 
    private modalCtrl: ModalController, 
    private carteService: CarteService, 
    private bdd: DatabaseService) {}

  ngOnInit() {
    this.products = this.carteService.getProducts();
    this.cart = this.carteService.getCart();
    this.cartItemCount = this.carteService.getCartItemCount();

    this.bdd.getCat('true').subscribe( (data) => {

      this.data = data;
      
    });

  }

  ionViewWillEnter(){

    this.storage.get('connected').then( (data) => {
      this.connected = data;
    });

    if(this.typeInt == undefined){
      this.typeInt = this.activate.snapshot.paramMap.get("type");
    }

    if(this.typeInt == "0"){
      this.type = "Click & Collect";
    }
    else if(this.typeInt == "1"){
      this.type = "Livraison";
    }
    else if(this.typeInt == "2"){
      if(this.connected){
        this.typeAlert();
      }
      else{
        this.type = "Click & Collect";
      }
    }

  }

  naviguate(to: string) {
    this.router.navigateByUrl(to);
  }

  async typeAlert() {
    let alert = await this.alert.create({
      cssClass: "alertCustom",
      header: "Je commande en",
      buttons: [
        {
          text: "Livraison",
          handler: (data) =>{
            this.typeInt = "1";
            this.type = "Livraison";
          }
        },
        {
          text: "Click & Collect",
          handler: (data) =>{
            this.typeInt = "2";
            this.type = "Click & Collect";
          }
        }
      ]
    })

    alert.present();
  }

  addToCart(product) {
    this.carteService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: CarteModalPage,
      cssClass: 'carte-modal'
    });

    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });

    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if(!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }



}
