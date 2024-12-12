import { Component, OnInit } from '@angular/core';
import { TallerService } from 'src/app/services/taller.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
})
export class TalleresPage implements OnInit {

  talleres: any[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false; // Variable para controlar si el usuario es administrador
  isFuncionarioMunicipal: boolean = false; // Variable para controlar si el usuario es funcionario municipal
  isAdulto_Mayor: boolean = false; // Variable para controlar si el usuario es adulto mayor
  isInstructor: boolean = false; // Variable para controlar si el usuario es instructor

  constructor(private tallerService: TallerService) { }

  ngOnInit() {
    this.cargarTalleres();
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

  async cargarTalleres() {
    this.talleres = await this.tallerService.getTalleres();
  }

  async eliminar(codigo_eliminar:string){
    this.tallerService.deleteTaller(codigo_eliminar);
    this.cargarTalleres();
  }

  tomarTaller() {
    
  }
}
