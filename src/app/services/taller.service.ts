import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  talleres : any[] = [];

  constructor(private storage: Storage) {
    storage.create();
    this.init();
  }

  async init(){
    await this.storage.create();
    let taller1 = {
      "codigo" : "666",
      "nombre" : "Basquetball",
      "horas": "5",
     "descripcion": "",
      "instructor": ""
    };

    let taller2 = {
      "codigo" : "555",
      "nombre" : "Ajedrez",
      "horas": "5",
     "descripcion": "",
      "instructor": ""
    };
    await this.createTaller(taller1);
    await this.createTaller(taller2);
  }

  public async createTaller(taller:any): Promise<boolean>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    if(talleres.find(ta=>ta.codigo==taller.codigo)!=undefined){
      return false;
    }
    talleres.push(taller);
    await this.storage.set("talleres",talleres);
    return true;
  }

  public async getTaller(codigo:string): Promise<any>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    return talleres.find(ta=>ta.codigo==codigo);
  }

  public async getTalleres(): Promise<any[]>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    return talleres;
  }

  public async deleteTaller(codigo:string): Promise<boolean>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    let indice: number = talleres.findIndex(ta=>ta.codigo==codigo);
    if(indice==-1){
      return false;
    }
    talleres.splice(indice,1);
    await this.storage.set("talleres",talleres);
    return true;
  }

  public async updateTaller(codigo:string, nuevoTaller:any): Promise<boolean>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    let indice: number = talleres.findIndex(ta=>ta.codigo==codigo);
    if(indice==-1){
      return false;
    }
    talleres[indice] = nuevoTaller;
    await this.storage.set("talleres",talleres);
    return true;
  }

}
