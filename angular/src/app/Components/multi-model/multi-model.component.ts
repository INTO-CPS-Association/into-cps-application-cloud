import {Component, Input} from '@angular/core';
import {CommunicationComponent} from '../communication/communication.component';
import {FmuCreator} from '../../variables/FmuCreator';
import {MultiModelCreator} from '../../variables/MultiModelCreator';
import {Fmu} from '../../variables/Fmu';
import {MultiModel} from '../../variables/MultiModel';
import {FmuMap} from '../../variables/FmuMap';

@Component({
  selector: 'app-multi-model',
  templateUrl: './multi-model.component.html',
  styleUrls: ['./multi-model.component.css']
})
export class MultiModelComponent {
  @Input() path = '';
  editTitle = 'Edit';
  disable = true;
  /*Fmus: FMU[] = [];
  FmuTemplates: FMU[] = [];
  fmuhandler: FMUHandler = new FMUHandler();*/
  username: string;
  selectedProject: string;
  elementID: string;
  communicationComponent: CommunicationComponent;
  selectedFmu: string = null;
  selectedOutInstance: string;
  selectedOutVariable: string;
  selectedInInstance: string;
  selectedInVariable: string;
  selectedParameterInstance: string;
  selectedParameter: string;

  fmus: Fmu[];
  mm: MultiModel = new MultiModel();

  async loadProject(communicationComponent: CommunicationComponent, username: string, selectedProject: string, elementID: string, reset: boolean = false) {
    if (reset) {
      this.reset();
    }
    const MMjson: string = await communicationComponent.getMMDescription(username, selectedProject, elementID);
    const FMUSjson: string = await communicationComponent.getFmusDescription(username, selectedProject);
    this.fmus = new FmuCreator().createFmusFromJson(FMUSjson);
    this.mm = new MultiModelCreator().createFromMMJson(MMjson, this.fmus)

    this.username = username;
    this.selectedProject = selectedProject;
    this.elementID = elementID;
    this.communicationComponent = communicationComponent;
    this.selectedOutInstance = this.mm.getInstances()[0].toString();
    this.selectedParameterInstance = this.mm.getParameters()[0].toString();
    this.selectedInInstance = this.mm.getInstances()[0].toString();
  }
  reset() {
    this.selectedFmu = null;
    this.selectedOutInstance = null;
    this.selectedOutVariable = null;
    this.selectedInInstance = null;
    this.selectedInVariable = null;
    this.selectedParameterInstance = null;
    this.selectedParameter = null;
  }

  saveOrEdit() {
    if (this.disable) {
      this.disable = !this.disable;
      this.editTitle = 'Save';
    } else {
      this.disable = !this.disable;
      this.editTitle = 'Edit';
      const jsonstr = this.makeJson();
      this.communicationComponent.updateJSon(this.username, this.selectedProject, this.elementID, jsonstr);
    }
  }

  SetInputVariableOnOutput(input: string, e: any) {
    const inputStr = [this.selectedInInstance, input].join('.');
    if (!this.mm.checkConnectionExistStr(this.getOutputConnection(), inputStr)) {
      this.mm.addConnectionStr(this.getOutputConnection(), inputStr);
    } else {
      this.mm.removeConnectionInputStr(this.getOutputConnection(), inputStr);
    }
  }
  existsAsInputForOutput(input: string): boolean {
    const inputStr = [this.selectedInInstance, input].join('.');
    return this.mm.checkConnectionExistStr(this.getOutputConnection(), inputStr);
  }

  removeparameter(parameter: string) {
    this.mm.removeParameterStr([this.selectedParameterInstance, parameter].join('.'));
  }
  addParameter(parameter: string) {
    this.mm.addParameterStr([this.selectedParameterInstance, parameter].join('.'));
    this.selectedParameter = null;
  }

  getOutputConnection() {
    return [this.selectedOutInstance, this.selectedOutVariable].join('.');
  }
  getFmu(fmumap: FmuMap) {
    return fmumap.fmu ? fmumap.fmu.file : '';
  }

  getInputVariables() {
    const arr = this.mm.getInstanceInputConnectionsStr(this.selectedInInstance);
    const arr2 = this.mm.getFmuInputsAsScalarVaraibleMapStr(this.selectedInInstance);
    return this.getUnique(arr.concat(arr2), 'name');
  }
  getOutputVariables() {
    const arr = this.mm.getConnectionOutputsForInstanceStr(this.selectedOutInstance);
    const arr2 = this.mm.getFmuOutputsAsScalarVaraibleMapStr(this.selectedOutInstance);
    return this.getUnique(arr.concat(arr2), 'name');
  }
  getUnique(arr, comp) {

    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }


  makeJson() {
    const mmjson = new MMJson();
    this.mm.getFmuMaps().forEach(x => {
      mmjson.fmus.set(x.name, x.fmu.file);
    });
    Array.from(this.mm.connections.keys()).forEach(x => {
      const arr = Array.from(this.mm.connections.get(x)).map(y => y.toString());
      mmjson.connections.set(x.toString(), arr);
    });
    Array.from(this.mm.parameters).forEach(x => {
      mmjson.parameters.set(x.toString(), x.value);
    });
    return JSON.stringify(mmjson.toJson());
  }

}
export class MMJson {
  public fmus: Map<string, string>;
  public connections: Map<string, string[]>;
  public parameters: Map<string, any>;
  constructor() {
    this.fmus = new Map<string, string>();
    this.connections = new Map<string, string[]>();
    this.parameters = new Map<string, any>();
  }
  toJson() {
    return {
      fmus: this.map_to_object(this.fmus),
      connections: this.map_to_object(this.connections),
      parameters: this.map_to_object(this.parameters)
    };
  }
  map_to_object(map) {
    const out = Object.create(null)
    map.forEach((value, key) => {
      if (value instanceof Map) {
        out[key] = this.map_to_object(value);
      } else {
        out[key] = value;
      }
    })
    return out;
  }
}
