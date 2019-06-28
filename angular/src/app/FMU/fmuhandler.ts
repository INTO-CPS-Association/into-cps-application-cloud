/*import {FMU} from './fmu';
import {FMUParameter, ParameterTypes} from './fmuparameter';
import {MultiModelConnection} from './multi-model-connection';

export class FMUHandler {
  Fmus: FMU[] = null;
  FmuTemplates: FMU[] = null;

  ImportFMUJson(json: string) {
    this.FmuTemplates = [];
    const el = JSON.parse(json);
    const fmus = Object.keys(el);
    for (let i = 0; i < fmus.length; i++) {
      this.FmuTemplates.push(new FMU('', fmus[i]));
      const scalarVariable = el[fmus[i]].​fmiModelDescription.ModelVariables.ScalarVariable;
      const inputs = scalarVariable.filter((v) => v._attributes.causality === 'input').map(x => x._attributes.name);
      this.FmuTemplates[i].addAllIOTo(this.FmuTemplates[i].inputs, inputs, true);
      const outputs = scalarVariable.filter((v) => v._attributes.causality === 'output').map(x => x._attributes.name);
      this.FmuTemplates[i].addAllIOTo(this.FmuTemplates[i].ouptuts, outputs, false);
      const parameters = scalarVariable.filter((v) => v._attributes.causality === 'parameter').map(x => {
        return {
          Name: x._attributes.name,
          Type: Object.keys(x).filter(y => Object.values(ParameterTypes).includes(y))[0] || ParameterTypes.UNKNOWN,
          Start:  x[Object.keys(x).filter(y => Object.values(ParameterTypes).includes(y))[0]]._attributes.start
        };
      });
      parameters.forEach(parameter => {
        this.FmuTemplates[i].parameters.push(new FMUParameter(null, parameter.Name, parameter.Type, parameter.Start));
      });
    }
    return this.FmuTemplates;
  }

  ImportMMJson(json: string) {
    this.Fmus = [];
    const el = JSON.parse(json);
    // Adding FMUs from names and files.
    const fmuKeys = Object.keys(el.fmus);
    fmuKeys.forEach(fmukey => {
      this.addFmus(fmukey, el.fmus[fmukey]);
    });
    // Adding Instances from connections AND adding inputs and outputs
    const connectionKeys = Object.keys(el.connections);
    connectionKeys.forEach(connectionKey => {
      this.addInstancesAndConnections(connectionKey, el.connections[connectionKey]);
    });
    // Adding Instances from parameters AND adding instance parameters
    const parameterKeys = Object.keys(el.parameters);
    parameterKeys.forEach(parameterKey => {
      this.addParameters(parameterKey, el.parameters[parameterKey]);
    });
    return this.Fmus;
  }

  addFmus(name: string, file: string) {
    this.Fmus.unshift(
      new FMU(
        name,
        file,
        this.FmuTemplates.filter(x => x.file === file)[0]
      )
    );
  }

  addInstancesAndConnections(output: string, inputs: string[]) {
    const out = this.makeInstanceAndConnectionFromString(output);
    inputs.forEach(input => {
      const createdInput = this.makeInstanceAndConnectionFromString(input, false, true);
      out.instance.IO.get(out.IO).push(createdInput.IO);
    });
  }

  addParameters(parameter: string, value: number) {
    const temp = this.makeInstanceAndConnectionFromString(parameter, true);
    const parameterType = temp.instance.fmu.parameters.filter(x => x.name === temp.con.IO).map(x => x.parameterType)[0];
    temp.instance.parameters.push(new FMUParameter(temp.instance, temp.con.IO, parameterType, value));
  }

  makeInstanceAndConnectionFromString(content: string, isParameter: boolean = false, isInput: boolean = false) {
    const con = new MultiModelConnection(content);
    const fmu = con.findFMU(this.Fmus);
    const instance = con.findOrCreateInstance(fmu);
    return {
      instance,
      IO: isParameter ? null : instance.getOrSetIObyName(con.IO, isInput),
      con
    };
  }

}
*/
