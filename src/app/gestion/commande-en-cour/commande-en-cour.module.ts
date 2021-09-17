import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeEnCourPageRoutingModule } from './commande-en-cour-routing.module';

import { CommandeEnCourPage } from './commande-en-cour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandeEnCourPageRoutingModule
  ],
  declarations: [CommandeEnCourPage]
})
export class CommandeEnCourPageModule {}
