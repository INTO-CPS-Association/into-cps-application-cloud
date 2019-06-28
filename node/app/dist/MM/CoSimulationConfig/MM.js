"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MM {
    constructor() {
        this.parameters = new Map();
        this.arr = {};
        this.ar = {};
    }
    addFMU() {
    }
    addConnection(outputInstance, outputVariable, inputInstance, inputVariable) {
        let A = new Map().set(inputVariable, inputInstance);
        let B = new Map().set(outputVariable, [A]);
        this.parameters.set(outputInstance, B);
    }
}
exports.MM = MM;
//# sourceMappingURL=MM.js.map