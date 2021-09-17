import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalConnexionPage } from './modal-connexion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalConnexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalConnexionPageRoutingModule {}
