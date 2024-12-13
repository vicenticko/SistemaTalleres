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
    this.storage.create()
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
