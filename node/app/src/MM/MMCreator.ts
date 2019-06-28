import {UserElement} from '../UserElement';
import {IHandler} from '../IHandler';
import {Settings} from '../SystemSettings';
import {CoSimulationConfig} from './CoSimulationConfig/CoSimulationConfig';
var fs = require('file-system');

export class MMCreator implements IHandler{
    multimodelFodler:string = 'Multi-models';
    user:UserElement;
    res:any;
    body:any;
    
    constructor(body:any, res:any, user:UserElement){
        this.user = user;
        this.res = res;
        this.body = body;
    }
    handle(body:any):void{
        throw new Error("CoeHandler is a multifunctional class handle(body:any) not implemented");
    }

    public createMMFromSysML(){
        let folderpath = [this.user.getProjectPath(),this.multimodelFodler,this.body.MMname].join(Settings.systemseperator)
        let filepath = [folderpath,this.body.MMname].join(Settings.systemseperator)+'.mm.json';
        fs.mkdir(folderpath)
        fs.copyFile(this.body.sysMLpath, 
            filepath, 
            (err:any) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
          });
    }

    public getMM() {
        const path = [this.user.getProjectPath(), this.body.path].join(Settings.systemseperator).replace(/\\/g,  "/");
        this.res.status(200).send({"return": fs.readFileSync(path,'utf8')});
    }

    public createCoSim(){
        let folderpath = [this.user.getProjectPath(),this.multimodelFodler,this.body.MMname,this.body.CoeSimName].join(Settings.systemseperator);
        fs.mkdir(folderpath);
        let filepath = [folderpath,this.body.CoeSimName].join(Settings.systemseperator)+'.coe.json';
        let data = JSON.stringify(new CoSimulationConfig());
        [this.user.getProjectPath(),this.multimodelFodler,this.body.MMname,this.body.CoeSimName,this.body.CoeSimName+'coe.json'].join(Settings.systemseperator);
        fs.writeFile (filepath, data, function(err:any) {
            if (err) throw err;
            console.log('complete');
            }
        );
    }

    public getCoSim(){
        this.res.status(200).send({"return": fs.readFileSync([this.user.getProjectPath(), this.body.path].join(Settings.systemseperator),'utf8')});
    }

    public createCoSimConfig(){
        let folderpath = [this.user.getProjectPath(),this.multimodelFodler,this.body.MMname].join(Settings.systemseperator)
        let MMfilepath = [folderpath,this.body.MMname].join(Settings.systemseperator)+'.mm.json';
        let COEfilepath = [folderpath,this.body.CoeSimName,this.body.CoeSimName].join(Settings.systemseperator)+'.coe.json';        
        let contentA = fs.readFileSync(MMfilepath, 'utf8', function (err:any, MMdata:any) {if (err) throw err;});
        let contentB = fs.readFileSync(COEfilepath, 'utf8', function (err:any, COEdata:any) {if (err) throw err;});
        return (contentA+contentB).replace(/\s/g, "").replace('}{',',');
    }

    public createCoMessage():any{
        let config = new CoSimulationConfig();
        var message: any = {
            startTime: config.startTime,
            endTime: config.endTime,
            reportProgress: true,
            liveLogInterval: config.livestreamInterval
        };
        return JSON.stringify(message);
    }
}
