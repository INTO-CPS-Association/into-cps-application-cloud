import { Fmu } from './Fmu';

export class FmuMap {
    fmu: Fmu;
    name: string;
    constructor(name: string, fmu: Fmu) {
      this.name = name;
      this.fmu = fmu;
    }
    toString() {
      return this.name;
    }
  }
