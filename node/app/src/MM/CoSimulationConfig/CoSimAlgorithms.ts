import {VariableStepConstraint} from './VariableStepConstraint'



export interface ICoSimAlgorithm {
    //toFormGroup(): any;//FormGroup;
    toObject(): { [key: string]: any };
    type: string;
    name: string;
}


export class FixedStepAlgorithm implements ICoSimAlgorithm {
    type = "fixed-step";
    name = "Fixed Step";

    constructor(public size: number = 0.1) {

    }   

    toObject() {
        return {
            type: this.type,
            size: Number(this.size)
        };
    }
}

export class VariableStepAlgorithm implements ICoSimAlgorithm {
    type = "var-step";
    name = "Variable Step";

    constructor(
        public initSize: number = 0.1,
        public sizeMin: number = 0.05,
        public sizeMax: number = 0.2,
        public constraints: Array<VariableStepConstraint> = []
    ) {}

    toObject() {
        let constraints: any = {};
        this.constraints.forEach(c => constraints[c.id] = c.toObject());

        return {
            type: this.type,
            initsize: Number(this.initSize),
            size: [Number(this.sizeMin), Number(this.sizeMax)],
            constraints: constraints
        };
    }

}