import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandeEnCourPage } from './commande-en-cour.page';

const routes: Routes = [
  {
    path: '',
    component: CommandeEnCourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeEnCourPageRoutingModule {}
