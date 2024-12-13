import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-talleres',
    loadChildren: () => import('./pages/registro-talleres/registro-talleres.module').then( m => m.RegistroTalleresPageModule)
  },
  {
    path: 'registro-usuarios',
    loadChildren: () => import('./pages/registro-usuarios/registro-usuarios.module').then( m => m.RegistroUsuariosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'talleres',
    loadChildren: () => import('./pages/talleres/talleres.module').then( m => m.TalleresPageModule)
  },
  {
    path: 'postulacion',
    loadChildren: () => import('./pages/postulacion/postulacion.module').then( m => m.PostulacionPageModule)
  },  {
    path: 'administrar-postulacion',
    loadChildren: () => import('./pages/administrar-postulacion/administrar-postulacion.module').then( m => m.AdministrarPostulacionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
