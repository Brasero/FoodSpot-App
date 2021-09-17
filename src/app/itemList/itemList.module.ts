import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemListPageRoutingModule } from './itemList-routing.module';

import { ItemListPage } from './itemList.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemListPageRoutingModule
  ],
  declarations: [ItemListPage]
})
export class ItemListPageModule {}
