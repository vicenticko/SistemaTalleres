import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  talleres : any[] = [];

  constructor(private storage: Storage) {
    storage.create()
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

}
