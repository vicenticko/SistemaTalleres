import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-talleres',
  templateUrl: './registro-talleres.page.html',
  styleUrls: ['./registro-talleres.page.scss'],
})
export class RegistroTalleresPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern("[0-9]{7,8}-[0-9Kk]{1}"), this.validarRUT()]),
    primer_nombre: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-zÑñ]+(\\s[A-Za-zÑñ]+)*$")]),
    segundo_nombre: new FormControl(''),
    primer_apellido: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-zÑñ]+(\\s[A-Za-zÑñ]+)*$")]),
    segundo_apellido: new FormControl(''),
    genero: new FormControl('', [Validators.required]), 
    fecha_nacimiento: new FormControl('', [Validators.required]),
    telefono : new FormControl(''),
    comuna : new FormControl('', [Validators.required]),
    correo_electronico: new FormControl('',[Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    confirmarContrasena: new FormControl('', [Validators.required]),
    tipo_usuario: new FormControl('Usuario'),
  });

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.usuario.get("rut")?.setValidators([Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),this.validarRUT()]);
   }

  ngOnInit() {
  }

  async registrar(){

    if(await this.usuarioService.createUsuario(this.usuario.value)){
      this.router.navigate(['/home']);
      this.usuario.reset();
      alert("Usuario creado con éxito!")
    }
  }

  validarRUT(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rutValue = control.value;
      if (!rutValue) return null;

      const [rutBody, dvIngresado] = rutValue.split('-');
      if (!rutBody || !dvIngresado) return { invalidRUT: true };

      const dvCalculado = this.calcularDigitoVerificador(rutBody);
      return dvCalculado.toLowerCase() === dvIngresado.toLowerCase() ? null : { invalidRUT: true };
    };
  }

  calcularDigitoVerificador(rut: string): string {
    let suma = 0;
    let multiplicador = 2;

    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i], 10) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    if (resto === 11) return '0';
    if (resto === 10) return 'K';
    return resto.toString();
  }


}

