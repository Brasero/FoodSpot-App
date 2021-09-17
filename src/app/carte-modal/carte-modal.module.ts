import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteModalPageRoutingModule } from './carte-modal-routing.module';

import { CarteModalPage } from './carte-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteModalPageRoutingModule
  ],
  declarations: [CarteModalPage]
})
export class CarteModalPageModule {}
