import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarPostulacionPage } from './administrar-postulacion.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarPostulacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarPostulacionPageRoutingModule {}
