import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionCategoriePageRoutingModule } from './gestion-categorie-routing.module';

import { GestionCategoriePage } from './gestion-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionCategoriePageRoutingModule
  ],
  declarations: [GestionCategoriePage]
})
export class GestionCategoriePageModule {}
