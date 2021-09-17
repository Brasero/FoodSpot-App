import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompteUserPage } from './compte-user.page';

const routes: Routes = [
  {
    path: '',
    component: CompteUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteUserPageRoutingModule {}
