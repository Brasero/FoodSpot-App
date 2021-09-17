import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionCategoriePage } from './gestion-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: GestionCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionCategoriePageRoutingModule {}
