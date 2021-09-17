import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Products } from '../../../../models/products';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-modif-modal',
  templateUrl: './modif-modal.page.html',
  styleUrls: ['./modif-modal.page.scss'],
})
export class ModifModalPage implements OnInit {

  identifiant: number;
  subject: Products;

  constructor(
    public modal: ModalController, 
    public alert: AlertController, 
    public bdd: DatabaseService, 
    public toast: ToastController
  ) { }

  ngOnInit() {

    this.bdd.getProductByIdentifiant(this.identifiant).subscribe( (data) => {

      console.log(data);

      this.subject = data;

    });

  }

  async close() {

    let alert = await this.alert.create({
      message: "Etes vous sur de vouloir quitter ? Les modifications effectué n'ont pas été enregistrées.",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Quitter',
          handler: () => {
            this.modal.dismiss();
          }
        }
      ]
    })

    alert.present();
  }

  async validateConfirm() {

    let alert = await this.alert.create({
      header: "Vous êtes sur le point de modifier un produit.",
      subHeader: "Assurer vous de ne pas avoir fait d'erreur avant de valider la modification.",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler:  () => {
            this.bdd.updateProduct(this.subject).subscribe(async (data) => {
              console.log(data);

              let pop = await this.toast.create({
                message: "Modification effectuée, elle sera visible lors de votre prochaine visite", 
                color: 'warning', 
                position: "middle", 
                duration: 3000, 
                cssClass: 'ion-text-center',
              });
              this.modal.dismiss();
              pop.present();
            });
          }
        }
      ]
    })

    alert.present();
  }

}
