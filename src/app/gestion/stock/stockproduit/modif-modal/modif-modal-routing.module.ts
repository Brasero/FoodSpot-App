import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifModalPage } from './modif-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ModifModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifModalPageRoutingModule {}
