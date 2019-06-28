/*import {FMU} from './fmu';
import {Fmuinstance} from './fmuinstance';

export class IO {
  fmu: FMU;
  instance: Fmuinstance;
  name: string;
  isInput = false;

  constructor(instance: Fmuinstance, name: string, isInput: boolean) {
    if (instance !== null) {
      this.fmu = instance.fmu;
      this.instance = instance;
    }
    this.name = name;
    this.isInput = isInput;
  }

  toString() {
    return [this.fmu.name, this.instance.name, this.name].join('.');
  }
}

*/
