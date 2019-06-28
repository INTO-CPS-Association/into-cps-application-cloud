import {Graph} from './graph';
import {Algorithm, AlgorithmTypes, ConstraintsTypes} from './algorithm';

export class CoSimulationConfig {
  constructor() {
  }
  startTime:number = 0;
  endTime:number = 10;
  multimodel_path: string;
  liveGraphColumns = 0;
  liveGraphVisibleRowCount = 0;
  livestreamInterval = 0;
  graphs: Graph[];
  logVariables: Map<string, string>;
  visible = true;
  loggingOn = false;
  overrideLogLevel: LogLevels = null;
  enableAllLogCategoriesPerInstance = false;
  algorithm: Algorithm = new Algorithm();
  multimodel_crc: string;
  parallelSimulation: boolean;
  stabalizationEnabled: boolean;
  global_absolute_tolerance: number;
  global_relative_tolerance: number;
  simulationProgramDelay: boolean;
  postProcessingScript: string;

  getLogLevels() {
    return Object.values(LogLevels);
  }
  getAlgorithms() {
    return Object.values(AlgorithmTypes);
  }
  getAlgorithmConstraintsTypes() {
    return Object.values(ConstraintsTypes);
  }
  makeFromJson(Json: string) {
    const temp = JSON.parse(Json);
    Object.keys(temp).forEach(key => {
      this[key] = temp[key];
    });
    this.algorithm = JSON.parse(JSON.stringify(temp.algorithm));

  }
}
export enum LogLevels {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE'
}
