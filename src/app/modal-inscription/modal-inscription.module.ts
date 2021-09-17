import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInscriptionPageRoutingModule } from './modal-inscription-routing.module';

import { ModalInscriptionPage } from './modal-inscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInscriptionPageRoutingModule
  ],
  declarations: [ModalInscriptionPage]
})
export class ModalInscriptionPageModule {}
