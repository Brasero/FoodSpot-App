import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockproduitPage } from './stockproduit.page';

const routes: Routes = [
  {
    path: '',
    component: StockproduitPage
  },
  {
    path: 'modif-modal',
    loadChildren: () => import('./modif-modal/modif-modal.module').then( m => m.ModifModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockproduitPageRoutingModule {}
