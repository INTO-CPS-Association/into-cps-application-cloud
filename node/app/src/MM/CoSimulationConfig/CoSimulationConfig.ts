import {ICoSimAlgorithm, FixedStepAlgorithm} from './CoSimAlgorithms';

export class CoSimulationConfig{
    //project root required to resolve multimodel path
    projectRoot: string;

    //multiModel: MultiModelConfig;//TODO:
    sourcePath: string;
    multiModelCrc: string;

    //liveGraphs: LiveGraph[] = [];//TODO:
    liveGraphColumns: number = 1;
    liveGraphVisibleRowCount: number=1;

    //optional livestream outputs
    //logVariables: Map<Instance, ScalarVariable[]> = new Map<Instance, ScalarVariable[]>();TODO:
    livestreamInterval: number = 0.1
    algorithm: ICoSimAlgorithm = new FixedStepAlgorithm();
    startTime: number = 0;
    endTime: number = 10;
    visible: boolean = false;
    loggingOn: boolean = false;
    enableAllLogCategoriesPerInstance: boolean = false;
    overrideLogLevel: string = null;
    postProcessingScript: string = "";
    parallelSimulation: boolean = false;
    stabalization: boolean = false;
    global_absolute_tolerance: number = 0.0;
    global_relative_tolerance: number = 0.0;
    simulationProgramDelay: boolean = false;
}