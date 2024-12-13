import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulacionPageRoutingModule } from './postulacion-routing.module';

import { PostulacionPage } from './postulacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostulacionPage]
})
export class PostulacionPageModule {}
