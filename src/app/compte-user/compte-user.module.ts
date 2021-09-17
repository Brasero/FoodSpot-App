import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteUserPageRoutingModule } from './compte-user-routing.module';

import { CompteUserPage } from './compte-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompteUserPageRoutingModule
  ],
  declarations: [CompteUserPage]
})
export class CompteUserPageModule {}
