import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  isLoggedIn: boolean = false;
  email: string = "";
  password: string = "";

  constructor(private usuarioService: UsuarioService, alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    const usuario = await this.usuarioService.login(this.email, this.password);
    if (usuario) {
      // Guarda todo el objeto del usuario en localStorage después de un login exitoso
      localStorage.setItem('usuario', JSON.stringify(usuario));
  
      // Limpia los campos de email y contraseña
      this.email = '';
      this.password = '';
  
      this.isLoggedIn = true;
      console.log('Login exitoso');
      this.router.navigate(['/home']);
    } else {
      console.log('Correo o contraseña incorrectos');
    }
  }
  

}
