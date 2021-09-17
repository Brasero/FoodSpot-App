import { Component, OnInit } from '@angular/core';
import { CarteService } from '../services/carte.service';
import { DatabaseService } from '../services/database.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Products } from '../models/products';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carte-modal',
  templateUrl: './carte-modal.page.html',
  styleUrls: ['./carte-modal.page.scss'],
})
export class CarteModalPage implements OnInit {

  cart: Products[] = [];
  id: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);

  constructor(
    private cartService: CarteService, 
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController, 
    private bdd: DatabaseService, 
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.storage.get('id').then( (id) => {
      this.id.next(id);
    })
  }

  increaseProduct(product) {
    this.cartService.addProduct(product);
  }

  decreaseProduct(product) {
    this.cartService.decreaseProduct(product);
  }

  removeProduct(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.prix_produits * j.qte_produits, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  validateCommande() {
    this.bdd.registerCommande(this.cart, this.id.value).subscribe( (data) => {
      console.log(data);
    });
    this.checkOut();
  }

  async checkOut() {
    //Processus de vérification Paypal, enregistrement de la commande, etc

    let alert = await this.alertCtrl.create({
      header: "Merci de votre commande",
      message: "elle a été transmise au réstaurateur, une notification vous sera envoyée dès que ce dernier l'aura prise en compte",
      buttons: ['OK'] 
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
