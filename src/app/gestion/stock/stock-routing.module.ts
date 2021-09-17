import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockPage } from './stock.page';

const routes: Routes = [
  {
    path: '',
    component: StockPage
  },
  {
    path: 'stockingredient',
    loadChildren: () => import('./stockingredient/stockingredient.module').then( m => m.StockingredientPageModule)
  },
  {
    path: 'stockproduit',
    loadChildren: () => import('./stockproduit/stockproduit.module').then( m => m.StockproduitPageModule)
  },
  {
    path: 'gestion-categorie',
    loadChildren: () => import('./gestion-categorie/gestion-categorie.module').then( m => m.GestionCategoriePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockPageRoutingModule {}
