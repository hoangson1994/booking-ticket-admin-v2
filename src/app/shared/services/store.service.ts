import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state: any = {};
  constructor() { }

  public get<T>(key: string, stateDefault: T = null): T {
    if (!this.state[key]) {
      this.state[key] = stateDefault;
    }
    return this.state[key];
  }

  public set(key: string, state: any) {
    if (!this.state[key]) {
      this.state[key] = {};
    }
    Object.assign(this.state[key], state);
  }
}
