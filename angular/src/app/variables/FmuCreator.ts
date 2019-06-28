import {Fmu} from './Fmu';
import {ScalarVariable, ScalarVariablesCausality, ScalarVariablesTypes} from './ScalarVariable';
export class FmuCreator {

  createFmusFromJson(json: string): Fmu[] {
    const fmus: Fmu[] = [];
    const el = JSON.parse(json);
    const keys = Object.keys(el);
    keys.forEach(key => {
      const file = key;
      const modelname: string = el[key].​fmiModelDescription._attributes.modelName;
      const scalarVariable = el[key].​fmiModelDescription.ModelVariables.ScalarVariable;
      console.log(scalarVariable)
      const sc: ScalarVariable[] = scalarVariable.map(x => {
          return {
            name: x._attributes.name,
            valueReference: x._attributes.valueReference,
            variability: x._attributes.variability,
            causality: ScalarVariablesCausality[x._attributes.causality],
            description: x._attributes.description,
            value:  x[Object.keys(x).filter(y => Object.values(ScalarVariablesTypes).includes(y))[0]]._attributes === undefined ?
            0 : x[Object.keys(x).filter(y => Object.values(ScalarVariablesTypes).includes(y))[0]]._attributes.start,
            type: ScalarVariablesTypes[Object.keys(x).filter(y => Object.keys(ScalarVariablesTypes).includes(y))[0]] || ScalarVariablesTypes.Unknown
          };
      });
      // TODO LogVariables should be added later on not needed in beta
      fmus.push(new Fmu(modelname, file).setScalarVariables(sc));
    });
    return fmus;
  }
}
