import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostulacionService } from 'src/app/services/postulacion.service';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.page.html',
  styleUrls: ['./postulacion.page.scss'],
})
export class PostulacionPage implements OnInit {

  postulacion = new FormGroup({
    rut_postulante: new FormControl('',[Validators.required, Validators.pattern("[0-9]{7,8}-[0-9Kk]{1}"), this.validarRUT()]),
    nombre_postulante: new FormControl('',[Validators.required, Validators.pattern("^[A-Za-zÑñ]+(\\s[A-Za-zÑñ]+)*$")]),
    apellido_postulante: new FormControl('',[Validators.required, Validators.pattern("^[A-Za-zÑñ]+(\\s[A-Za-zÑñ]+)*$")]),
    fecha_nacimiento_postulante: new FormControl('',[Validators.required]),
    correo_postulante: new FormControl('',[Validators.required, Validators.email])
  })

  constructor(private router: Router, private postulacionService: PostulacionService) { }

  ngOnInit() {
  }

  async registrar(){
    if(await this.postulacionService.createPostulacion(this.postulacion.value)){
      this.router.navigate(['/home']);
      this.postulacion.reset();
      alert("Postulacion registrada con éxito!, Revisa tu bandeja de entrada")
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
