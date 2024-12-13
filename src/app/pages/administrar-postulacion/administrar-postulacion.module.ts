import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarPostulacionPageRoutingModule } from './administrar-postulacion-routing.module';

import { AdministrarPostulacionPage } from './administrar-postulacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarPostulacionPageRoutingModule
  ],
  declarations: [AdministrarPostulacionPage]
})
export class AdministrarPostulacionPageModule {}
