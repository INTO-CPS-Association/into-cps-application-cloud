/*import {FMU } from './fmu';
import {Fmuinstance} from './fmuinstance';

export class FMUParameter {
  fmu: FMU;
  instance: Fmuinstance;
  name: string;
  parameterType: ParameterTypes;
  start: any;
  constructor(instance: Fmuinstance, name: string, parameterType: ParameterTypes, start: any) {
    if (instance !== null) {
      this.fmu = instance.fmu;
      this.instance = instance;
    }
    this.name = name;
    this.parameterType = parameterType;
    this.start = start;
  }
  toString() {
    return [this.fmu.name, this.instance.name, this.name].join('.');
  }
}
export enum ParameterTypes {
  REAL = 'Real',
  BOOL =  'Boolean',
  INT = 'Integer',
  STRING = 'String',
  UNKNOWN = ''
}
*/
