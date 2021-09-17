import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteModalPage } from './carte-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CarteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteModalPageRoutingModule {}
