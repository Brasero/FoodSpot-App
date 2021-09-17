import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-connexion',
    loadChildren: () => import('./modal-connexion/modal-connexion.module').then( m => m.ModalConnexionPageModule)
  },
  {
    path: 'modal-inscription',
    loadChildren: () => import('./modal-inscription/modal-inscription.module').then( m => m.ModalInscriptionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
