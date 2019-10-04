import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {CoSimulationConfig} from '../../COSIM/CoSimulationConfig';
import {CommunicationComponent} from '../communication/communication.component';
import {LineChartComponent} from '../line-chart/line-chart.component';
import {FmuCreator} from '../../variables/FmuCreator';
import {Fmu} from '../../variables/Fmu';
import {MultiModelCreator} from '../../variables/MultiModelCreator';
import {MultiModel} from '../../variables/MultiModel';
import {Fmuinstances} from '../../variables/Fmuinstances';

@Component({
  selector: 'app-co-sim-configuration',
  templateUrl: './co-sim-configuration.component.html',
  styleUrls: ['./co-sim-configuration.component.css']
})
@Injectable({
  providedIn: 'root'
})

export class CoSimConfigurationComponent implements OnInit {
  @Input() path = '';
  @ViewChild(LineChartComponent) lineChartComponent: LineChartComponent;
  editTitle = 'Edit';
  simulateButtonTitle = 'Simulate';
  disable = true;
  coSimulationConfig: CoSimulationConfig;
  communicationComponent: CommunicationComponent;
  username: string;
  selectedProject: string;
  elementID: string;
  data: Graph[] = [];
  progrss = 0;
  sessionID: string = null;
  collapse: boolean;
  selectedFmu
  fmus: Fmu[];
  mm: MultiModel = new MultiModel();
  delayMS = 2000;
  grapfelements: string[] = [];
  pingLimit = 3;
  stop = false;

  constructor() {
    this.coSimulationConfig = new CoSimulationConfig();
  }

  ngOnInit() {
  }

  async loadProject(communicationComponent: CommunicationComponent, username: string, selectedProject: string, elementID: string) {
    this.communicationComponent = communicationComponent;
    this.username = username;
    this.selectedProject = selectedProject;
    this.elementID = elementID;
    this.coSimulationConfig.makeFromJson(await communicationComponent.getCoSimDescription(username, selectedProject, elementID));
    const MMjson: string = await communicationComponent.getMMDescription(username, selectedProject, this.coSimulationConfig.multimodel_path);
    const FMUSjson: string = await communicationComponent.getFmusDescription(username, selectedProject);
    this.fmus = new FmuCreator().createFmusFromJson(FMUSjson);
    this.mm = new MultiModelCreator().createFromMMJson(MMjson, this.fmus)
    console.log(this.mm);
    console.log(this.fmus);
  }

  saveOrEdit() {
    if (this.disable) {
      // PRESSED EDIT!!
      this.disable = !this.disable;
      this.editTitle = 'Save';
    } else {
      // PRESSED SAVE!!
      this.disable = !this.disable;
      this.editTitle = 'Edit';
      const json = JSON.stringify(this.coSimulationConfig);
      this.communicationComponent.updateJSon(this.username, this.selectedProject, this.elementID, json);
    }
    console.log(JSON.stringify(this.coSimulationConfig));
  }

  getfmuInputs(fmufile: string) {
    return this.fmus.filter(x => x.file === fmufile)[0].getInputVariables();
  }
  getfmuOutputs(fmufile: string) {
    return this.fmus.filter(x => x.file === fmufile)[0].getOutputVariables();
  }
  getfmuParameters(fmufile: string) {
    return this.fmus.filter(x => x.file === fmufile)[0].getParameterVariables();
  }
  toggleElementOnGraph(instance: Fmuinstances, el: string) {
    const scalar = [instance.toString(), el].join('.');
    if (!this.grapfelements.includes(scalar)) {
      console.log('added: ' + scalar);
      this.grapfelements.push(scalar);
    } else {
      console.log('removed: ' + scalar);
      this.grapfelements = this.grapfelements.filter(x => x !== scalar);
    }
  }
  existInElementOnGraph(instance: Fmuinstances, el: string) {
    const scalar = [instance.toString(), el].join('.');
    return this.grapfelements.includes(scalar);
  }
  removedots(somestring: string) {
    return somestring.replace(/\./g, '').replace(/}/g, '').replace(/{/g, '');
  }

  async stopSimulation() {
    this.stop = true;
    if (this.sessionID !== null) {
      this.communicationComponent.stopSimulation(this.username, this.sessionID);
    }
  }
  sessionGranted() {
    return this.sessionID === null;
  }

  async simulate() {
    if (this.sessionID === null) {
      this.data = [];
      this.progrss = 0;
      this.sessionID = 'temp';
      // this.communicationComponent.startCoe(this.username);
      const sessionID = await this.communicationComponent.getCoeSession(this.username);
      await this.communicationComponent.runSimulation(this.username, this.selectedProject, this.elementID, sessionID);
      await delay(4000);
      console.log(sessionID);
      const statustime = '0';
      let arraylength = 0;
      let currentTime = 0;
      let ping = 0;
      while (true) {

        await delay(this.delayMS);
        const status = await this.communicationComponent.getCoeStatus(this.username, sessionID, statustime);
        try {
          const json = JSON.parse(status);
          const arr = json.results.slice(arraylength);
          arraylength = json.results.slice(0).length;
          const length = arr.length;
          for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.progrss = Math.round((obj.time / this.coSimulationConfig.endTime) * 100);
            if (obj.time >= currentTime) {
              Object.keys(obj).forEach(x => {
                Object.keys(obj[x]).forEach(y => {
                  Object.keys(obj[x][y]).forEach(z => {
                    const dataname = x + '.' + y + '.' + z;
                    if (this.grapfelements.includes(dataname)) {
                      let dataGraph = this.data.find(graph => graph.name === dataname);
                      if (dataGraph === undefined) {
                        this.data.push(new Graph(dataname));
                        dataGraph = this.data.find(graph => graph.name === dataname);
                      }
                      dataGraph.x.push(obj.time);
                      currentTime = obj.time;
                      dataGraph.y.push(obj[x][y][z]);
                    }
                  });
                });
              });
              if (this.stop === true) {
                break;
              }
            }
            this.lineChartComponent.draw(this.data);
            await delay(250);
          }
          if (json.finished) {
            this.progrss = 100;
            break;
          }
        } catch (e) {
          ping++
          if (ping > this.pingLimit) {
            break;
          }
          console.log(e);
        }
      }
      this.sessionID = null;
    }
    this.stop = false;
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class Graph {
  name: string;
  x: number[];
  y: number[];

  constructor(name: string) {
    this.name = name;
    this.x = [];
    this.y = [];
  }
}
