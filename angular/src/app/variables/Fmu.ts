import { ScalarVariable, ScalarVariablesCausality } from './ScalarVariable';

export class Fmu {
  modelname: string
  file: string;
  scalarVariables: ScalarVariable[] = []; // from FMU json
  logCategories: string[] = []; // From FMU json

  constructor(modelname: string, file: string) {
    this.modelname = modelname;
    this.file = file;
  }
  setScalarVariables(scalarVariables: ScalarVariable[]) {
    scalarVariables.forEach(x => {
      this.scalarVariables.push(x);
    });
    return this;
  }
  setLogCategories(...logCategories: string[]) {
    logCategories.forEach(x => {
      this.logCategories.push(x);
    });
    return this;
  }

  getInputVariables() {return this.scalarVariables.filter(x => x.causality === ScalarVariablesCausality.input); }
  getOutputVariables() {return this.scalarVariables.filter(x => x.causality === ScalarVariablesCausality.output); }
  getParameterVariables() {return this.scalarVariables.filter(x => x.causality === ScalarVariablesCausality.parameter); }
}


