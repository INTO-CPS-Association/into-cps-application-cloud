import { Fmuinstances } from "./Fmuinstances";
import { ScalarVaraibleMap } from "./ScalarVaraibleMap";

export class FmuParameters {
    fmuInstances: Fmuinstances;
    parameters: {scala: ScalarVaraibleMap, value: any};
    toString(){}
  }
  