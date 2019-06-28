"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoSimAlgorithms_1 = require("./CoSimAlgorithms");
class CoSimulationConfig {
    constructor() {
        //liveGraphs: LiveGraph[] = [];//TODO:
        this.liveGraphColumns = 1;
        this.liveGraphVisibleRowCount = 1;
        //optional livestream outputs
        //logVariables: Map<Instance, ScalarVariable[]> = new Map<Instance, ScalarVariable[]>();TODO:
        this.livestreamInterval = 0.1;
        this.algorithm = new CoSimAlgorithms_1.FixedStepAlgorithm();
        this.startTime = 0;
        this.endTime = 10;
        this.visible = false;
        this.loggingOn = false;
        this.enableAllLogCategoriesPerInstance = false;
        this.overrideLogLevel = null;
        this.postProcessingScript = "";
        this.parallelSimulation = false;
        this.stabalization = false;
        this.global_absolute_tolerance = 0.0;
        this.global_relative_tolerance = 0.0;
        this.simulationProgramDelay = false;
    }
}
exports.CoSimulationConfig = CoSimulationConfig;
//# sourceMappingURL=CoSimulationConfig.js.map