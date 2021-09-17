import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockingredientPageRoutingModule } from './stockingredient-routing.module';

import { StockingredientPage } from './stockingredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockingredientPageRoutingModule
  ],
  declarations: [StockingredientPage]
})
export class StockingredientPageModule {}
