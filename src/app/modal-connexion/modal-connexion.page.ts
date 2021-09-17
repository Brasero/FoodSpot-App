import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-modal-connexion',
  templateUrl: './modal-connexion.page.html',
  styleUrls: ['./modal-connexion.page.scss'],
})
export class ModalConnexionPage implements OnInit {

  mail;
  formGroup;

  constructor(
    public bdd: DatabaseService, 
    public storage: LocalStorageService, 
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.formGroup = new FormGroup({
      Mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[a-z0-9._-éèàêâëäîï]+@[a-z0-9._-éèàêâëäîï]+\.[a-z]{2,6}$/')
      ])),
      Mdp: new FormControl('', Validators.required)
    });

  }

  close() {

    this.modalCtrl.dismiss();

  }

  checkConnexion() {

    

  }

}
