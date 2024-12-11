import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroUsuariosPageRoutingModule } from './registro-usuarios-routing.module';

import { RegistroUsuariosPage } from './registro-usuarios.page';
import { FilterByTypePipe } from 'src/app/pipes/filter-by-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroUsuariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroUsuariosPage, FilterByTypePipe]
})
export class RegistroUsuariosPageModule {}
