import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  isLoggedIn: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    // Verifica si el usuario está logueado (ajusta esta lógica según tu implementación de autenticación)
    this.isLoggedIn = !!localStorage.getItem('usuario');
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/registro']);
  }

  registrarTaller(){
    this.router.navigate(['/registro-talleres'])
  }

  registrarUsuario(){
    this.router.navigate(['/registro-usuarios'])
  }

  perfil(){
    this.router.navigate(['/perfil'])
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar Logout',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.removeItem('usuario'); // Limpia el token
            this.isLoggedIn = false; // Actualiza el estado
            this.router.navigate(['/home']);
            console.log('Cerraste sesión');
          },
        },
      ],
    });

    await alert.present();
  }

}
