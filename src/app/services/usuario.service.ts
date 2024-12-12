import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    await this.storage.create();

    let admin = {
      "rut": "16666666-6",
      "primer_nombre": "admin",
      "segundo_nombre": "",
      "primer_apellido":"",
      "segundo_apellido":"",
      "genero": "Masculino",
      "fecha_nacimiento": "2000-01-01",
      "telefono":"",
      "comuna":"Puente Alto",
      "correo_electronico": "admin@gmail.com",
      "contrasena": "admin123",
      "confirmarContrasena": "admin123",
      "tipo_usuario": "Administrador"
    };

    let adulto_mayor = {
      "rut": "18888888-8",
      "primer_nombre": "Juan",
      "segundo_nombre": "",
      "primer_apellido": "Pérez",
      "segundo_apellido": "",
      "genero": "Masculino",
      "fecha_nacimiento": "1950-05-10",
      "telefono": "987654321",
      "comuna": "Santiago",
      "correo_electronico": "adultomayor@gmail.com",
      "contrasena": "adultomayor123",
      "confirmarContrasena": "adultomayor123",
      "tipo_usuario": "Adulto Mayor"
    };

    let instructor = {
      "rut": "17777777-7",
      "primer_nombre": "Carlos",
      "segundo_nombre": "",
      "primer_apellido": "Sánchez",
      "segundo_apellido": "",
      "genero": "Masculino",
      "fecha_nacimiento": "1985-03-15",
      "telefono": "987654322",
      "comuna": "La Florida",
      "correo_electronico": "instructor@gmail.com",
      "contrasena": "instructor123",
      "confirmarContrasena": "instructor123",
      "tipo_usuario": "Instructor"
    };

    let funcionario_municipal = {
      "rut": "19999999-9",
      "primer_nombre": "Ana",
      "segundo_nombre": "",
      "primer_apellido": "Gómez",
      "segundo_apellido": "",
      "genero": "Femenino",
      "fecha_nacimiento": "1990-07-20",
      "telefono": "987654323",
      "comuna": "Ñuñoa",
      "correo_electronico": "funcionario@gmail.com",
      "contrasena": "funcionario123",
      "confirmarContrasena": "funcionario123",
      "tipo_usuario": "Funcionario Municipal"
    };

    await this.createUsuario(admin);
    await this.createUsuario(adulto_mayor);
    await this.createUsuario(instructor);
    await this.createUsuario(funcionario_municipal);
  }
  
  public async createUsuario(usuario:any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    if(usuarios.find(usu=>usu.rut==usuario.rut)!=undefined){
      return false;
    }
    usuarios.push(usuario);
    await this.storage.set("usuarios",usuarios);
    return true;
  }

  public async login(correo_electronico: string, contrasena: string): Promise<any> {
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    const usu = usuarios.find(elemento => 
      elemento.correo_electronico == correo_electronico && 
      elemento.contrasena == contrasena
    );
  
    if (usu) {
      // Retorna el objeto completo del usuario
      return usu;
    }
    return null;  // Retorna null si no se encuentra el usuario
  }
  
  public async deleteUsuario(rut:string): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let indice: number = usuarios.findIndex(usu=>usu.rut==rut);
    if(indice==-1){
      return false;
    }
    usuarios.splice(indice,1);
    await this.storage.set("usuarios",usuarios);
    return true;
  }
  
  public async getUsuario(rut:string): Promise<any>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios.find(usu=>usu.rut==rut);
  }

  public async getUsuarios(): Promise<any[]>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios;
  }

  public async updateUsuario(rut:string, nuevoUsuario:any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let indice: number = usuarios.findIndex(usu=>usu.rut==rut);
    if(indice==-1){
      return false;
    }
    usuarios[indice] = nuevoUsuario;
    await this.storage.set("usuarios",usuarios);
    return true;
  }

}
