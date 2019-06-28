import {MultiModel} from './MultiModel';
import {Fmu} from './Fmu';

export class MultiModelCreator {

  createFromMMJson(json: string, fmus: Fmu[]) {
    const multiModel = new MultiModel();
    multiModel.addFmus(fmus);
    const el = JSON.parse(json);
    // Adding FMUs from names and files.
    const fmuKeys = Object.keys(el.fmus);
    fmuKeys.forEach(fmukey => {
      this.addFmuMaps(fmukey, el.fmus[fmukey], multiModel);
    });
    // Adding Instances from connections AND adding inputs and outputs
    const connectionKeys = Object.keys(el.connections);
    connectionKeys.forEach(connectionKey => {
      this.addInstancesAndConnections(connectionKey, el.connections[connectionKey], multiModel);
    });
    // Adding Instances from parameters AND adding instance parameters
    const parameterKeys = Object.keys(el.parameters);
    parameterKeys.forEach(parameterKey => {
      this.addParameters(parameterKey, el.parameters[parameterKey], multiModel);
    });
    return multiModel;
  }

  addFmuMaps(name: string, file: string, multiModel: MultiModel) {
    multiModel.addFmuMapsFromString(name, file);
  }

  addInstancesAndConnections(output: string, inputs: string[], multiModel: MultiModel) {
    // const out = this.makeInstanceAndConnectionFromString(output);
    multiModel.addInstanceStr(output);
    inputs.forEach(input => {
      multiModel.addInstanceStr(input);
      multiModel.addConnectionStr(output, input);
    });
  }
  addParameters(parameter: string, value: number, multiModel: MultiModel) {
    multiModel.addParameterStr(parameter, value);
  }

}
