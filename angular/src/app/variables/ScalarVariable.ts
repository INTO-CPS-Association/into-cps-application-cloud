export class ScalarVariable {
  name: string;
  valueReference: string;
  variability: string;
  causality: ScalarVariablesCausality;
  description: string;
  value: any;
  type: ScalarVariablesTypes;

  constructor(name: string, valueReference: string, variability: string, causality: ScalarVariablesCausality, description: string, value: any, type: ScalarVariablesTypes) {
    this.name = name;
    this.valueReference = valueReference;
    this.variability = variability;
    this.causality = causality;
    this.description = description;
    this.value = value;
    this.type = type;
  }
}
export enum ScalarVariablesTypes {
  Real = 'Real',
  Boolean = 'Boolean',
  Integer = 'Integer',
  String = 'String',
  Unknown = 'Unknown'
}
export enum ScalarVariablesCausality {
  parameter = 'parameter',
  input = 'input',
  output = 'output',
  local = 'local'
}
