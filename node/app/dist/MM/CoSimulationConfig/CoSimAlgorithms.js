"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FixedStepAlgorithm {
    constructor(size = 0.1) {
        this.size = size;
        this.type = "fixed-step";
        this.name = "Fixed Step";
    }
    toObject() {
        return {
            type: this.type,
            size: Number(this.size)
        };
    }
}
exports.FixedStepAlgorithm = FixedStepAlgorithm;
class VariableStepAlgorithm {
    constructor(initSize = 0.1, sizeMin = 0.05, sizeMax = 0.2, constraints = []) {
        this.initSize = initSize;
        this.sizeMin = sizeMin;
        this.sizeMax = sizeMax;
        this.constraints = constraints;
        this.type = "var-step";
        this.name = "Variable Step";
    }
    toObject() {
        let constraints = {};
        this.constraints.forEach(c => constraints[c.id] = c.toObject());
        return {
            type: this.type,
            initsize: Number(this.initSize),
            size: [Number(this.sizeMin), Number(this.sizeMax)],
            constraints: constraints
        };
    }
}
exports.VariableStepAlgorithm = VariableStepAlgorithm;
//# sourceMappingURL=CoSimAlgorithms.js.map