/*import {Fmuinstance} from '../FMU/fmuinstance';
import {IO} from '../FMU/io';

export class Graph {
  title = "Live Graph";
  livestream: Map<Fmuinstance, IO[]> = new Map<Fmuinstance, IO[]>();
  externalWindow = false;

}
*/
import {Fmuinstances} from '../variables/Fmuinstances';
import {ScalarVaraibleMap} from '../variables/ScalarVaraibleMap';

export class Graph {
  title = "Live Graph";
  livestream: Map<Fmuinstances, ScalarVaraibleMap[]> = new Map<Fmuinstances, ScalarVaraibleMap[]>();
  externalWindow = false;

}
