import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TallerService } from 'src/app/services/taller.service';

@Component({
  selector: 'app-registro-talleres',
  templateUrl: './registro-talleres.page.html',
  styleUrls: ['./registro-talleres.page.scss'],
})
export class RegistroTalleresPage implements OnInit {

  talleres: any[] = [];
  botonModificar: boolean = true;

  taller = new FormGroup({
    codigo : new FormControl('',[Validators.required]),
    nombre : new FormControl('', [Validators.required]),
    horas: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[Validators.required]),
    instructor : new FormControl('')
  });

  constructor(private router: Router, private tallerService: TallerService) {
    this.taller.get("codigo")?.setValidators([Validators.required]);
  }

  ngOnInit() {
    this.cargarTalleres();
  }

  async cargarTalleres() {
    this.talleres = await this.tallerService.getTalleres();
  }

  async registrar(){
    if(await this.tallerService.createTaller(this.taller.value)){
      this.router.navigate(['/registro-talleres']);
      this.taller.reset();
      alert("Taller creado con éxito!")
      this.cargarTalleres();
    }
  }

  async buscar(usuario: any){
    this.taller.setValue(usuario);
    this.botonModificar = false;
  }

  async eliminar(codigo_eliminar:string){
    this.tallerService.deleteTaller(codigo_eliminar);
    this.cargarTalleres();
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

