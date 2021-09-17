import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifModalPageRoutingModule } from './modif-modal-routing.module';

import { ModifModalPage } from './modif-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifModalPageRoutingModule
  ],
  declarations: [ModifModalPage]
})
export class ModifModalPageModule {}
