import {ScalarVariable, ScalarVariablesTypes} from './ScalarVariable';
import {Fmuinstances} from './Fmuinstances';

export class ScalarVaraibleMap {
  name: string;
  type: ScalarVariablesTypes;
  value: any;
  fmuInstance: Fmuinstances;

  constructor(name: string, fmuInstance: Fmuinstances, scalarVaraibleMapType: ScalarVaraibleMapType, type: ScalarVariablesTypes = ScalarVariablesTypes.Unknown, value: any = null) {
    this.name = name;
    this.fmuInstance = fmuInstance;
    this.type = type;
    this.value = value;
    const fmu = fmuInstance.fmuMap.fmu;
    if (fmu) {
      switch (scalarVaraibleMapType) {
        case ScalarVaraibleMapType.input:
          this.addTypeAndValue(fmu.getInputVariables());
          break;
        case ScalarVaraibleMapType.output:
          this.addTypeAndValue(fmu.getOutputVariables());
          break;
        case ScalarVaraibleMapType.parameter:
          this.addTypeAndValue(fmu.getParameterVariables());
          break;
      }
    }
  }

  addTypeAndValue(scalarVariables: ScalarVariable[]) {
    const input = scalarVariables.filter(x => x.name === this.name)[0];
    this.type = input.type;
    if (this.value === null) {
      this.value = input.value;
    }
  }

  toString() {
    return [this.fmuInstance.toString(), this.name].join('.');
  }
}

export enum ScalarVaraibleMapType {
  input = 'input',
  output = 'output',
  parameter = 'parameter'
}
