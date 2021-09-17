import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';

import { AlertController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

import { ToastController, ViewWillEnter } from '@ionic/angular';
import { User } from '../models/user';

import { CarteService } from '../services/carte.service';
import { CarteModalPage } from '../carte-modal/carte-modal.page';
import { ModalConnexionPage } from '../modal-connexion/modal-connexion.page';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../models/products';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, ViewWillEnter {

  cart = [];
  products: Products;
  cartItemcount: BehaviorSubject<number>;
  connected;
  name;
  adresse;
  connect = {mail: "", mdp: ""};
  infoUser: User;

  @ViewChild('carte', {static: false, read: ElementRef})fab: ElementRef;
  @ViewChild('connexion', {static: false, read: ElementRef})con: ElementRef;

  constructor(public router: Router, 
    public activate: ActivatedRoute, 
    public storage: LocalStorageService, 
    public alert: AlertController, 
    public bdd: DatabaseService, 
    public pop: ToastController, 
    private carteService: CarteService, 
    private modalCtrl: ModalController) { }

    commande(a) {
      this.router.navigateByUrl('tabs/tab1/' + a);
    }

    routerGestion() {
      this.router.navigateByUrl('tabs/gestion/acceuil');
    }

    routerMonCompte() {
      this.router.navigateByUrl('tabs/compte-user');
    }

  ngOnInit() {

    this.products = this.carteService.getProducts();
    this.cart = this.carteService.getCart();
    this.cartItemcount = this.carteService.getCartItemCount();

   } 

  ionViewWillEnter() {

    this.storage.get('connected').then( (connected) => {

      if(connected){
        this.connected = true;
        this.infoUser = new User;

        this.storage.get('id').then( (data) => {
          this.infoUser.id_users = data;
        });

        this.storage.get('nom').then( (data) => {
          this.infoUser.nom_users = data;
        });

        this.storage.get('prenom').then( (data) => {
          this.infoUser.prenom_users = data;
        });

        this.storage.get('mail').then( (data) => {
          this.infoUser.mail_users = data;
        });

        this.storage.get('tel').then( (data) => {
          this.infoUser.tel_users = data;
        });

        this.storage.get('adresse').then( (data) => {
          this.infoUser.adresse_users = data;
        });

        this.storage.get('isManager').then( (data) => {
          this.infoUser.isManager_users = data;
        });
      }
      else{
        this.connected = false;
      }
    })

  }

  addToCart(product) {
    this.carteService.addProduct(product);
    this.animateCSS('tada');
  }

  async openConnexion() {
    this.animateCSS2('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: ModalConnexionPage, 
      cssClass: 'carte-modal'
    });

    modal.onWillDismiss().then( () => {
      this.con.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS2('bounceInLeft');
    });
    modal.present();
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: CarteModalPage,
      cssClass: 'carte-modal'
    });

    modal.onWillDismiss().then( () => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS2(animationName, keepAnimated = false) {
    const node = this.con.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd2() {
      if (!keepAnimated) {
        node.classlist.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd2);
    }
    node.addEventListener('animationend', handleAnimationEnd2);
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
    node.addEventListener('animationend', handleAnimationEnd);
  }

  getKeys(){
    this.storage.getKey().then( (data) => {
        if(data !== undefined){
          console.log(data);
        }
        else{
          console.log({"data": "undefined"});
        }
    });
  }

  disconnect(){
    this.storage.disconnect().then( (data) => {
      if(data !== undefined){
        console.log(data);
      }
      else{
        console.log({"disconnect": "no return"});
        this.connected = false;
      }
    })
  }

  async connexion(){
  let popAlert = await this.alert.create({
    cssClass: "alertCustom",
    header: 'Connexion',
    inputs: [
      {
        name: 'mail',
        placeholder: 'Adresse mail',
        type: 'email'
      }, 
      {
        name: 'mdp',
        placeholder: 'Mot de passe',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel', 
      },
      {
        text: 'Connexion',
        handler: data => {
          if(data.mail != null && data.mdp != null){
            this.bdd.loginUser(data).subscribe((data) => {
              console.log(data);

              this.storage.set('id', data.id_users);
              this.storage.set('nom', data.nom_users);
              this.storage.set('prenom', data.prenom_users);
              this.storage.set('mail', data.mail_users);
              this.storage.set('tel', data.tel_users);
              this.storage.set('adresse', data.adresse_users);
              this.storage.set('mdp', data.mdp_users);
              this.storage.set('isManager', data.isManager_users);
              this.storage.set('connected', true);

              this.connect.mail = data.mail_users;
              this.connect.mdp = data.mdp_users;
              this.connected = true;
              this.name = data.prenom_users;

              this.infoUser = new User;

              this.infoUser.id_users = data.id_users;
              this.infoUser.nom_users = data.nom_users;
              this.infoUser.prenom_users = data.prenom_users;
              this.infoUser.mail_users = data.mail_users;
              this.infoUser.tel_users = data.tel_users;
              this.infoUser.adresse_users = data.adresse_users;
              this.infoUser.isManager_users = data.isManager_users;
              
            })
          }
        },
      }
    ]
  });
 

  await popAlert.present();
  }

  async signClick() {
    let popAlert = await this.alert.create({
      cssClass: 'alertCustom',
      header: 'Inscription',
      inputs: [
        {
          name: 'prenom',
          placeholder: 'Prénom',
          type: 'text'
        },
        {
          name: 'nom',
          placeholder: 'Nom',
          type: 'text'
        },
        {
          name: 'adresse',
          placeholder: "Adresse de livraison",
          type: 'text'
        },
        {
          name: 'tel',
          placeholder: 'Numéro de télèphone',
          type: 'text'
        },
        {
          name: "mail",
          placeholder: 'Adresse mail',
          type: 'email'
        },
        {
          name: 'mdp',
          placeholder: 'Mot de passe',
          type: 'password'
        },
        {
          name:'mdp_confirm',
          placeholder: 'Confirmation mot de passe',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'S\'inscrire',
          handler: data => {
            
            if(data.mdp === data.mdp_confirm){

              this.bdd.newUser(data).subscribe((response) => {
              console.log(JSON.stringify(response));

              let retour = JSON.stringify(response);
              

              if(retour == '"Compte créé"'){

                this.popUpSuccess("Compte créé avec succées");

                this.storage.set('nom', data.nom);
                this.storage.set("prenom", data.prenom);
                this.storage.set('adresse', data.adresse);
                this.storage.set('mail', data.mail);
                this.storage.set('mdp', data.mdp);
                this.storage.set('tel', data.tel);           
                this.storage.set('connected', true);
                this.infoUser.nom_users = data.nom;
                this.infoUser.prenom_users = data.prenom;
                this.infoUser.tel_users = data.tel;
                this.infoUser.mail_users = data.mail;
                this.infoUser.adresse_users = data.adresse;
                this.connect.mail = data.mail;
                this.connect.mdp = data.mdp;
                this.connected = true;

                this.bdd.loginUser(this.connect).subscribe( (data) => {

                  this.storage.set('id', data.id_users);
                });
              }
              else{

                this.popUpFail(retour);
                this.signClick();
              }

             });
            }
            
            
          }
        }
      ]
    });
    await popAlert.present();
  }

  async popUpSuccess(message: string){

    const toast = await this.pop.create({
      cssClass: "ion-text-center",
      message: message,
      position: "bottom",
      color: "success",
      duration: 4000
    });

    toast.present();
  }

  async popUpFail(message: string){

    const toast = await this.pop.create({
      cssClass: "ion-text-center",
      message: message,
      position: "bottom",
      color: "danger",
      duration: 6000
    });

    toast.present();
  }

  
}
