import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulacionPage } from './postulacion.page';

const routes: Routes = [
  {
    path: '',
    component: PostulacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulacionPageRoutingModule {}
