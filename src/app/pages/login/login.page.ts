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
    if (await this.usuarioService.login(this.email, this.password)) {
      // Guarda el usuario en localStorage después de un login exitoso
      const token = 'usuario-autenticado';
      localStorage.setItem('usuario', JSON.stringify({ email: this.email }));
      
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
