"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZeroCrossingConstraint {
    constructor(id = "zc", ports = [], order = "2", // Can be 1 or 2.
    abstol = Math.pow(10, (-3)), safety = 0.0) {
        this.id = id;
        this.ports = ports;
        this.order = order;
        this.abstol = abstol;
        this.safety = safety;
        this.type = "zerocrossing";
        this.name = "order" + ZeroCrossingConstraint.index++;
    }
    toObject() {
        let obj = {
            type: this.type,
            ports: this.ports.map((port) => '') //Serializer.getIdSv(port.instance, port.scalarVariable))
        };
        if (this.order)
            obj.order = Number(this.order);
        if (this.abstol)
            obj.abstol = Number(this.abstol);
        if (this.safety)
            obj.safety = Number(this.safety);
        return obj;
    }
}
ZeroCrossingConstraint.index = 0;
exports.ZeroCrossingConstraint = ZeroCrossingConstraint;
class FmuMaxStepSizeConstraint {
    constructor(id = "maxstepsize") {
        this.id = id;
        this.type = "fmumaxstepsize";
    }
    toObject() {
        let obj = {
            type: this.type
        };
        return obj;
    }
}
exports.FmuMaxStepSizeConstraint = FmuMaxStepSizeConstraint;
class BoundedDifferenceConstraint {
    constructor(id = "bd", ports = [], abstol = Math.pow(10, (-3)), reltol = Math.pow(10, (-2)), safety = 0.0, skipDiscrete = true) {
        this.id = id;
        this.ports = ports;
        this.abstol = abstol;
        this.reltol = reltol;
        this.safety = safety;
        this.skipDiscrete = skipDiscrete;
        this.type = "boundeddifference";
    }
    toObject() {
        let temp = new InstanceScalarPair(null, null);
        let obj = {
            type: this.type,
            ports: this.ports.map((port) => ''),
            skipDiscrete: !!this.skipDiscrete
        };
        obj.abstol = Number(this.abstol);
        obj.reltol = Number(this.reltol);
        obj.safety = Number(this.safety);
        return obj;
    }
}
exports.BoundedDifferenceConstraint = BoundedDifferenceConstraint;
class SamplingRateConstraint {
    constructor(id = "sr", base = 0, rate = 0, startTime = 0) {
        this.id = id;
        this.base = base;
        this.rate = rate;
        this.startTime = startTime;
        this.type = "samplingrate";
    }
    toObject() {
        return {
            type: this.type,
            base: Number(this.base),
            rate: Number(this.rate),
            startTime: Number(this.startTime)
        };
    }
}
exports.SamplingRateConstraint = SamplingRateConstraint;
var CausalityType;
(function (CausalityType) {
    CausalityType[CausalityType["Output"] = 0] = "Output";
    CausalityType[CausalityType["Input"] = 1] = "Input";
    CausalityType[CausalityType["Parameter"] = 2] = "Parameter";
    CausalityType[CausalityType["CalculatedParameter"] = 3] = "CalculatedParameter";
    CausalityType[CausalityType["Local"] = 4] = "Local";
    CausalityType[CausalityType["Independent"] = 5] = "Independent";
    CausalityType[CausalityType["Unknown"] = 6] = "Unknown";
})(CausalityType = exports.CausalityType || (exports.CausalityType = {}));
function causalityToString(causality) {
    switch (causality) {
        case CausalityType.Output:
            return "output";
        case CausalityType.Input:
            return "input";
        case CausalityType.Parameter:
            return "parameter";
        case CausalityType.CalculatedParameter:
            return "calculatedParameter";
        case CausalityType.Local:
            return "local";
        case CausalityType.Independent:
            return "independent";
        case CausalityType.Unknown:
            return "unknown";
    }
}
exports.causalityToString = causalityToString;
var InitialType;
(function (InitialType) {
    InitialType[InitialType["Exact"] = 0] = "Exact";
    InitialType[InitialType["Approx"] = 1] = "Approx";
    InitialType[InitialType["Calculated"] = 2] = "Calculated";
    InitialType[InitialType["Unknown"] = 3] = "Unknown";
})(InitialType = exports.InitialType || (exports.InitialType = {}));
function initialToString(initial) {
    switch (initial) {
        case InitialType.Exact: return "exact";
        case InitialType.Approx: return "approx";
        case InitialType.Calculated: return "calculated";
        case InitialType.Unknown: return "unknown";
    }
}
exports.initialToString = initialToString;
var VariabilityType;
(function (VariabilityType) {
    VariabilityType[VariabilityType["Constant"] = 0] = "Constant";
    VariabilityType[VariabilityType["Fixed"] = 1] = "Fixed";
    VariabilityType[VariabilityType["Tunable"] = 2] = "Tunable";
    VariabilityType[VariabilityType["Continuous"] = 3] = "Continuous";
    VariabilityType[VariabilityType["Discrete"] = 4] = "Discrete";
    VariabilityType[VariabilityType["Unknown"] = 5] = "Unknown";
})(VariabilityType = exports.VariabilityType || (exports.VariabilityType = {}));
function variabilityToString(variability) {
    switch (variability) {
        case VariabilityType.Constant: return "constant";
        case VariabilityType.Fixed: return "fixed";
        case VariabilityType.Tunable: return "tunable";
        case VariabilityType.Continuous: return "continuous";
        case VariabilityType.Discrete: return "discrete";
        case VariabilityType.Unknown: return "unknown";
    }
}
exports.variabilityToString = variabilityToString;
var ScalarVariableType;
(function (ScalarVariableType) {
    ScalarVariableType[ScalarVariableType["Real"] = 0] = "Real";
    ScalarVariableType[ScalarVariableType["Bool"] = 1] = "Bool";
    ScalarVariableType[ScalarVariableType["Int"] = 2] = "Int";
    ScalarVariableType[ScalarVariableType["String"] = 3] = "String";
    ScalarVariableType[ScalarVariableType["Unknown"] = 4] = "Unknown";
})(ScalarVariableType = exports.ScalarVariableType || (exports.ScalarVariableType = {}));
function typeToString(type) {
    switch (type) {
        case ScalarVariableType.Real:
            return "Real";
        case ScalarVariableType.Bool:
            return "Boolean";
        case ScalarVariableType.Int:
            return "Integer";
        case ScalarVariableType.String:
            return "String";
        case ScalarVariableType.Unknown:
            return "unknown";
    }
}
exports.typeToString = typeToString;
// Represents a FMI ScalarVariable
class ScalarVariable {
    constructor(name = "", type = ScalarVariableType.Unknown, causality = CausalityType.Unknown, variability = VariabilityType.Unknown, initial = InitialType.Unknown, start = undefined, isConfirmed = false // none FMI specific
    ) {
        this.name = name;
        this.type = type;
        this.causality = causality;
        this.variability = variability;
        this.initial = initial;
        this.start = start;
        this.isConfirmed = isConfirmed;
    }
}
exports.ScalarVariable = ScalarVariable;
// Repersents an instance of an FMU, including initial parameters and a mapping from outputs to InstanceScalarPair
class Instance {
    constructor(fmu, name) {
        this.fmu = fmu;
        this.name = name;
        //mapping from output to FmuConnection where connection holds an instane and input scalarVariable
        this.outputsTo = new Map();
        // initial parameter values
        this.initialValues = new Map();
    }
    addOutputToInputLink(source, target) {
        if (this.outputsTo.has(source)) {
            let list = this.outputsTo.get(source);
            let match = list.find(pair => pair.instance == target.instance && pair.scalarVariable == target.scalarVariable);
            if (!match)
                list.push(target);
        }
        else {
            this.outputsTo.set(source, [target]);
        }
    }
}
exports.Instance = Instance;
// Represents a link pair (FmuInstances, scalarVariable)
class InstanceScalarPair {
    constructor(instance, scalarVariable) {
        this.instance = instance;
        this.scalarVariable = scalarVariable;
    }
}
exports.InstanceScalarPair = InstanceScalarPair;
//# sourceMappingURL=VariableStepConstraint.js.map