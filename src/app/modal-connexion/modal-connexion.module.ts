import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalConnexionPageRoutingModule } from './modal-connexion-routing.module';

import { ModalConnexionPage } from './modal-connexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    IonicModule,
    ModalConnexionPageRoutingModule
  ],
  declarations: [ModalConnexionPage]
})
export class ModalConnexionPageModule {}
