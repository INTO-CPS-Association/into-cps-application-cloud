import {Fmu} from './Fmu';
import {FmuMap} from './FmuMap';
import {Fmuinstances} from './Fmuinstances';
import {ScalarVaraibleMap, ScalarVaraibleMapType} from './ScalarVaraibleMap';
import {ScalarVariable, ScalarVariablesTypes} from './ScalarVariable';

export class MultiModel {
  fmus: Set<Fmu> = new Set();
  fmuMaps: Set<FmuMap> = new Set();
  instances: Set<Fmuinstances> = new Set();
  connections: Map<ScalarVaraibleMap, Set<ScalarVaraibleMap>> = new Map();
  parameters: Set<ScalarVaraibleMap> = new Set();

  constructor() {
  }
  // ######################################
  // #                                    #
  // #     Handling the Fmu    :          #
  // #                                    #
  // ######################################
  addFmus(fmus: Fmu[]) {
    fmus.forEach(x => {
      this.fmus.add(x);
    });
  }
  getFmus() {
    return Array.from(this.fmus);
  }

  getFmuFromFilename(filename: string) {
    return this.getFmus().filter(x => x.file === filename)[0];
  }
  getFmuInputsAsScalarVaraibleMap(instance: MMSplit) {
    const inputInstance = this.getInstance(instance);
    const fmu = inputInstance.fmuMap.fmu;
    if (fmu && instance) {
      return fmu.getInputVariables().map(x => new ScalarVaraibleMap(x.name, inputInstance, ScalarVaraibleMapType.input));
    }
    return [];
  }
  getFmuInputsAsScalarVaraibleMapStr(instance: string) {
    return this.getFmuInputsAsScalarVaraibleMap(this.splitString(instance));
  }
  getFmuOutputsAsScalarVaraibleMap(instance: MMSplit) {
    const inputInstance = this.getInstance(instance);
    const fmu = inputInstance.fmuMap.fmu;
    if (fmu && instance) {
      return fmu.getOutputVariables().map(x => new ScalarVaraibleMap(x.name, inputInstance, ScalarVaraibleMapType.output));
    }
    return [];
  }
  getFmuOutputsAsScalarVaraibleMapStr(instance: string) {
    return this.getFmuOutputsAsScalarVaraibleMap(this.splitString(instance));
  }
  getFmuParametersAsScalarVaraibleMap(instance: MMSplit) {
    const inputInstance = this.getInstance(instance);
    const fmu = inputInstance.fmuMap.fmu;
    if (fmu && instance) {
      return fmu.getParameterVariables().map(x => new ScalarVaraibleMap(x.name, inputInstance, ScalarVaraibleMapType.parameter));
    }
    return [];
  }
  getFmuParametersAsScalarVaraibleMapStr(instance: string) {
    return this.getFmuParametersAsScalarVaraibleMap(this.splitString(instance));
  }
  // ######################################
  // #                                    #
  // #     Handling the FmuMaps:          #
  // #                                    #
  // ######################################
  getFmuMaps() {
    return Array.from(this.fmuMaps);
  }

  getFmuMap(fmuMap: MMSplit): FmuMap {
    return this.getFmuMaps().filter(x => x.name === fmuMap.fmuName)[0];
  }
  setFmuForMap(fmuMap: MMSplit, fmu: Fmu) {
    this.getFmuMap(fmuMap).fmu = fmu;
  }
  setFmuForMapStr(fmuMap: string, fmu: Fmu) {
    this.getFmuMapStr(fmuMap).fmu = fmu;
  }
  setFmuForMapStrUsingFmuFilename(fmuMap: string, fmuFilename: string) {
    this.getFmuMapStr(fmuMap).fmu = this.getFmuFromFilename(fmuFilename);
  }
  getFmuMapStr(fmuMap: string) {
    return this.getFmuMap(this.splitString(fmuMap));
  }
  addFmuMap(fmu: Fmu) {
    this.fmuMaps.add(new FmuMap('', fmu));
  }
  addFmuMapsFromString(name: string, filename: string) {
    this.fmuMaps.add(new FmuMap(name, this.getFmuFromFilename(filename)));
  }
  addFmuMapByFilename(fmuFilename: string) {
    this.addFmuMap(this.getFmuFromFilename(fmuFilename));
  }
  removeFmuMap(fmuMap: MMSplit) {
    this.fmuMaps.delete(this.getFmuMap(fmuMap));
  }
  removeFmuMapStr(fmuMap: string) {
    this.fmuMaps.delete(this.getFmuMap(this.splitString(fmuMap)));
  }
  checkFmuMapDubplicate(fmuMap: MMSplit) {
    this.getFmuMaps().filter(x => x.name === fmuMap.fmuName);
  }
  checkFmuMapDubplicateStr(fmuMap: string) {
    this.checkFmuMapDubplicate(this.splitString(fmuMap));
  }
  // ######################################
  // #                                    #
  // #     Handling the Instance          #
  // #                                    #
  // ######################################
  getInstances() {
    return Array.from(this.instances);
  }
  getInstancesForFmu(instance: MMSplit) {
    return this.getInstances().filter(x => x.fmuMap.name === instance.fmuName);
  }
  getInstancesForFmuStr(instance: string) {
    return this.getInstancesForFmu(this.splitString(instance));
  }
  getInstance(instance: MMSplit) {
    return this.getInstances().filter(x =>
      x.name === instance.instanceName &&
      x.fmuMap.name === instance.fmuName)[0];
  }
  getInstanceStr(instance: string) {
    this.getInstance(this.splitString(instance));
  }
  addInstance(instance: MMSplit) {
    if (this.getInstance(instance) === undefined) {
      if (instance.instanceName === null) {
        instance.instanceName = '';
      }
      this.instances.add(new Fmuinstances(instance.instanceName, this.getFmuMapStr(instance.fmuName)));
    }
  }
  addInstanceStr(instance: string) {
    this.addInstance(this.splitString(instance));
  }
  removeInstance(instance: MMSplit) {
    this.instances.delete(this.getInstance(instance));
  }
  removeInstanceStr(instance: string) {
    this.removeInstance(this.splitString(instance));
  }
  // ######################################
  // #                                    #
  // #     Handling the Connections       #
  // #                                    #
  // ######################################
  getConnectionOutputs() {
    return Array.from(this.connections.keys());
  }

  getConnectionOutput(output: MMSplit) {
    return this.getConnectionOutputs().filter(x =>
      x.name === output.scalarName &&
      x.fmuInstance.name === output.instanceName &&
    x.fmuInstance.fmuMap.name === output.fmuName)[0];
  }
  getConnectionOutputsForInstance(instance: MMSplit) {
    const fmu = this.getFmuOutputsAsScalarVaraibleMap(instance);
    return this.getConnectionOutputs().filter(x => x.fmuInstance.name === instance.instanceName);
  }
  getConnectionOutputsForInstanceStr(instance: string) {
    return this.getConnectionOutputsForInstance(this.splitString(instance));
  }
  getConnectionOutputStr(outputStr: string) {
    return this.getConnectionOutput(this.splitString(outputStr));
  }
  getConnectionInputs(output: MMSplit) {
    return this.connections.get(this.getConnectionOutput(output));
  }
  getInstanceInputConnectionsStr(inputInstance: string) {
    const instance = this.splitString(inputInstance);
    const arr: ScalarVaraibleMap[] = [];
    this.getConnectionOutputs().forEach(out => {
        this.connections.get(out).forEach(input => {
          if (input.fmuInstance.name === instance.instanceName) {
            if (arr.filter(z => z.name === input.name).length === 0) {
              arr.push(input);
            }
          }
        });
    });
    return arr;
  }
  getConnectionInputsStr(outputStr: string) {
    return this.getConnectionInputs(this.splitString(outputStr));
  }
  getConenctionInput(output: MMSplit, input: MMSplit) {
    const inputs = this.getConnectionInputs(output);
    if (inputs === undefined) {
      return null;
    }
    return Array.from(this.getConnectionInputs(output)).filter(x =>
      x.fmuInstance.fmuMap.name === input.fmuName &&
      x.fmuInstance.name === input.instanceName &&
      x.name === input.scalarName)[0];
  }
  getConenctionInputStr(output: string, input: string) {
    return this.getConenctionInput(this.splitString(output), this.splitString(input));
  }
  addConnection(output: MMSplit, input: MMSplit) {
    const SVOutput = this.getInstance(output);
    const SVInput = this.getInstance(input);
    const SVMapInput = new ScalarVaraibleMap(input.scalarName, SVInput, ScalarVaraibleMapType.input);
    // output does not exists
    if (this.getConnectionOutput(output) === undefined) {
      const SVMapOutput = new ScalarVaraibleMap(output.scalarName, SVOutput, ScalarVaraibleMapType.output);
      if (SVMapOutput.type === SVMapInput.type) {
        this.connections.set(SVMapOutput, new Set([SVMapInput]));
      }
    } else { // output does exist
      const outputConenction = this.getConnectionOutput(output);
      const inputExists = Array.from(this.connections.get(outputConenction)).filter(x => x === SVMapInput)[0];
      if (inputExists === undefined) {
        this.connections.get(outputConenction).add(SVMapInput);
      }
    }
  }
  addConnectionStr(outputStr: string, inputStr: string) {
    this.addConnection(this.splitString(outputStr), this.splitString(inputStr));
  }
  removeConnectionInput(output: MMSplit, input: MMSplit) {
    const SVOutput = this.getInstance(output);
    const SVInput = this.getInstance(input);
    const connectionOut = this.getConnectionOutput(output);
    if (connectionOut) {
      const inputs = this.connections.get(connectionOut);
      if (inputs.size > 1) {
        // output has more than 1 inputs, remove input
        const inputToDelete = this.getConenctionInput(output, input);
        this.connections.get(connectionOut).delete(inputToDelete);
      } else {
        // output has 1 input or less, remove output
        this.connections.delete(connectionOut);
      }
    }
  }
  removeConnectionInputStr(output: string, input: string) {
    this.removeConnectionInput(this.splitString(output), this.splitString(input));
  }
  checkConnectionExist(output: MMSplit, input: MMSplit): boolean {
    const connectionInput = this.getConenctionInput(output, input);
    if (connectionInput) {
      return true;
    }
    return false;
  }
  checkConnectionExistStr(output: string, input: string) {
    return this.checkConnectionExist(this.splitString(output), this.splitString(input));
  }
  checkConnectionType(output: MMSplit, input: MMSplit): boolean {
    const connectionInput = this.getConenctionInput(output, input);
    const connectionOutput = this.getConnectionOutput(output);
    const inputFmu = connectionInput.fmuInstance.fmuMap.fmu;
    const outputFmu = connectionOutput.fmuInstance.fmuMap.fmu;
    if (inputFmu && outputFmu) {
      const FmuScalarInput = inputFmu.getInputVariables().filter(x => x.name === input.scalarName)[0];
      const FmuScalarOutput = inputFmu.getOutputVariables().filter(x => x.name === output.scalarName)[0];
      return FmuScalarInput.type === FmuScalarOutput.type;
    }
    return false;
  }
  checkConnectionTypeStr(output: string, input: string): boolean {
    return this.checkConnectionType(this.splitString(output), this.splitString(input));
  }
  // ######################################
  // #                                    #
  // #     Handling the FmuParameters:    #
  // #                                    #
  // ######################################
  getParameters() {
    return Array.from(this.parameters);
  }
  getParameter(parameter: MMSplit) {
    return this.getParameters().filter(x =>
      x.fmuInstance.name === parameter.instanceName &&
      x.name === parameter.scalarName)[0];
  }
  getParameterStr(parameter: string) {
    return this.getParameter(this.splitString(parameter));
  }
  getParameterForInstance(parameter: MMSplit) {
    return this.getParameters().filter(x =>
      x.fmuInstance.name === parameter.instanceName &&
      x.fmuInstance.fmuMap.name === parameter.fmuName);
  }
  getParameterForInstanceStr(parameter: string) {
    return this.getParameterForInstance(this.splitString(parameter));
  }
  addParameter(parameter: MMSplit, value: any = null) {
    const instance = this.getInstance(parameter);
    if (this.checkParameterExist(parameter) === undefined) {
      this.parameters.add(new ScalarVaraibleMap(parameter.scalarName, instance, ScalarVaraibleMapType.parameter, ScalarVariablesTypes.Real, value));
    }
  }
  addParameterStr(parameter: string, value: any = null) {
    this.addParameter(this.splitString(parameter), value);
  }
  removeParameter(parameter: MMSplit) {
    const par = this.getParameter(parameter);
    this.parameters.delete(par);
  }
  removeParameterStr(parameter: string) {
    this.removeParameter(this.splitString(parameter));
  }

  checkParameterExist(parameter: MMSplit) {
    return this.getParameters().filter(x =>
      x.fmuInstance.name === parameter.instanceName &&
    x.name === parameter.scalarName)[0];
  }


  // ######################################
  // #                                    #
  // #     Handling the Splitting:        #
  // #                                    #
  // ######################################
  splitString(...strings: string[]): MMSplit {
    const strArr = strings.join('.').split('.');
    switch (strArr.length) {
      case 0:
        return null;
      case 1:
        return new MMSplit(strArr[0], null, null);
      case 2:
        return new MMSplit(strArr[0], strArr[1], null);
        break;
      case 3:
        return new MMSplit(strArr[0], strArr[1], strArr.slice(2).join('.'));
        break;
      default: // Case we have more than 3 dots
        return new MMSplit(strArr[0], strArr[1], strArr.slice(2).join('.'));
    }
  }
}

// ######################################
// #                                    #
// #     Extra class to ease splitting  #
// #                                    #
// ######################################
export class MMSplit {
  fmuName: string;
  instanceName: string;
  scalarName: string;
  constructor(fmuName: string, instanceName: string, scalarName: string) {
    this.fmuName = fmuName;
    this.instanceName = instanceName;
    this.scalarName = scalarName;
  }
  toString() {
    return [this.fmuName, this.instanceName, this.scalarName].join('.');
  }
}



