import { FmuMap } from "./FmuMap";

export class Fmuinstances {
    fmuMap: FmuMap;
    name: string;
    constructor(name: string, fmuMap: FmuMap) {
      this.name = name;
      this.fmuMap = fmuMap;
    }
    toString() {
      return [this.fmuMap.toString(), this.name].join('.');
    }
  }
