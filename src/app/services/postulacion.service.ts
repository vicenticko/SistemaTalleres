import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    await this.storage.create()

    let postulacion1 = {
      "rut_postulante":"12222222-2",
      "nombre_postulante":"Juan",
      "apellido_postulante":"Soto",
      "fecha_nacimiento_postulante":"",
      "correo_postulante":"juansoto@gmail.com",
    };
    
    await this.createPostulacion(postulacion1);

  }

  public async createPostulacion(postulacion:any): Promise<boolean>{
    let postulaciones: any[] = await this.storage.get("postulaciones") || [];
    if(postulaciones.find(pos=>pos.rut_postulante==postulacion.rut_postulante)!=undefined){
      return false;
    }
    postulaciones.push(postulacion);
    await this.storage.set("postulaciones",postulaciones);
    return true;
  }

}
