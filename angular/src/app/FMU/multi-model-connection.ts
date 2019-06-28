/*import {FMU} from './fmu';
import {Fmuinstance} from './fmuinstance';

export class MultiModelConnection {
  fmu: string;
  instance: string;
  IO: string;

  constructor(connection: string) {
    const arr = connection.split('.');
    this.fmu = arr[0];
    this.instance = arr[1];
    this.IO = arr.slice(2).join('.');
  }

  findFMU(fmus: FMU[]) {
    return fmus[fmus.findIndex((x) => x.name === this.fmu)];
  }

  findInstance(fmu: FMU) {
    return fmu.instances[fmu.instances.findIndex((x) => x.name === this.instance)];
  }

  findOrCreateInstance(fmu: FMU) {
    let instance = this.findInstance(fmu);
    if (instance === undefined) {
      fmu.instances.unshift(new Fmuinstance(fmu, this.instance));
      instance = this.findInstance(fmu);
    }
    return instance;
  }
}
*/
