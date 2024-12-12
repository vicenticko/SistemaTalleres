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
  isAdmin: boolean = false; // Variable para controlar si el usuario es administrador
  isFuncionarioMunicipal: boolean = false; // Variable para controlar si el usuario es funcionario municipal
  isAdulto_Mayor: boolean = false; // Variable para controlar si el usuario es adulto mayor
  isInstructor: boolean = false; // Variable para controlar si el usuario es instructor
  
  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    // Verifica si el usuario está logueado (ajusta esta lógica según tu implementación de autenticación)
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.isLoggedIn = true;
      const usuarioData = JSON.parse(usuario); // Suponiendo que el usuario está almacenado como JSON
      this.isAdmin = usuarioData.tipo_usuario === 'Administrador'; // Verifica si es administrador
      this.isFuncionarioMunicipal = usuarioData.tipo_usuario === 'Funcionario Municipal'; // Verifica si es funcionario municipal
      this.isAdulto_Mayor = usuarioData.tipo_usuario === 'Adulto Mayor'; // Verifica si es adulto mayor
      this.isInstructor = usuarioData.tipo_usuario === 'Instructor'; // Verifica si es Instructor
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/registro']);
  }

  registrarTaller(){
    this.router.navigate(['/registro-talleres']);
  }

  registrarUsuario(){
    this.router.navigate(['/registro-usuarios']);
  }

  perfil(){
    this.router.navigate(['/perfil']);
  }

  talleres(){
    this.router.navigate(['/talleres']);
  }

  postulacion(){
    this.router.navigate(['/postulacion']);
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
            this.isAdmin = false; // Restablece el estado de administrador
            this.isFuncionarioMunicipal = false; // Restablece el estado de funcionario municipal
            this.isAdulto_Mayor = false; // Restablece el estado de adulto mayor
            this.isInstructor = false; // Restablece el estado de instructor
            this.router.navigate(['/home']);
            console.log('Cerraste sesión');
          },
        },
      ],
    });

    await alert.present();
  }
}
