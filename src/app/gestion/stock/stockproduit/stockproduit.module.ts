import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockproduitPageRoutingModule } from './stockproduit-routing.module';

import { StockproduitPage } from './stockproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockproduitPageRoutingModule
  ],
  declarations: [StockproduitPage]
})
export class StockproduitPageModule {}
