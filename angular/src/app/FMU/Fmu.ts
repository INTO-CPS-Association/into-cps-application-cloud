/*import {IO} from './io';
import {FMUParameter} from './fmuparameter';
import {Fmuinstance} from './fmuinstance';

export class FMU {
  name: string;
  file: string;
  inputs: IO[] = []; // from FMU json
  ouptuts: IO[] = []; // from FMU json
  parameters: FMUParameter[] = []; // from FMU json
  logCategories: string[] = []; // From FMU json
  instances: Fmuinstance[] = []; // from MM json
  constructor(name: string, file: string, template: FMU = null) {
    this.name = name;
    this.file = file;
    if (template) {
      this.addTemplate(template);
    }
  }

  addTemplate(fmuTemplate: FMU) {
    this.file = fmuTemplate.file;
    this.inputs = fmuTemplate.inputs;
    this.ouptuts = fmuTemplate.ouptuts;
    this.parameters = fmuTemplate.parameters;
  }

  addInstance(name: string) {
    this.instances.push(new Fmuinstance(this, name));
  }
  addAllIOTo(IOArray: IO[], IOnames: string[], input: boolean) {
    IOnames.forEach(ioname => {
      IOArray.push(new IO(null, ioname, input));
    });
  }
  toString() {
    return [this.name, this.file].join(':');
  }
  setFmuStringMap(stringmap: any) {
    stringmap[this.name] = this.file;
  }
}
*/
