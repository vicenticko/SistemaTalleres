import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroTalleresPage } from './registro-talleres.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroTalleresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroTalleresPageRoutingModule {}
