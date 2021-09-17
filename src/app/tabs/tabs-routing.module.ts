import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1/:type',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'carte-modal',
        loadChildren: () => import('../carte-modal/carte-modal.module').then(m => m.CarteModalPageModule)
      },
      {
        path: 'tab1/itemList/:select',
        loadChildren: () => import('../itemList/itemList.module').then( m => m.ItemListPageModule)
      },
      {
        path: 'compte-user',
        loadChildren: () => import('../compte-user/compte-user.module').then( m => m.CompteUserPageModule)
      },
      {
        path: 'gestion/acceuil',
        loadChildren: () => import('../gestion/acceuil/acceuil.module').then( m => m.AcceuilPageModule)
      },
      {
        path: 'gestion/commande',
        loadChildren: () => import('../gestion/commande-en-cour/commande-en-cour.module').then( m => m.CommandeEnCourPageModule)
      },
      {
        path: 'gestion/stock',
        loadChildren: () => import('../gestion/stock/stock.module').then( m => m.StockPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
