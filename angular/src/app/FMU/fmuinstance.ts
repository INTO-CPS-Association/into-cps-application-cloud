/*import {FMU} from './fmu';
import {IO} from './io';
import {FMUParameter, ParameterTypes} from './fmuparameter';

export class Fmuinstance {
  fmu: FMU;
  name: string;
  IO: Map<IO, IO[]> = new Map<IO, IO[]>();
  parameters: FMUParameter[] = [];

  constructor(fmu: FMU, name: string) {
    this.fmu = fmu;
    this.name = name;
  }

  getOrSetIObyName(IOname: string, input: boolean = false) {
    let keys: IO[] = Array.from(this.IO.keys());
    const key = keys.filter(x => x.name === IOname);
    if (key.length === 0) {
      this.IO.set(new IO(this, IOname, input), []);
      keys = Array.from(this.IO.keys());
      return keys.filter(x => x.name === IOname)[0];
    } else {
      return key[0];
    }
  }

  toString() {
    return [this.fmu.name, this.name].join('.');
  }

  setConnectionStringMap(stringmap: any) {
    const arr =  Array.from(this.IO.keys()).filter(x => x.isInput === false);
    if (arr.length === 0) {return null; }
    arr.forEach(output => {
      stringmap[output.toString()] = this.getInputConnectionString(output);
    });
  }
  getInputConnectionString(output: IO) {
    const stringArray = [];
    const arr =  this.IO.get(output).filter(x => x.isInput);
    if (arr.length === 0) {return null; }
    arr.forEach(input => {
      stringArray.push(input.toString());
    });
    return stringArray;
  }
  setParameterStringMap(stringmap: any) {
    if (this.parameters.length === 0) {return null; }
    this.parameters.forEach(parameter => {
      switch (parameter.parameterType) {
        case ParameterTypes.BOOL:
          stringmap[parameter.toString()] = Boolean(parameter.start);
          break;
        case ParameterTypes.INT:
          stringmap[parameter.toString()] = Number(parameter.start);
          break;
        case ParameterTypes.REAL:
          stringmap[parameter.toString()] = Number(parameter.start);
          break;
        default:
          stringmap[parameter.toString()] = parameter.start;
          break;
      }
    });
  }
}
*/
