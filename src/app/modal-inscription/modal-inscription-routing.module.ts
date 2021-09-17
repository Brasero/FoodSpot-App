import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInscriptionPage } from './modal-inscription.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInscriptionPageRoutingModule {}
