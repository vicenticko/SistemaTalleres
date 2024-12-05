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
      "correo_electronico": "admin@duocuc.cl",
      "contrasena": "admin123.",
      "confirmarContrasena": "admin123.",
      "tipo_usuario": "Administrador"
    };
    await this.createUsuario(admin);
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

}
