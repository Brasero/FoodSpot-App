import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _storage: Storage | null = null;
  
  connected;

  constructor(private storage: Storage) {
    this.init();
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any){
    this._storage?.set(key, value);
  }

  public get(key: string){
    const value = this._storage?.get(key);
    return value;
  }

  public getKey(){
    const value = this._storage?.keys();
    return value;
  }

  public disconnect(){
    const value = this._storage?.clear();
    return value;
  }
}
