import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { DatabaseService } from '../../services/database.service';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { User } from '../../models/user';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit, ViewWillEnter {

  connected;
  infoUser: User;

  constructor(
    public router: Router,
    public activate: ActivatedRoute,
    public storage: LocalStorageService, 
    public bdd: DatabaseService, 
    public pop: ToastController) { }

  ngOnInit() {

    this.infoUser = new User;
  }

  ionViewWillEnter() {

    this.storage.get('connected').then( (connected) => {

      if(connected) {

        console.log("connecté");
        this.connected = true;

        this.storage.get('id').then( (id) => {
          this.infoUser.id_users = id;
        });

        this.storage.get('nom').then( (nom) => {
          this.infoUser.nom_users = nom;
        });

        this.storage.get('prenom').then( (prenom) => {
          this.infoUser.prenom_users = prenom;
        });

        this.storage.get('mail').then( (mail) => {
          this.infoUser.mail_users = mail;
        });

        this.storage.get('tel').then( (tel) => {
          this.infoUser.tel_users = tel;
        });

        this.storage.get('adresse').then( (adresse) => {
          this.infoUser.adresse_users = adresse;
        });

        this.storage.get('isManager').then( (token) => {
          this.infoUser.isManager_users = token;
        });

      }

      else {
        this.connected = false;
      }
    })
  }

  naviguateToCommande() {

    this.router.navigateByUrl('tabs/gestion/commande');

  }

  naviguateToStock() {

    this.router.navigateByUrl('tabs/gestion/stock');
    
  }


  disconnect(){

    this.router.navigateByUrl('tabs');

  }

}
