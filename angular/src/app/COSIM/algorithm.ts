import {ScalarVaraibleMap} from '../variables/ScalarVaraibleMap';

export class Algorithm {
  type: AlgorithmTypes = AlgorithmTypes.FIXED;
  size: number = 0.01;
  initsize: number;
  constraints: Constraints[];

  getAlgorithmTypes() {
    return Object.values(AlgorithmTypes);
  }
  getConstraintsTypes() {
    return Object.values(ConstraintsTypes);
  }

}
export enum AlgorithmTypes {
  FIXED = 'fixed-step',
  VAR = 'var-step'
}

export class Constraints {
  ID: string;
  type: ConstraintsTypes;
  ports: ScalarVaraibleMap[];
  skipDiscrete: boolean;
  base: number;
  rate: number;
  startTime: number;
  abstol: number;
  reltol: number;
  safety: number;
}

export enum ConstraintsTypes {
  zerocrossing = 'Zero Crossing',
  boundeddifference = 'Bounded Difference',
  samplingrate = 'Sampling Rate',
  fmumaxstepsize = 'FMU Max Step Size'
}
