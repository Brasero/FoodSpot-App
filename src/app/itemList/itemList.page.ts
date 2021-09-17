import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../services/database.service';
import { CarteService } from '../services/carte.service';
import { CarteModalPage } from '../carte-modal/carte-modal.page';
import { BehaviorSubject } from 'rxjs';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Products } from '../models/products';
import { Categorie } from '../models/categorie';



@Component({
  selector: 'app-itemList',
  templateUrl: './itemList.page.html',
  styleUrls: ['./itemList.page.scss'],
})
export class ItemListPage implements OnInit, ViewWillEnter {

  cart = [];
  products: Products;
  carteItemCount: BehaviorSubject<number>;
  selected: any;
  data = [];
  categorie: BehaviorSubject<String> = new BehaviorSubject<string>('Carte');

  
  @ViewChild('carte', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
     public router: Router,
     public activate: ActivatedRoute,
     public storage: LocalStorageService, 
     private carteService: CarteService, 
     private modalCtrl: ModalController, 
     private bdd: DatabaseService) 
    {

      this.selected = this.activate.snapshot.paramMap.get('select');

    }

  ionViewWillEnter() {

    this.getContent(this);

    this.bdd.getCatInfo(this.selected).subscribe( data => {
      this.categorie.next(data.nom_categories);
    });

  }
 
  getContent(that: ItemListPage) {

    this.bdd.getProductByCat(this.selected).subscribe({ next(data){
      
      that.data = [];
      that.data.push(data);

      console.log(that.data);

        }
      }
    )
  }

  ngOnInit() {

    this.cart = this.carteService.getCart();
    this.products = this.carteService.getProducts();
    this.carteItemCount = this.carteService.getCartItemCount();
  }

  addToCart(product) {
    this.carteService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart(){
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
