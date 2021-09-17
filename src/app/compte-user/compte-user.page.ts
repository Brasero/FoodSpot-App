import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, ViewWillEnter } from '@ionic/angular';
import { User } from '../models/user';

@Component({
  selector: 'app-compte-user',
  templateUrl: './compte-user.page.html',
  styleUrls: ['./compte-user.page.scss'],
})
export class CompteUserPage implements OnInit, ViewWillEnter {
  isConnected: boolean;
  userInfo: User;

  constructor(public router: Router, 
    public activate: ActivatedRoute, 
    public storage: LocalStorageService, 
    public bdd: DatabaseService, 
    public popup: ToastController, 
    public alert: AlertController) { }

  ionViewWillEnter(){

    this.storage.get('connected').then( (connected) => {

      if(connected){
        
        this.isConnected = true;
        this.userInfo = new User;

        this.storage.get("id").then( (data) => {
          console.log(data);
          this.userInfo.id_users = data;
        })

        this.storage.get("nom").then( (data) => {
          console.log(data);
          this.userInfo.nom_users = data;
        });

        this.storage.get('prenom').then( (data) => {
          console.log(data);
          this.userInfo.prenom_users = data;
        });

        this.storage.get('tel').then( (data) => {
          console.log(data);
          this.userInfo.tel_users = data;
        });

        this.storage.get('adresse').then( (data) => {
          console.log(data);
          this.userInfo.adresse_users = data;
        });

        this.storage.get('mail').then( (data) => { 
          console.log(data);
          this.userInfo.mail_users = data;
        });

        this.storage.get('mdp').then( (data) => {
          console.log(data);
          this.userInfo.mdp_users = data;
        });

        console.log(this.userInfo);
      }
      else{

        this.connexion();
      }
    });

  }

  ngOnInit() {

    this.storage.getKey().then( (data) => {
      if(data.length > 1){

        this.storage.get('connected').then( (connected) => {

          if(connected){
            
            this.isConnected = true;
            this.userInfo = new User;

            this.storage.get("id").then( (data) => {
              this.userInfo.id_users = data;
            })
    
            this.storage.get("nom").then( (data) => {
              console.log(data);
              this.userInfo.nom_users = data;
            });
    
            this.storage.get('prenom').then( (data) => {
              console.log(data);
              this.userInfo.prenom_users = data;
            });
    
            this.storage.get('tel').then( (data) => {
              console.log(data);
              this.userInfo.tel_users = data;
            });
    
            this.storage.get('adresse').then( (data) => {
              console.log(data);
              this.userInfo.adresse_users = data;
            });
    
            this.storage.get('mail').then( (data) => { 
              console.log(data);
              this.userInfo.mail_users = data;
            });
    
            this.storage.get('mdp').then( (data) => {
              console.log(data);
              this.userInfo.mdp_users = data;
            });
    
            console.log(this.userInfo);
          }
          else{
    
            this.connexion();
          }
        });

      }
      else{
        this.connexion();
      }
    })

  }

  
  

  async connexion(){
    let popAlert = await this.alert.create({
      cssClass: "alertCustom",
      header: 'Connexion',
      message: 'Vous devez vous connecter pour accéder à ce menu.',
      inputs: [
        {
          name: 'mail',
          placeholder: 'Adresse mail'
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
          handler: data => {
            data = undefined;
            popAlert.dismiss().then((data) => {
              data = undefined;
            this.router.navigateByUrl('tabs/tab2');
            });
          } 
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
                this.storage.set('connected', true);

                this.isConnected = true;
                this.userInfo = new User;

              
                this.userInfo.nom_users = data.nom_users;
                this.userInfo.prenom_users = data.prenom_users;
                this.userInfo.mail_users = data.mail_users;
                this.userInfo.tel_users = data.tel_users;
                this.userInfo.adresse_users = data.adresse_users;    
                
                popAlert.dismiss();
                
              })
            }
            else{
              this.isConnected = false;
            }
          },
        }
      ]
    });
   
  
    await popAlert.present();
    }

    updateUser(){
      this.bdd.updateUser(this.userInfo).subscribe( (data) => {
        console.log(data);
        console.log(this.userInfo);
        this.storage.set('prenom', this.userInfo.prenom_users);
        this.storage.set('nom', this.userInfo.nom_users);
        this.storage.set('mail', this.userInfo.mail_users);
        this.storage.set('tel', this.userInfo.tel_users);
        this.popUpSucces("Modifications enregistrées");
      });
    }

    dataLog() {
      console.log(this.userInfo);
    }

    async popUpSucces(message: string) {
      const toast = await this.popup.create({
        cssClass: "ion-text-center",
        message: message,
        position: "bottom",
        color: "success",
        duration: 4000
      });

      toast.present();
    }
}
