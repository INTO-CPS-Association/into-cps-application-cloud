
export interface VariableStepConstraint {
    id: string;
    type: string;
    toObject(): { [key: string]: any };
}



export class ZeroCrossingConstraint implements VariableStepConstraint {
    type = "zerocrossing";
    private static index: number = 0;
    public readonly name: string;   
    constructor(
        public id: string = "zc",
        public ports: Array<InstanceScalarPair> = [],
        public order: string = "2", // Can be 1 or 2.
        public abstol: number = 10**(-3),
        public safety: number = 0.0
    ) {
        this.name = "order" + ZeroCrossingConstraint.index++;

    }

    toObject() {
        let obj: any = {
            type: this.type,
            ports: this.ports.map((port: InstanceScalarPair) => '')//Serializer.getIdSv(port.instance, port.scalarVariable))
        };

        if (this.order) obj.order = Number(this.order);
        if (this.abstol) obj.abstol = Number(this.abstol);
        if (this.safety) obj.safety = Number(this.safety);

        return obj;
    }
}

export class FmuMaxStepSizeConstraint implements VariableStepConstraint {
    type = "fmumaxstepsize";

    constructor(
        public id: string = "maxstepsize"
    ) {}

    toObject() {
        let obj: any = {
            type: this.type
        };

        return obj;
    }
}



export class BoundedDifferenceConstraint implements VariableStepConstraint {
    type = "boundeddifference";

    constructor(
        public id: string = "bd",
        public ports: Array<InstanceScalarPair> = [],
        public abstol: number = 10**(-3),
        public reltol: number = 10**(-2),
        public safety: number = 0.0,
        public skipDiscrete: boolean = true
    ) {}

    toObject() {
        let temp: InstanceScalarPair = new InstanceScalarPair(null,null);
        let obj: any = {
            type: this.type,
            ports: this.ports.map((port: InstanceScalarPair) => ''),//Serializer.getIdSv(port.instance, port.scalarVariable)),
            skipDiscrete: !!this.skipDiscrete
        };

        obj.abstol = Number(this.abstol);
        obj.reltol = Number(this.reltol);
        obj.safety = Number(this.safety);

        return obj;
    }
}

export class SamplingRateConstraint implements VariableStepConstraint {
    type = "samplingrate";

    constructor(
        public id: string = "sr",
        public base: number = 0,
        public rate: number = 0,
        public startTime: number = 0
    ) {}

    toObject() {
        return {
            type: this.type,
            base: Number(this.base),
            rate: Number(this.rate),
            startTime: Number(this.startTime)
        }
    }
}

export enum CausalityType { Output, Input, Parameter, CalculatedParameter, Local, Independent, Unknown }
export function causalityToString(causality: CausalityType) {
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

export enum InitialType {Exact, Approx, Calculated, Unknown}
export function initialToString(initial: InitialType) {
    switch(initial){
        case InitialType.Exact: return "exact";
        case InitialType.Approx: return "approx";
        case InitialType.Calculated: return "calculated";
        case InitialType.Unknown: return "unknown";
    }

}

export enum VariabilityType { Constant, Fixed, Tunable, Continuous, Discrete,  Unknown }
export function variabilityToString(variability: VariabilityType) {
    switch (variability) {
        case VariabilityType.Constant: return "constant";
        case VariabilityType.Fixed: return "fixed";
        case VariabilityType.Tunable: return "tunable";
        case VariabilityType.Continuous: return "continuous";
        case VariabilityType.Discrete: return "discrete";
        case VariabilityType.Unknown: return "unknown";
    }
}

export enum ScalarVariableType { Real, Bool, Int, String, Unknown }
export function typeToString(type: ScalarVariableType) {
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

// Represents a FMI ScalarVariable
export class ScalarVariable {
    constructor(
        public name: string = "",
        public type: ScalarVariableType = ScalarVariableType.Unknown,
        public causality: CausalityType = CausalityType.Unknown,
        public variability: VariabilityType = VariabilityType.Unknown,
        public initial: InitialType = InitialType.Unknown,
        public start: string = undefined,
        public isConfirmed: boolean = false // none FMI specific
    ) {

    }
}

// Repersents an instance of an FMU, including initial parameters and a mapping from outputs to InstanceScalarPair
export class Instance {
    //mapping from output to FmuConnection where connection holds an instane and input scalarVariable
    outputsTo: Map<ScalarVariable, InstanceScalarPair[]> = new Map<ScalarVariable, InstanceScalarPair[]>();

    // initial parameter values
    initialValues: Map<ScalarVariable, any> = new Map<ScalarVariable, any>();

    constructor(public fmu: any, public name: string) {

    }

    public addOutputToInputLink(source: ScalarVariable, target: InstanceScalarPair) {
        if (this.outputsTo.has(source)) {
            let list = this.outputsTo.get(source);
            let match = list.find(pair => pair.instance == target.instance && pair.scalarVariable == target.scalarVariable);

            if (!match) list.push(target);
        } else {
            this.outputsTo.set(source, [target]);
        }
    }
}

// Represents a link pair (FmuInstances, scalarVariable)
export class InstanceScalarPair {
    constructor(public instance: Instance, public scalarVariable: ScalarVariable) {

    }
}

